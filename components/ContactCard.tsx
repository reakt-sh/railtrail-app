import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Color } from '../values';
import { textStyles } from '../values/text-styles';

export interface ContactCardProps {
  title: string;
  subtitle?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export const ContactCard = ({ title, subtitle, phone, email, address }: ContactCardProps) => {
  const handlePhonePress = () => {
    if (phone) {
      Linking.openURL(`tel:${phone.replace(/\s/g, '')}`);
    }
  };

  const handleEmailPress = () => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}

      {address && (
        <View style={styles.row}>
          <MaterialCommunityIcons name="map-marker-outline" size={20} color={Color.darkGray} />
          <Text style={[textStyles.bodyMedium, styles.ml8]}>{address}</Text>
        </View>
      )}

      {phone && (
        <Pressable onPress={handlePhonePress} style={styles.row}>
          <MaterialCommunityIcons name="phone-outline" size={20} color={Color.primary} />
          <Text style={[styles.ml8, textStyles.link]}>{phone}</Text>
        </Pressable>
      )}

      {email && (
        <Pressable onPress={handleEmailPress} style={styles.row}>
          <MaterialCommunityIcons name="email-outline" size={20} color={Color.primary} />
          <Text style={[styles.ml8, textStyles.link]}>{email}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    ...textStyles.headerTextMedium,
    marginBottom: 4,
  },
  cardSubtitle: {
    ...textStyles.bodyMedium,
    color: Color.darkGray,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ml8: { marginLeft: 8 },
});
