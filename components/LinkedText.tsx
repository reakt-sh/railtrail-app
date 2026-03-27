import React from 'react';
import { Linking, Text, TextStyle, StyleProp } from 'react-native';
import { textStyles } from '../constants/text-styles';

type LinkedTextProps = {
  style?: StyleProp<TextStyle>;
  children: string;
};

const LINK_REGEX = /(https?:\/\/[^\s)]+|[\w.-]+@[\w.-]+\.\w+)/g;
const LINK_TEST = /^(https?:\/\/[^\s)]+|[\w.-]+@[\w.-]+\.\w+)$/;

export const LinkedText = ({ style, children }: LinkedTextProps) => {
  const parts = children.split(LINK_REGEX);

  return (
    <Text style={style}>
      {parts.map((part, index) => {
        if (LINK_TEST.test(part)) {
          const isEmail = !part.startsWith('http');
          const url = isEmail ? `mailto:${part}` : part;
          return (
            <Text
              key={index}
              style={textStyles.link}
              onPress={() => Linking.openURL(url)}
            >
              {part}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
};
