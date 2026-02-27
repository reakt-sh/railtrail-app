import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Color } from '../constants/color';
import { textStyles } from '../constants/text-styles';
import { useTranslation } from '../hooks';

interface Props {
  readonly isVisible: boolean;
  readonly onSubmit: (rating: number, text?: string) => void;
  readonly onSkip: () => void;
}

export const FeedbackBottomSheet = memo(({ isVisible, onSubmit, onSkip }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['55%'], []);
  const i18n = useTranslation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (isVisible) {
      // Reset state when opening
      setRating(0);
      setComment('');
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const handleSubmit = () => {
    Keyboard.dismiss();
    onSubmit(rating, comment.trim() || undefined);
  };

  const handleSkip = () => {
    Keyboard.dismiss();
    onSkip();
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          accessibilityRole="button"
          accessibilityLabel={`${i} ${i === 1 ? 'star' : 'stars'}`}
          accessibilityState={{ selected: rating >= i }}
          style={styles.starButton}
        >
          <MaterialCommunityIcons
            name={rating >= i ? 'star' : 'star-outline'}
            size={40}
            color={rating >= i ? Color.warning : Color.darkGray}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{i18n.t('feedbackTitle')}</Text>

        <View style={styles.starsContainer}>{renderStars()}</View>

        <TextInput
          style={styles.textInput}
          placeholder={i18n.t('feedbackPlaceholder')}
          placeholderTextColor={Color.darkGray}
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        <Pressable
          style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={rating === 0}
        >
          <Text style={styles.submitButtonText}>{i18n.t('feedbackSubmit')}</Text>
        </Pressable>

        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={textStyles.textButton}>{i18n.t('feedbackSkip')}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  title: {
    ...textStyles.headerTextHuge,
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  textInput: {
    ...textStyles.bodyMedium,
    width: '100%',
    minHeight: 80,
    borderWidth: 1,
    borderColor: Color.outline,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
  },
  submitButton: {
    width: '100%',
    backgroundColor: Color.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: Color.darkGray,
  },
  submitButtonText: {
    ...textStyles.bodyMedium,
    color: Color.white,
    fontWeight: '600',
  },
  skipButton: {
    marginTop: 16,
    padding: 8,
  },
});
