import {Appearance} from 'react-native';

import {makePersistable} from 'mobx-persist-store';
import {makeAutoObservable, runInAction} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {l10n} from '../utils/l10n';
import {ErrorState} from '../utils/errors';

// Define available languages type
export type AvailableLanguage = keyof typeof l10n;

export class UIStore {
  static readonly GROUP_KEYS = {
    READY_TO_USE: 'ready_to_use',
    AVAILABLE_TO_DOWNLOAD: 'available_to_download',
  } as const;

  pageStates = {
    modelsScreen: {
      filters: [] as string[],
      expandedGroups: {
        [UIStore.GROUP_KEYS.READY_TO_USE]: true,
      },
    },
  };

  // This is a flag to auto-navigate to the chat page after loading a model
  autoNavigatetoChat = true;

  //colorScheme = useColorScheme();
  colorScheme: 'light' | 'dark' = Appearance.getColorScheme() ?? 'light';

  // Current selected language (default to English)
  _language: AvailableLanguage = 'en';

  // List of supported languages
  supportedLanguages: AvailableLanguage[] = ['en', 'ja', 'zh'];

  displayMemUsage = false;

  iOSBackgroundDownloading = true;

  benchmarkShareDialog = {
    shouldShow: true,
  };

  // Warning state for chat-related warnings (like multimodal warnings)
  chatWarning: ErrorState | null = null;

  showError(message: string) {
    // TODO: Implement error display logic (e.g., toast, alert, etc.)
    console.error(message);
  }

  setChatWarning(warning: ErrorState | null) {
    runInAction(() => {
      this.chatWarning = warning;
    });
  }

  clearChatWarning() {
    runInAction(() => {
      this.chatWarning = null;
    });
  }

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'UIStore',
      properties: [
        'pageStates',
        'colorScheme',
        'autoNavigatetoChat',
        'displayMemUsage',
        'benchmarkShareDialog',
        '_language',
      ],
      storage: AsyncStorage,
    });

    // backwards compatibility. Removed this from the ui settings screen.
    this.iOSBackgroundDownloading = true;
  }

  setValue<T extends keyof typeof this.pageStates>(
    page: T,
    key: keyof (typeof this.pageStates)[T],
    value: any,
  ) {
    runInAction(() => {
      if (this.pageStates[page]) {
        this.pageStates[page][key] = value;
      } else {
        console.error(`Page '${page}' does not exist in pageStates`);
      }
    });
  }

  setColorScheme(colorScheme: 'light' | 'dark') {
    runInAction(() => {
      this.colorScheme = colorScheme;
    });
  }

  setLanguage(language: AvailableLanguage) {
    runInAction(() => {
      this._language = language;
    });
  }
  get language() {
    // If the language is not in l10n, return 'en'
    // This can happen when the app removes a language from l10n
    return this._language in l10n ? this._language : 'en';
  }

  get l10n() {
    return l10n[this.language];
  }

  setAutoNavigateToChat(value: boolean) {
    runInAction(() => {
      this.autoNavigatetoChat = value;
    });
  }

  setDisplayMemUsage(value: boolean) {
    runInAction(() => {
      this.displayMemUsage = value;
    });
  }

  setiOSBackgroundDownloading(value: boolean) {
    runInAction(() => {
      this.iOSBackgroundDownloading = value;
    });
  }

  setBenchmarkShareDialogPreference(shouldShow: boolean) {
    runInAction(() => {
      this.benchmarkShareDialog.shouldShow = shouldShow;
    });
  }
}

export const uiStore = new UIStore();
