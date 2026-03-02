import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { DraisineIcon } from '../assets/icons';
import { Color, textStyles } from '../constants';
import { useTranslation } from '../hooks';

export const LoadingVehiclesOverlay = () => {
  const localizedStrings = useTranslation();
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 400, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 400, easing: Easing.in(Easing.quad) })
      ),
      -1, // infinite
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Animated.View style={animatedStyle}>
          <DraisineIcon width={80} height={80} color={Color.primary} />
        </Animated.View>
        <Text style={textStyles.buttonText}>{localizedStrings.t('loadingVehicles')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  content: {
    alignItems: 'center',
    gap: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.text,
  },
});
