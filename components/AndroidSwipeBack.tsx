import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface AndroidSwipeBackProps {
  onSwipeBack: () => void;
  children: React.ReactNode;
}

export const AndroidSwipeBack = ({ onSwipeBack, children }: AndroidSwipeBackProps) => {
  if (Platform.OS !== 'android') {
    return <>{children}</>;
  }

  return <AndroidSwipeBackGesture onSwipeBack={onSwipeBack}>{children}</AndroidSwipeBackGesture>;
};

const AndroidSwipeBackGesture = ({ onSwipeBack, children }: AndroidSwipeBackProps) => {
  const handleSwipeBack = useCallback(() => {
    onSwipeBack();
  }, [onSwipeBack]);

  const panGesture = Gesture.Pan()
    .activeOffsetX([- 20, 20])
    .failOffsetY([-20, 20])
    .onEnd((event) => {
      if (event.translationX > 80 && event.velocityX > 300) {
        handleSwipeBack();
      }
    })
    .runOnJS(true);

  return <GestureDetector gesture={panGesture}>{children}</GestureDetector>;
};
