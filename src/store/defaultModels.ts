import {Model, ModelOrigin, ModelType} from '../utils/types';
import {chatTemplates} from '../utils/chat';
import {defaultCompletionParams} from '../utils/completionSettingsVersions';
import {Platform} from 'react-native';

export const MODEL_LIST_VERSION = 13;

const iosOnlyModels: Model[] = [];

const androidOnlyModels: Model[] = [];

const crossPlatformModels: Model[] = [
  // -------- Gemma --------
  {
    id: 'bartowski/gemma-2-2b-it-GGUF/gemma-2-2b-it-Q6_K.gguf',
    author: 'bartowski',
    name: 'Gemma-2-2b-it (Q6_K)',
    type: 'Gemma',
    capabilities: ['questionAnswering', 'summarization', 'reasoning'],
    size: 2151393120,
    params: 2614341888,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/bartowski/gemma-2-2b-it-GGUF/resolve/main/gemma-2-2b-it-Q6_K.gguf',
    hfUrl: 'https://huggingface.co/bartowski/gemma-2-2b-it-GGUF',
    progress: 0,
    filename: 'gemma-2-2b-it-Q6_K.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.gemmaIt},
    chatTemplate: chatTemplates.gemmaIt,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.0,
      penalty_repeat: 1.0,
    },
    completionSettings: {
      // https://huggingface.co/google/gemma-7b-it/discussions/38#65d7b14adb51f7c160769fa1
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.0,
      penalty_repeat: 1.0,
    },
    defaultStopWords: ['<end_of_turn>'],
    stopWords: ['<end_of_turn>'],
    hfModelFile: {
      rfilename: 'gemma-2-2b-it-Q6_K.gguf',
      url: 'https://huggingface.co/bartowski/gemma-2-2b-it-GGUF/resolve/main/gemma-2-2b-it-Q6_K.gguf',
      size: 2151393120,
      oid: '72f2510b5868d1141617aa16cfc4c4a61ec77262',
      lfs: {
        oid: 'f82c5c2230a8b452221706461eb93203443373625d96a05912d4f96c845c2775',
        size: 2151393120,
        pointerSize: 135,
      },
      canFitInStorage: true,
    },
  },
  {
    id: 'TheDrummer/Gemmasutra-Mini-2B-v1-GGUF/Gemmasutra-Mini-2B-v1-Q6_K.gguf',
    author: 'TheDrummer',
    name: 'Gemmasutra-Mini-2B-v1 (Q6_K)',
    type: 'Gemma',
    capabilities: ['roleplay'],
    size: 2151393152,
    params: 2614341888,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/TheDrummer/Gemmasutra-Mini-2B-v1-GGUF/resolve/main/Gemmasutra-Mini-2B-v1-Q6_K.gguf',
    hfUrl: 'https://huggingface.co/TheDrummer/Gemmasutra-Mini-2B-v1-GGUF',
    progress: 0,
    filename: 'Gemmasutra-Mini-2B-v1-Q6_K.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.gemmasutra},
    chatTemplate: chatTemplates.gemmasutra,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
      penalty_repeat: 1.0,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
      penalty_repeat: 1.0,
    },
    defaultStopWords: ['<end_of_turn>'],
    stopWords: ['<end_of_turn>'],
    hfModelFile: {
      rfilename: 'Gemmasutra-Mini-2B-v1-Q6_K.gguf',
      url: 'https://huggingface.co/TheDrummer/Gemmasutra-Mini-2B-v1-GGUF/resolve/main/Gemmasutra-Mini-2B-v1-Q6_K.gguf',
      size: 2151393152,
      oid: '05521bb238e46ebd8fb5dacf044ba14f7c15f73e',
      lfs: {
        oid: '34bdca7d62ae0b15366a6f3d7f457d6d8ef96343e72c5e4555b6475c4a78e839',
        size: 2151393152,
        pointerSize: 135,
      },
      canFitInStorage: true,
    },
  },
  // -------- Phi --------
  {
    id: 'MaziyarPanahi/Phi-3.5-mini-instruct-GGUF/Phi-3.5-mini-instruct.Q4_K_M.gguf',
    author: 'MaziyarPanahi',
    name: 'Phi-3.5 mini 4k instruct (Q4_K_M)',
    type: 'Phi',
    capabilities: ['reasoning', 'code', 'math', 'multilingual'],
    size: 2393232608,
    params: 3821079648,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/MaziyarPanahi/Phi-3.5-mini-instruct-GGUF/resolve/main/Phi-3.5-mini-instruct.Q4_K_M.gguf',
    hfUrl: 'https://huggingface.co/MaziyarPanahi/Phi-3.5-mini-instruct-GGUF',
    progress: 0,
    filename: 'Phi-3.5-mini-instruct.Q4_K_M.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.phi3},
    chatTemplate: chatTemplates.phi3,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.1,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.1,
    },
    defaultStopWords: ['<|end|>'],
    stopWords: ['<|end|>'],
    hfModelFile: {
      rfilename: 'Phi-3.5-mini-instruct.Q4_K_M.gguf',
      url: 'https://huggingface.co/MaziyarPanahi/Phi-3.5-mini-instruct-GGUF/resolve/main/Phi-3.5-mini-instruct.Q4_K_M.gguf',
      size: 2393232608,
      oid: 'a2b0f35b7504ba395e886fadd5ebc61236b9f5ec',
      lfs: {
        oid: '3f68916e850b107d8641d18bcd5548f0d66beef9e0a9077fe84ef28943eb7e88',
        size: 2393232608,
        pointerSize: 135,
      },
      canFitInStorage: true,
    },
  },
  // -------- Qwen --------
  {
    id: 'Qwen/Qwen2.5-1.5B-Instruct-GGUF/qwen2.5-1.5b-instruct-q8_0.gguf',
    author: 'Qwen',
    name: 'Qwen2.5-1.5B-Instruct (Q8_0)',
    type: 'Qwen',
    capabilities: ['instructions', 'roleplay', 'multilingual'],
    size: 1894532128,
    params: 1777088000,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/resolve/main/qwen2.5-1.5b-instruct-q8_0.gguf',
    hfUrl: 'https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF',
    progress: 0,
    filename: 'qwen2.5-1.5b-instruct-q8_0.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.qwen25},
    chatTemplate: chatTemplates.qwen25,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.5,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.5,
    },
    defaultStopWords: ['<|im_end|>'],
    stopWords: ['<|im_end|>'],
    supportsThinking: false, // Qwen2.5 doesn't support thinking (Qwen3+ does)
    hfModelFile: {
      rfilename: 'qwen2.5-1.5b-instruct-q8_0.gguf',
      url: 'https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/resolve/main/qwen2.5-1.5b-instruct-q8_0.gguf',
      size: 1894532128,
      oid: '1ec6832f8c80d58e2efa88832420ec7856e8e7c6',
      lfs: {
        oid: 'd7efb072e7724d25048a4fda0a3e10b04bdef5d06b1403a1c93bd9f1240a63c8',
        size: 1894532128,
        pointerSize: 135,
      },
      canFitInStorage: true,
    },
  },
  {
    id: 'Qwen/Qwen2.5-3B-Instruct-GGUF/qwen2.5-3b-instruct-q5_k_m.gguf',
    author: 'Qwen',
    name: 'Qwen2.5-3B-Instruct (Q5_K_M)',
    type: 'Qwen',
    capabilities: ['instructions', 'roleplay', 'multilingual'],
    size: 2438740384,
    params: 3397103616,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/Qwen/Qwen2.5-3B-Instruct-GGUF/resolve/main/qwen2.5-3b-instruct-q5_k_m.gguf',
    hfUrl: 'https://huggingface.co/Qwen/Qwen2.5-3B-Instruct-GGUF',
    progress: 0,
    filename: 'qwen2.5-3b-instruct-q5_k_m.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.qwen25},
    chatTemplate: chatTemplates.qwen25,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.5,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.5,
    },
    defaultStopWords: ['<|im_end|>'],
    stopWords: ['<|im_end|>'],
    supportsThinking: false, // Qwen2.5 doesn't support thinking (Qwen3+ does)
    hfModelFile: {
      rfilename: 'qwen2.5-3b-instruct-q5_k_m.gguf',
      url: 'https://huggingface.co/Qwen/Qwen2.5-3B-Instruct-GGUF/resolve/main/qwen2.5-3b-instruct-q5_k_m.gguf',
      size: 2438740384,
      oid: 'ffee048cd9cd76e7e4848d17fb96892023e8eca1',
      lfs: {
        oid: '2c63dde5f2c9ab1fd64d47dee2d34dade6ba9ff62442d1d20b5342310c982081',
        size: 2438740384,
        pointerSize: 135,
      },
      canFitInStorage: true,
    },
  },
  // -------- Llama --------
  {
    id: 'hugging-quants/Llama-3.2-1B-Instruct-Q8_0-GGUF/llama-3.2-1b-instruct-q8_0.gguf',
    author: 'hugging-quants',
    name: 'Llama-3.2-1b-instruct (Q8_0)',
    type: 'Llama',
    capabilities: ['instructions', 'summarization', 'rewriting'],
    size: 1321079200,
    params: 1235814432,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/hugging-quants/Llama-3.2-1B-Instruct-Q8_0-GGUF/resolve/main/llama-3.2-1b-instruct-q8_0.gguf',
    hfUrl:
      'https://huggingface.co/hugging-quants/Llama-3.2-1B-Instruct-Q8_0-GGUF',
    progress: 0,
    filename: 'llama-3.2-1b-instruct-q8_0.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.llama32},
    chatTemplate: chatTemplates.llama32,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.5,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.5,
    },
    defaultStopWords: ['<|eot_id|>'],
    stopWords: ['<|eot_id|>'],
    hfModelFile: {
      rfilename: 'llama-3.2-1b-instruct-q8_0.gguf',
      url: 'https://huggingface.co/hugging-quants/Llama-3.2-1B-Instruct-Q8_0-GGUF/resolve/main/llama-3.2-1b-instruct-q8_0.gguf',
      size: 1321079200,
      oid: '4d5402369568f0bd157d8454270821341e833722',
      lfs: {
        oid: 'ba345c83bf5cc679c653b853c46517eea5a34f03ed2205449db77184d9ae62a9',
        size: 1321079200,
        pointerSize: 135,
      },
      canFitInStorage: true,
    },
  },
  {
    id: 'bartowski/Llama-3.2-3B-Instruct-GGUF/Llama-3.2-3B-Instruct-Q6_K.gguf',
    author: 'bartowski',
    name: 'Llama-3.2-3B-Instruct (Q6_K)',
    type: 'Llama',
    capabilities: ['instructions', 'summarization', 'rewriting'],
    size: 2643853856,
    params: 3212749888,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF/resolve/main/Llama-3.2-3B-Instruct-Q6_K.gguf',
    hfUrl: 'https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF',
    progress: 0,
    filename: 'Llama-3.2-3B-Instruct-Q6_K.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.llama32},
    chatTemplate: chatTemplates.llama32,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.5,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.5,
    },
    defaultStopWords: ['<|eot_id|>'],
    stopWords: ['<|eot_id|>'],
    hfModelFile: {
      rfilename: 'Llama-3.2-3B-Instruct-Q6_K.gguf',
      url: 'https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF/resolve/main/Llama-3.2-3B-Instruct-Q6_K.gguf',
      size: 2643853856,
      oid: '47d12cf8883aaa6a6cd0b47975cc026980a3af9d',
      lfs: {
        oid: '1771887c15fc3d327cfee6fd593553b2126e88834bf48eae50e709d3f70dd998',
        size: 2643853856,
        pointerSize: 135,
      },
      canFitInStorage: true,
    },
  },
  // -------- SmolLM --------
  {
    id: 'bartowski/SmolLM2-1.7B-Instruct-GGUF/SmolLM2-1.7B-Instruct-Q8_0.gguf',
    author: 'bartowski',
    name: 'SmolLM2-1.7B-Instruct (Q8_0)',
    type: 'SmolLM',
    size: 1820414944,
    params: 1711376384,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/bartowski/SmolLM2-1.7B-Instruct-GGUF/resolve/main/SmolLM2-1.7B-Instruct-Q8_0.gguf',
    hfUrl: 'https://huggingface.co/bartowski/SmolLM2-1.7B-Instruct-GGUF',
    progress: 0,
    filename: 'SmolLM2-1.7B-Instruct-Q8_0.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: chatTemplates.smolLM,
    chatTemplate: chatTemplates.smolLM,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    defaultStopWords: ['<|endoftext|>', '<|im_end|>'],
    stopWords: ['<|endoftext|>', '<|im_end|>'],
    supportsThinking: false, // SmolLM2 doesn't support thinking (SmolLM3+ does)
    hfModelFile: {
      rfilename: 'SmolLM2-1.7B-Instruct-Q8_0.gguf',
      url: 'https://huggingface.co/bartowski/SmolLM2-1.7B-Instruct-GGUF/resolve/main/SmolLM2-1.7B-Instruct-Q8_0.gguf',
      size: 1820414944,
      oid: 'c06316819523138df0346459118248997dac5089',
      lfs: {
        oid: '0c6e8955788b1253f418c354a4bdc4cf507b8cfe49c48bb10c7c58ae713cfa2a',
        size: 1820414944,
        pointerSize: 135,
      },
      canFitInStorage: true,
    },
  },
  // -------- SmolVLM --------
  {
    id: 'ggml-org/SmolVLM-500M-Instruct-GGUF/SmolVLM-500M-Instruct-Q8_0.gguf',
    author: 'ggml-org',
    name: 'SmolVLM2-500M-Instruct (Q8_0)',
    type: 'SmolVLM',
    capabilities: ['vision'],
    size: 436806912,
    params: 409252800, // 500M parameters
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/SmolVLM-500M-Instruct-Q8_0.gguf',
    hfUrl: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF',
    progress: 0,
    filename: 'SmolVLM-500M-Instruct-Q8_0.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    modelType: ModelType.VISION, // Specify that this is a vision model
    defaultChatTemplate: chatTemplates.smolVLM,
    chatTemplate: chatTemplates.smolVLM,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    defaultStopWords: ['<|endoftext|>', '<|im_end|>', '<end_of_utterance>'],
    stopWords: ['<|endoftext|>', '<|im_end|>', '<end_of_utterance>'],
    hfModelFile: {
      rfilename: 'SmolVLM-500M-Instruct-Q8_0.gguf',
      url: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/SmolVLM-500M-Instruct-Q8_0.gguf',
      size: 436806912,
      canFitInStorage: true,
    },
    supportsMultimodal: true,
    compatibleProjectionModels: [
      'ggml-org/SmolVLM-500M-Instruct-GGUF/mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
      'ggml-org/SmolVLM-500M-Instruct-GGUF/mmproj-SmolVLM-500M-Instruct-f16.gguf',
    ],
    defaultProjectionModel:
      'ggml-org/SmolVLM-500M-Instruct-GGUF/mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
  },
  {
    id: 'ggml-org/SmolVLM-500M-Instruct-GGUF/mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
    author: 'ggml-org',
    name: 'mmproj-SmolVLM2-500M-Instruct (Q8_0)',
    type: 'SmolVLM',
    capabilities: [],
    size: 108783360,
    params: 409252800,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
    hfUrl: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF',
    progress: 0,
    filename: 'mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    modelType: ModelType.PROJECTION,
    defaultChatTemplate: chatTemplates.smolVLM,
    chatTemplate: chatTemplates.smolVLM,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    defaultStopWords: ['<|endoftext|>', '<|im_end|>', '<end_of_utterance>'],
    stopWords: ['<|endoftext|>', '<|im_end|>', '<end_of_utterance>'],
    hfModelFile: {
      rfilename: 'mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
      url: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
      size: 108783360,
      canFitInStorage: true,
    },
  },
];

export const defaultModels =
  Platform.OS === 'android'
    ? [...androidOnlyModels, ...crossPlatformModels]
    : [...iosOnlyModels, ...crossPlatformModels];
