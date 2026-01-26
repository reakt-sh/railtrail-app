import { StyleSheet, Text, FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { textStyles } from '../values/text-styles';
import { Color } from '../values/color';
import { Button } from '../components';
import { useEffect, useState } from 'react';
import { TrackListEntry } from '../types/init';
import { useDispatch } from 'react-redux';
import { AppAction } from '../redux/app';
import { useTranslation } from '../hooks';
import { CommonActions } from '@react-navigation/native';

// Statische Track-Liste (aktuell nur Malente-Lütjenburg)
const AVAILABLE_TRACKS: TrackListEntry[] = [{ id: 1, name: 'Malente-Lütjenburg' }];

export const TrackSelectionScreen = ({ navigation }: any) => {
  const [trackList, setTrackList] = useState<TrackListEntry[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<TrackListEntry | null>(null);

  const dispatch = useDispatch();
  const localizedStrings = useTranslation();

  useEffect(() => {
    setTrackList(AVAILABLE_TRACKS);
  }, []);

  type ItemProps = { track: TrackListEntry; selected: boolean };
  const Item = ({ track, selected }: ItemProps) => (
    <Pressable
      onPress={() => {
        setSelectedTrack(track);
      }}
    >
      <View style={selected ? styles.itemSelected : styles.item}>
        <Text style={[textStyles.itemText]}>{track.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          style={[
            textStyles.headerTextHuge,
            textStyles.textAlignmentCenter,
            textStyles.textSpacing8,
          ]}
        >
          {localizedStrings.t('trackSelectionTitle')}
        </Text>
        <Text style={[textStyles.textSpacing8, textStyles.textAlignmentCenter]}>
          {localizedStrings.t('trackSelectionDescription')}
        </Text>
      </View>
      <FlatList
        style={styles.listContainer}
        data={trackList}
        renderItem={({ item }) => <Item track={item} selected={item == selectedTrack} />}
      />
      <Button
        style={styles.button}
        text={localizedStrings.t('buttonContinue')}
        onPress={() => {
          if (selectedTrack != null) {
            dispatch(AppAction.setTrack({ id: selectedTrack.id }));

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              })
            );
          }
        }}
        disabled={selectedTrack == null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundLight,
    paddingVertical: 24,
  },
  textContainer: {
    paddingHorizontal: 24,
  },
  listContainer: {
    paddingHorizontal: 24,
  },
  button: {
    paddingHorizontal: 24,
  },
  item: {
    marginVertical: 8,
    padding: 8,
    borderColor: Color.darkGray,
    borderWidth: 2,
    borderRadius: 8,
  },
  itemSelected: {
    marginVertical: 8,
    padding: 8,
    borderColor: Color.primary,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: Color.gray,
  },
});
