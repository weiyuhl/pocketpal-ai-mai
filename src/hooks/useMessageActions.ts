import {useCallback} from 'react';

import Clipboard from '@react-native-clipboard/clipboard';

import {chatSessionStore, modelStore} from '../store';

import {MessageType, User} from '../utils/types';

interface UseMessageActionsProps {
  user: User;
  messages: MessageType.Any[];
  handleSendPress: (message: MessageType.PartialText) => Promise<void>;
  setInputText?: (text: string) => void;
  setInputImages?: (images: string[]) => void;
}

export const useMessageActions = ({
  user,
  messages,
  handleSendPress,
  setInputText,
  setInputImages,
}: UseMessageActionsProps) => {
  const handleCopy = useCallback((message: MessageType.Text) => {
    if (message.type === 'text') {
      Clipboard.setString(message.text.trim());
    }
  }, []);

  const handleEdit = useCallback(
    async (message: MessageType.Text) => {
      if (message.type !== 'text' || message.author.id !== user.id) {
        return;
      }

      // Enter edit mode and set input text and images
      chatSessionStore.enterEditMode(message.id);
      setInputText?.(message.text);
      setInputImages?.(message.imageUris || []);
    },
    [setInputText, setInputImages, user.id],
  );

  const handleTryAgain = useCallback(
    async (message: MessageType.Text) => {
      if (message.type !== 'text') {
        return;
      }

      // If it's the user's message, resubmit it
      if (message.author.id === user.id) {
        // Remove all messages from this point (inclusive)
        const messageText = message.text;
        const relatedImages = message.imageUris;

        await chatSessionStore.removeMessagesFromId(message.id, true);
        await handleSendPress({
          text: messageText,
          type: 'text',
          imageUris:
            relatedImages && relatedImages.length > 0
              ? relatedImages
              : undefined,
        });
      } else {
        // If it's the assistant's message, find and resubmit the last user message
        const messageIndex = messages.findIndex(msg => msg.id === message.id);
        const previousMessage = messages
          .slice(messageIndex + 1)
          .find(msg => msg.author.id === user.id && msg.type === 'text') as
          | MessageType.Text
          | undefined;

        if (previousMessage && previousMessage.text) {
          const messageText = previousMessage.text;
          const relatedImages = previousMessage.imageUris;
          await chatSessionStore.removeMessagesFromId(previousMessage.id, true);
          await handleSendPress({
            text: messageText,
            type: 'text',
            imageUris:
              relatedImages && relatedImages.length > 0
                ? relatedImages
                : undefined,
          });
        }
      }
    },
    [messages, handleSendPress, user.id],
  );

  const handleTryAgainWith = useCallback(
    async (modelId: string, message: MessageType.Text) => {
      if (modelId === modelStore.activeModelId) {
        await handleTryAgain(message);
        return;
      }
      const model = modelStore.models.find(m => m.id === modelId);
      if (model) {
        await modelStore.initContext(model);
        await handleTryAgain(message);
      }
    },
    [handleTryAgain],
  );

  return {
    handleCopy,
    handleEdit,
    handleTryAgain,
    handleTryAgainWith,
  };
};
