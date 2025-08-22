import React, {useState, useCallback, useContext, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {observer} from 'mobx-react';
import {ChatView, EmbeddedVideoView} from '../../components';
import {L10nContext, UserContext} from '../../utils';
import {modelStore, palStore} from '../../store';
import 'react-native-get-random-values';
import {user as defaultUser} from '../../utils/chat';
import {PalType} from '../../components/PalsSheets/types';
import {VideoPal} from '../../store/PalStore';

export const VideoPalScreen = observer(() => {
  const l10n = useContext(L10nContext);

  const contextUser = useContext(UserContext);
  const user = contextUser || defaultUser;

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [promptText, setPromptText] = useState('What do you see?');
  const [captureInterval, setCaptureInterval] = useState(1000); // Default to 1 second
  const [lastAnalysisTime, setLastAnalysisTime] = useState(0);
  const [isStoppingCamera, setIsStoppingCamera] = useState(false);

  // Get the active VideoPal to access its captureInterval setting
  const activeVideoPal = React.useMemo(() => {
    if (palStore.pals.length > 0) {
      const videoPal = palStore.pals.find(p => p.palType === PalType.VIDEO) as
        | VideoPal
        | undefined;

      if (videoPal) {
        return videoPal;
      }
    }
    return undefined;
  }, []);

  // Initialize captureInterval from the active VideoPal
  useEffect(() => {
    if (activeVideoPal?.captureInterval) {
      setCaptureInterval(activeVideoPal.captureInterval);
    }
  }, [activeVideoPal]);

  // Initialize the model with the projection model if needed
  useEffect(() => {
    if (
      activeVideoPal &&
      !modelStore.activeModel &&
      activeVideoPal.defaultModel
    ) {
      const palDefaultModel = modelStore.availableModels.find(
        m => m.id === activeVideoPal.defaultModel?.id,
      );

      if (palDefaultModel) {
        console.log('Initializing Video Pal model with projection model');

        // Check if this model supports multimodal and has a default projection model
        if (
          palDefaultModel.supportsMultimodal &&
          palDefaultModel.defaultProjectionModel
        ) {
          // Find the default projection model
          const projectionModel = modelStore.availableModels.find(
            m => m.id === palDefaultModel.defaultProjectionModel,
          );

          if (projectionModel) {
            console.log(
              'Found default projection model:',
              projectionModel.name,
            );
            // Get the projection model path
            modelStore
              .getModelFullPath(projectionModel)
              .then(projectionModelPath => {
                console.log(
                  'Initializing with projection model path:',
                  projectionModelPath,
                );
                // Initialize with both the main model and projection model
                modelStore.initContext(palDefaultModel, projectionModelPath);
              })
              .catch(error => {
                console.error('Failed to get projection model path:', error);
                // Fall back to initializing without projection model
                modelStore.initContext(palDefaultModel);
              });
          } else {
            console.warn(
              'Default projection model not found, initializing without it',
            );
            modelStore.initContext(palDefaultModel);
          }
        } else {
          console.log(
            'Model does not support multimodal or has no default projection model',
          );
          modelStore.initContext(palDefaultModel);
        }
      }
    }
  }, [activeVideoPal]);

  // Handle starting the camera
  const handleStartCamera = useCallback(async () => {
    if (!modelStore.context) {
      Alert.alert(l10n.chat.modelNotLoaded, l10n.chat.pleaseLoadModel, [
        {
          text: l10n.common.ok,
        },
      ]);
      return;
    }

    // Check if multimodal is enabled
    try {
      const isEnabled = await modelStore.isMultimodalEnabled();
      if (!isEnabled) {
        Alert.alert(
          'Multimodal Not Enabled',
          'This model does not support image analysis. Please load a multimodal model.',
          [
            {
              text: l10n.common.ok,
            },
          ],
        );
        return;
      }

      setIsCameraActive(true);
    } catch (error) {
      console.error('Error checking multimodal capability:', error);
      Alert.alert('Error', 'Failed to check if model supports images.', [
        {
          text: l10n.common.ok,
        },
      ]);
    }
  }, [l10n]);

  // Handle stopping the camera
  const handleStopCamera = useCallback(async () => {
    setIsStoppingCamera(true);

    // Stop any ongoing completion first
    if (modelStore.inferencing || modelStore.isStreaming) {
      try {
        await modelStore.context?.stopCompletion();
      } catch (error) {
        console.error('Error stopping completion:', error);
      }
    }

    // Clear response text and stop camera
    setResponseText('');
    setIsCameraActive(false);
    setIsStoppingCamera(false);
  }, []);

  // Handle capture interval change
  const handleCaptureIntervalChange = useCallback(
    (interval: number) => {
      setCaptureInterval(interval);

      // Update the VideoPal's captureInterval setting
      if (activeVideoPal) {
        palStore.updatePal(activeVideoPal.id, {
          captureInterval: interval,
        });
      }
    },
    [activeVideoPal],
  );

  // Handle image capture from the video stream
  const handleImageCapture = useCallback(
    async (imageBase64: string) => {
      // Don't process if we're stopping the camera
      if (isStoppingCamera) {
        return;
      }

      // Throttle analysis to avoid overwhelming the model
      const now = Date.now();
      if (now - lastAnalysisTime < captureInterval) {
        return;
      }

      setLastAnalysisTime(now);

      // Clear the previous response text before starting a new analysis
      setResponseText('');

      // Get the system prompt from the active VideoPal
      const systemPrompt = activeVideoPal?.systemPrompt || '';

      try {
        // Start the completion with the base64 image using the user-editable prompt
        await modelStore.startImageCompletion({
          prompt: promptText,
          image_path: imageBase64, // Now passing base64 data URL instead of file path
          systemMessage: systemPrompt,
          onToken: token => {
            // Only update response text if we're not stopping the camera
            if (!isStoppingCamera) {
              setResponseText(prev => prev + token);
            }
          },
          onComplete: () => {
            // This is called when the entire completion is done
            // We don't need to set the text again as we've been building it token by token
          },
          onError: error => {
            console.error('Error processing image:', error);
          },
        });
      } catch (error) {
        console.error('Error processing image:', error);
      }
    },
    [
      promptText,
      captureInterval,
      lastAnalysisTime,
      activeVideoPal,
      isStoppingCamera,
    ],
  );

  // Render the chat view with embedded camera when active
  return (
    <UserContext.Provider value={user}>
      <View style={styles.container}>
        {isCameraActive ? (
          // Full-screen camera view with response overlay
          <View style={styles.fullScreenContainer}>
            <EmbeddedVideoView
              onCapture={handleImageCapture}
              onClose={handleStopCamera}
              captureInterval={captureInterval}
              onCaptureIntervalChange={handleCaptureIntervalChange}
              responseText={responseText}
            />
          </View>
        ) : (
          // Regular chat view when camera is not active
          <ChatView
            messages={[]}
            onSendPress={() => {}}
            onStopPress={() => modelStore.context?.stopCompletion()}
            user={user}
            isStopVisible={modelStore.inferencing}
            isThinking={modelStore.inferencing && !modelStore.isStreaming}
            isStreaming={modelStore.isStreaming}
            sendButtonVisibilityMode="editing"
            textInputProps={{
              editable: !modelStore.isStreaming && !isCameraActive,
              value: promptText,
              onChangeText: setPromptText,
            }}
            inputProps={{
              palType: PalType.VIDEO,
              isCameraActive: isCameraActive,
              onStartCamera: handleStartCamera,
              promptText: promptText,
              onPromptTextChange: setPromptText,
            }}
          />
        )}
      </View>
    </UserContext.Provider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
});
