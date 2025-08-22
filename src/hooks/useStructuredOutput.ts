import {useCallback, useRef, useState, useContext} from 'react';

import {toJS} from 'mobx';

import {modelStore} from '../store';
import {safeParseJSON} from '../utils';
import {L10nContext} from '../utils';

export const useStructuredOutput = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const l10n = useContext(L10nContext);

  const stopRef = useRef<(() => void) | null>(null);

  const stop = useCallback(() => {
    if (stopRef.current) {
      stopRef.current();
      stopRef.current = null;
      setIsGenerating(false);
    }
  }, []);

  const generate = useCallback(
    async (
      prompt: string,
      schema: object,
      options?: {
        temperature?: number;
        top_p?: number;
        top_k?: number;
        repeat_penalty?: number;
      },
    ) => {
      if (!modelStore.context) {
        throw new Error(l10n.generation.modelNotInitialized);
      }

      setIsGenerating(true);
      setError(null);
      const stopWords = toJS(modelStore.activeModel?.stopWords);

      try {
        // Store the stop function for later use
        stopRef.current = () => modelStore.context?.stopCompletion();

        const result = await modelStore.context.completion({
          messages: [{role: 'user', content: prompt}],
          response_format: {
            type: 'json_schema',
            json_schema: {
              strict: true,
              schema,
            },
          },
          temperature: options?.temperature ?? 0.7,
          top_p: options?.top_p ?? 0.9,
          top_k: options?.top_k ?? 40,
          n_predict: 2000,

          stop: stopWords,
        });

        stopRef.current = null;
        // Parse the completion text as JSON
        return safeParseJSON(result.text);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : l10n.generation.failedToGenerate;
        setError(errorMessage);
        throw err;
      } finally {
        setIsGenerating(false);
        stopRef.current = null;
      }
    },
    [l10n.generation],
  );

  return {
    generate,
    isGenerating,
    error,
    stop,
  };
};
