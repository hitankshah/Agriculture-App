import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: category.icon }} style={styles.icon} />
      <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 12,
    color: '#212121',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
});