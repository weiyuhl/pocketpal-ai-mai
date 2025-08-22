import {StyleSheet} from 'react-native';

import type {Theme} from '../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    deviceInfoCard: {
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: 15,
    },
    deviceInfoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    deviceInfoLabel: {
      color: theme.colors.onSurfaceVariant,
    },
    deviceInfoValue: {
      color: theme.colors.onSurface,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    headerContent: {
      flex: 1,
    },
    headerSummary: {
      color: theme.colors.onSurfaceVariant,
      marginTop: 4,
    },
    section: {
      marginVertical: 8,
    },
    sectionTitle: {
      color: theme.colors.primary,
      marginBottom: 8,
      textTransform: 'uppercase',
    },
  });
