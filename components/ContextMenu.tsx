import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from '../constants';
import { textStyles } from '../constants/text-styles';

export interface ContextMenuItem {
  label: string;
  icon: string;
  onPress: () => void;
}

interface ContextMenuProps {
  visible: boolean;
  onClose: () => void;
  items: ContextMenuItem[];
  anchorPosition: { x: number; y: number };
}

export const ContextMenu = ({ visible, onClose, items, anchorPosition }: ContextMenuProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View
          style={[styles.menu, { top: anchorPosition.y, left: anchorPosition.x }]}
          onStartShouldSetResponder={() => true}
        >
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, index < items.length - 1 && styles.menuItemBorder]}
              onPress={() => {
                onClose();
                item.onPress();
              }}
              activeOpacity={0.6}
            >
              <MaterialCommunityIcons
                name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                size={20}
                color={Color.darkGray}
              />
              <Text style={[textStyles.bodyMedium, styles.menuItemLabel]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    backgroundColor: Color.white,
    borderRadius: 8,
    paddingVertical: 4,
    minWidth: 180,
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Color.outline,
  },
  menuItemLabel: {
    marginLeft: 12,
  },
});
