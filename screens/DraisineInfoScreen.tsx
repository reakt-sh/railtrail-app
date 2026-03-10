import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Color } from '../constants/color';
import { textStyles } from '../constants/text-styles';
import { useTranslation } from '../hooks';

const videos = [
  { key: 'infoDraisineEquipment', videoId: 'nt2UC_P2qt0' },
  { key: 'infoDraisineRules', videoId: 'Y_b3CLVxdr4' },
  { key: 'infoDraisineTurning', videoId: 'hUnVDZjz-_o' },
];

export const DraisineInfoScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const windowWidth = Dimensions.get('window').width - 20;
  const youtubePlayerHeight = (windowWidth / 16) * 9;
  const localizedStrings = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container} nestedScrollEnabled={false}>
        <Text style={styles.description}>{localizedStrings.t('infoDraisineDescription')}</Text>
        <View style={styles.tabRow}>
          {videos.map((video, index) => (
            <Pressable
              key={video.key}
              style={[styles.tab, index === activeTab ? styles.tabActive : styles.tabInactive]}
              onPress={() => setActiveTab(index)}
            >
              <Text
                style={[
                  styles.tabText,
                  index === activeTab ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {localizedStrings.t(video.key)}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.youtubePlayerStyle}>
          <YoutubePlayer
            height={youtubePlayerHeight}
            videoId={videos[activeTab].videoId}
            mute
            webViewProps={{ overScrollMode: 'never' }}
            webViewStyle={{ flex: 1 }}
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
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  description: {
    ...textStyles.bodyLarge,
    marginBottom: 32,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Color.primary,
  },
  tabInactive: {
    backgroundColor: Color.gray,
  },
  tabText: {
    ...textStyles.titleSmall,
  },
  tabTextActive: {
    color: '#ffffff',
  },
  tabTextInactive: {
    color: Color.text,
  },
  youtubePlayerStyle: {
    overflow: 'hidden',
    flex: 1,
    borderRadius: 24,
    marginBottom: 16,
  },
});
