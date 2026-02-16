import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Color } from '../constants/color';
import { FAB } from './Fab';

interface ExternalProps {
  readonly onPress: () => void;
  readonly isActive: boolean;
  readonly accessibilityLabelActive: string;
  readonly accessibilityLabelInactive: string;
}

type Props = ExternalProps;

export const LocationButton = ({
  onPress,
  isActive,
  accessibilityLabelActive,
  accessibilityLabelInactive,
}: Props) => (
  <FAB
    onPress={onPress}
    accessibilityLabel={isActive ? accessibilityLabelActive : accessibilityLabelInactive}
  >
    {isActive ? (
      <MaterialIcons name="my-location" size={30} color={Color.primary} />
    ) : (
      <MaterialIcons name="location-searching" size={30} color={Color.black} />
    )}
  </FAB>
);
