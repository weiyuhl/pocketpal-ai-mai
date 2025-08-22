import React, {useState, useContext} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import Clipboard from '@react-native-clipboard/clipboard';
import {Text, Button} from 'react-native-paper';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {CopyIcon, GithubIcon, HeartIcon} from '../../assets/icons';

import {} from '../../components';
import {useTheme} from '../../hooks';
import {createStyles} from './styles';
import {L10nContext} from '../../utils';

const GithubButtonIcon = ({color}: {color: string}) => (
  <GithubIcon stroke={color} />
);

export const AboutScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  const l10n = useContext(L10nContext);
  const [appInfo, setAppInfo] = React.useState({
    version: '',
    build: '',
  });

  React.useEffect(() => {
    const version = DeviceInfo.getVersion();
    const buildNumber = DeviceInfo.getBuildNumber();
    setAppInfo({
      version,
      build: buildNumber,
    });
  }, []);

  const copyVersionToClipboard = () => {
    const versionString = `Version ${appInfo.version} (${appInfo.build})`;
    Clipboard.setString(versionString);
    Alert.alert(
      l10n.about.versionCopiedTitle,
      l10n.about.versionCopiedDescription,
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text variant="titleLarge" style={styles.title}>
                PocketPal AI
              </Text>
              <Text variant="bodyMedium" style={styles.description}>
                {l10n.about.description}
              </Text>
              <View style={styles.versionContainer}>
                <TouchableOpacity
                  style={styles.versionButton}
                  onPress={copyVersionToClipboard}>
                  <Text style={styles.versionText}>
                    v{appInfo.version} ({appInfo.build})
                  </Text>
                  <CopyIcon
                    width={16}
                    height={16}
                    stroke={theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{l10n.about.supportProject}</Text>
            <Text variant="bodyMedium" style={styles.description}>
              {l10n.about.supportProjectDescription}
            </Text>
            <Button
              mode="outlined"
              onPress={() =>
                Linking.openURL('https://github.com/a-ghorbani/pocketpal-ai')
              }
              style={styles.actionButton}
              icon={GithubButtonIcon}>
              {l10n.about.githubButton}
            </Button>
            {Platform.OS !== 'ios' && (
              <>
                <Text style={styles.orText}>{l10n.about.orText}</Text>
                <TouchableOpacity
                  style={styles.supportButton}
                  onPress={() =>
                    Linking.openURL('https://www.buymeacoffee.com/aghorbani')
                  }>
                  <HeartIcon stroke={theme.colors.onPrimary} />
                  <Text style={styles.supportButtonText}>
                    {l10n.about.sponsorButton}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
