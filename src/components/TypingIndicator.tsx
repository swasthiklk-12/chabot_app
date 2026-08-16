import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

function Dot({ delay }: { delay: number }) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity, delay]);

  return <Animated.View style={[styles.dot, { opacity }]} />;
}

export default function TypingIndicator() {
  return (
    <View style={styles.row}>
      <View style={styles.bubble}>
        <Dot delay={0} />
        <Dot delay={150} />
        <Dot delay={300} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginVertical: 4,
    justifyContent: 'flex-start',
  },
  bubble: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#6B7280',
    marginHorizontal: 2,
  },
});
