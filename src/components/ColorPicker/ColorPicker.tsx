import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './style';

type ColorPickerProps = {
  selectedColor: string;
  onSelect: (color: string) => void;
};

const COLORS = [
  '#f39c12',
  '#e74c3c',
  '#3498db',
  '#2ecc71',
  '#9b59b6',
  '#34495e',
  '#1abc9c',
];

export default function ColorPicker({
  selectedColor,
  onSelect,
}: ColorPickerProps) {
  return (
    <View style={styles.container}>
      {COLORS.map(color => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorCircle,
            {
              backgroundColor: color,
              borderWidth: selectedColor === color ? 3 : 1,
            },
          ]}
          onPress={() => onSelect(color)}
        />
      ))}
    </View>
  );
}
