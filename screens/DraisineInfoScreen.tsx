import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Color } from '../consts/color';
import { textStyles } from '../consts/text-styles';
import { useTranslation } from '../hooks';

export const DraisineInfoScreen = () => {
  const windowWidth = Dimensions.get('window').width - 20;
  const youtubePlayerHeight = (windowWidth / 16) * 9;
  const localizedStrings = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container} nestedScrollEnabled={false}>
        <Text style={styles.headline}>{localizedStrings.t('infoDraisineEquipment')}</Text>
        <View style={styles.youtubePlayerStyle}>
          <YoutubePlayer
            height={youtubePlayerHeight}
            videoId={'nt2UC_P2qt0'}
            mute
            webViewProps={{ overScrollMode: 'never' }}
            webViewStyle={{ flex: 1 }}
          />
        </View>

        <Text style={styles.headline}>{localizedStrings.t('infoDraisineRules')}</Text>
        <View style={styles.youtubePlayerStyle}>
          <YoutubePlayer
            height={youtubePlayerHeight}
            videoId={'Y_b3CLVxdr4'}
            mute
            webViewProps={{ overScrollMode: 'never' }}
            webViewStyle={{ borderRadius: 24 }}
          />
        </View>
        <Text style={styles.headline}>{localizedStrings.t('infoDraisineTurning')}</Text>
        <View style={styles.youtubePlayerStyle}>
          <YoutubePlayer
            height={youtubePlayerHeight}
            videoId={'hUnVDZjz-_o'}
            mute
            webViewProps={{ overScrollMode: 'never' }}
            webViewStyle={{ borderRadius: 24 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.backgroundLight,
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 16,
    marginBottom: 16,
  },
  youtubePlayerStyle: {
    overflow: 'hidden',
    flex: 1,
    borderRadius: 24,
    marginBottom: 16,
  },
  headline: {
    ...textStyles.headerTextMedium,
    marginBottom: 16,
  },
});
