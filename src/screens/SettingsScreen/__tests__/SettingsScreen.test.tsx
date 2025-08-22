import React from 'react';
import {Platform, Keyboard} from 'react-native';

import {fireEvent, render, waitFor, act} from '../../../../jest/test-utils';

import {SettingsScreen} from '../SettingsScreen';

import {modelStore, uiStore} from '../../../store';

jest.useFakeTimers();

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Keyboard, 'dismiss');
  });

  it('renders settings screen correctly', async () => {
    const {getByText, getByDisplayValue} = render(<SettingsScreen />, {
      withSafeArea: true,
      withNavigation: true,
    });

    expect(getByText('Model Initialization Settings')).toBeTruthy();
    expect(getByText('Model Loading Settings')).toBeTruthy();
    expect(getByText('App Settings')).toBeTruthy();
    expect(getByDisplayValue('1024')).toBeTruthy(); // Context size
  });

  it('updates context size correctly', async () => {
    jest.useFakeTimers();
    const {getByDisplayValue} = render(<SettingsScreen />, {
      withSafeArea: true,
      withNavigation: true,
    });
    const contextSizeInput = getByDisplayValue('1024');

    await act(async () => {
      fireEvent.changeText(contextSizeInput, '512');
    });
    await act(async () => {
      fireEvent(contextSizeInput, 'blur');
    });

    jest.advanceTimersByTime(501); // Wait for debounce

    await waitFor(() => {
      expect(modelStore.setNContext).toHaveBeenCalledWith(512);
    });
    jest.useRealTimers();
  });

  it('displays error for invalid context size input', async () => {
    const {getByDisplayValue, getByText} = render(<SettingsScreen />, {
      withSafeArea: true,
      withNavigation: true,
    });
    const contextSizeInput = getByDisplayValue('1024');

    await act(async () => {
      fireEvent.changeText(contextSizeInput, '100'); // Below minimum size
    });

    expect(getByText('Please enter a valid number (minimum 200)')).toBeTruthy();
  });

  it('handles outside press correctly and resets input', async () => {
    const {getByDisplayValue, getByText} = render(<SettingsScreen />, {
      withSafeArea: true,
      withNavigation: true,
    });
    const contextSizeInput = getByDisplayValue('1024');

    fireEvent.changeText(contextSizeInput, '512');
    fireEvent.press(getByText('Model Initialization Settings'));

    await waitFor(() => {
      expect(Keyboard.dismiss).toHaveBeenCalled();
      expect(getByDisplayValue('1024')).toBeTruthy(); // Reset back to original size
    });
  });

  it('toggles Auto Offload/Load switch', async () => {
    const {getByTestId} = render(<SettingsScreen />, {
      withSafeArea: true,
      withNavigation: true,
    });
    const autoOffloadSwitch = getByTestId('auto-offload-load-switch');

    await act(async () => {
      fireEvent(autoOffloadSwitch, 'valueChange', false);
    });

    expect(modelStore.updateUseAutoRelease).toHaveBeenCalledWith(false);
  });

  it('toggles Auto-Navigate to Chat switch', async () => {
    const {getByTestId} = render(<SettingsScreen />, {
      withSafeArea: true,
      withNavigation: true,
    });
    const autoNavigateSwitch = getByTestId('auto-navigate-to-chat-switch');

    await act(async () => {
      fireEvent(autoNavigateSwitch, 'valueChange', false);
    });

    expect(uiStore.setAutoNavigateToChat).toHaveBeenCalledWith(false);
  });

  it('toggles Dark Mode switch', async () => {
    const {getByTestId} = render(<SettingsScreen />, {
      withSafeArea: true,
      withNavigation: true,
    });
    const darkModeSwitch = getByTestId('dark-mode-switch');

    await act(async () => {
      fireEvent(darkModeSwitch, 'valueChange', true);
    });

    expect(uiStore.setColorScheme).toHaveBeenCalledWith('dark');
  });

  it('toggles Metal switch on iOS and adjusts GPU layers', async () => {
    Platform.OS = 'ios';

    const {getByTestId} = render(<SettingsScreen />, {
      withSafeArea: true,
      withNavigation: true,
    });
    const metalSwitch = getByTestId('metal-switch');

    await act(async () => {
      fireEvent(metalSwitch, 'valueChange', true);
    });

    expect(modelStore.updateUseMetal).toHaveBeenCalledWith(true);

    const gpuSlider = getByTestId('gpu-layers-slider');

    await act(async () => {
      fireEvent(gpuSlider, 'valueChange', 60);
    });

    expect(modelStore.setNGPULayers).toHaveBeenCalledWith(60);
  });

  it('toggles Display Memory Usage switch', async () => {
    const {getByTestId} = render(<SettingsScreen />, {
      withSafeArea: true,
      withNavigation: true,
    });
    const memoryUsageSwitch = getByTestId('display-memory-usage-switch');

    await act(async () => {
      fireEvent(memoryUsageSwitch, 'valueChange', true);
    });

    expect(uiStore.setDisplayMemUsage).toHaveBeenCalledWith(true);
  });
});
