import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native';
import { Color } from '../constants';
import { textStyles } from '../constants/text-styles';
import { useTranslation } from '../hooks';

export interface AccordionItemProps {
  question: string;
  answer: string;
  children?: React.ReactNode;
}

export const AccordionItem = ({ question, answer, children }: AccordionItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const i18n = useTranslation();

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.accordionItem, !expanded && styles.accordionItemCollapsed]}>
      <Pressable
        onPress={toggleExpand}
        style={styles.accordionHeader}
        accessibilityRole="button"
        accessibilityLabel={question}
        accessibilityHint={expanded ? i18n.t('a11yCollapseSection') : i18n.t('a11yExpandSection')}
        accessibilityState={{ expanded }}
      >
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
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionItem: {
    borderRadius: 12,
    marginBottom: 12,
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
    ...textStyles.bodyLarge,
    flex: 1,
    marginRight: 8,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
