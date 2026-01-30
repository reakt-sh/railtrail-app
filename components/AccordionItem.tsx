import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native';
import { Color } from '../values';
import { textStyles } from '../values/text-styles';

export interface AccordionItemProps {
  question: string;
  answer: string;
}

export const AccordionItem = ({ question, answer }: AccordionItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.accordionItem, !expanded && styles.accordionItemCollapsed]}>
      <Pressable onPress={toggleExpand} style={styles.accordionHeader}>
        <Text style={styles.questionText}>{question}</Text>
        <MaterialCommunityIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={Color.text}
        />
      </Pressable>
      {expanded && (
        <View style={styles.answerContainer}>
          <Text style={textStyles.bodyMedium}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionItem: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  accordionItemCollapsed: {
    borderBottomColor: Color.outline,
    borderBottomWidth: 1,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  questionText: {
    ...textStyles.headerTextThin,
    flex: 1,
    marginRight: 8,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
