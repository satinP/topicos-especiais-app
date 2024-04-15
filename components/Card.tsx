import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CardProps = {
  title: string;
  style?: React.CSSProperties;
  children: JSX.Element | Array<JSX.Element>;
};

const Card = ({ title, style,children }: CardProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginBottom: 20,
    padding: 20,
    gap: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '800',
    alignSelf: 'flex-start',
  },
});

export default Card;
