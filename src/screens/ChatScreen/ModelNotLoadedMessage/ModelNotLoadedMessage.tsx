import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import {useTheme} from '../../../hooks';

import {styles} from './styles';

import {modelStore} from '../../../store';

import {L10nContext} from '../../../utils';
import {Model, RootDrawerParamList} from '../../../utils/types';

type ModelNotLoadedScreenNavigationProp =
  DrawerNavigationProp<RootDrawerParamList>;

export const ModelNotLoadedMessage: React.FC = () => {
  const l10n = React.useContext(L10nContext);
  const navigation = useNavigation<ModelNotLoadedScreenNavigationProp>();
  const [lastUsedModel, setLastUsedModel] = useState<Model | undefined>(
    undefined,
  );

  useEffect(() => {
    const model = modelStore.lastUsedModel;
    setLastUsedModel(model);
  }, []); // Runs on mount to check if the model is available

  const theme = useTheme();

  const loadModelDirectly = () => {
    if (lastUsedModel) {
      modelStore
        .initContext(lastUsedModel)
        .then(() => {
          console.log('initialized');
        })
        .catch(e => {
          console.log(`Error: ${e}`);
        });
    }
  };

  const navigateToModelsPage = () => {
    navigation.navigate('Models');
  };

  const onDismiss = () => {
    // TODO: Handle dismiss logic
  };

  return (
    <View style={styles.container}>
      <Snackbar
        visible={true}
        onDismiss={onDismiss}
        action={{
          label: lastUsedModel ? l10n.chat.load : l10n.chat.goToModels,
          onPress: lastUsedModel ? loadModelDirectly : navigateToModelsPage,
          labelStyle: {color: theme.colors.inverseSecondary},
        }}>
        {lastUsedModel ? l10n.chat.readyToChat : l10n.chat.pleaseLoadModel}
      </Snackbar>
    </View>
  );
};
