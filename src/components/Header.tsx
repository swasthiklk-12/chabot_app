import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  onReset: () => void;
}

export default function Header({ onReset }: Props) {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>✨ aibot</Text>
      <TouchableOpacity onPress={onReset} style={styles.resetButton}>
        <Text style={styles.resetText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#111827',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  resetButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#1F2937',
  },
  resetText: {
    color: '#D1D5DB',
    fontSize: 13,
    fontWeight: '600',
  },
});
