import { StyleSheet, Text, View } from 'react-native';
import { Color } from '../constants';
import { textStyles } from '../constants/text-styles';
import { useTranslation } from '../hooks';

type TableData = {
  title: string;
  headers: string[];
  rows: { label: string; values: string[] }[];
};

const Table = ({ data }: { data: TableData }) => {
  const columnCount = data.headers.length + 1;

  return (
    <View style={styles.section}>
      <Text style={[textStyles.titleMedium, styles.sectionTitle]}>{data.title}</Text>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <View style={styles.labelColumn}>
            <Text style={[textStyles.bodySmall, styles.headerCell]}>{''}</Text>
          </View>
          {data.headers.map((header, i) => (
            <View key={i} style={styles.valueColumn}>
              <Text style={[textStyles.bodySmall, styles.headerCell]}>{header}</Text>
            </View>
          ))}
        </View>
        {data.rows.map((row, index) => (
          <View key={index} style={[styles.row, index % 2 === 0 && styles.rowEven]}>
            <View style={styles.labelColumn}>
              <Text style={textStyles.bodySmall}>{row.label}</Text>
            </View>
            {row.values.map((value, i) => (
              <View key={i} style={styles.valueColumn}>
                <Text style={textStyles.bodySmall}>{value}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export const DepartureTable = () => {
  const i18n = useTranslation();

  const malente: TableData = {
    title: i18n.t('departureMalente'),
    headers: [
      i18n.t('departureDayTour'),
      i18n.t('departure3hTour') + ' 10:00',
      i18n.t('departure3hTour') + ' 13:30',
    ],
    rows: [
      { label: i18n.t('departureDeparture'), values: ['10:00', '10:00', '13:30'] },
      { label: i18n.t('departureTurn'), values: ['–', '11:30', '15:00'] },
      { label: i18n.t('departureArrivalLuetjenburg'), values: ['bis 12:00', '', ''] },
      { label: i18n.t('departureReturnStartLuetjenburg'), values: ['15:00', '', ''] },
      { label: i18n.t('departureReturn'), values: ['bis 17:00', 'bis 13:00', 'bis 16:30'] },
    ],
  };

  const luetjenburg: TableData = {
    title: i18n.t('departureLuetjenburg'),
    headers: [i18n.t('departure3hTour') + ' 12:00', i18n.t('departure3hTour') + ' 15:00'],
    rows: [
      { label: i18n.t('departureDeparture'), values: ['12:00', '15:00'] },
      { label: i18n.t('departureTurn'), values: ['13:30', '16:30'] },
      { label: i18n.t('departureReturn'), values: ['bis 15:00', 'bis 18:00'] },
    ],
  };

  return (
    <View>
      <Table data={malente} />
      <Table data={luetjenburg} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    color: Color.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  table: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Color.primary,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: Color.primary,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  headerCell: {
    color: Color.white,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  rowEven: {
    backgroundColor: Color.backgroundLight,
  },
  labelColumn: {
    flex: 2,
    paddingHorizontal: 4,
  },
  valueColumn: {
    flex: 1,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
});
