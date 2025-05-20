import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Trash2, Minus, Plus } from 'lucide-react-native';
import { Product } from '@/components/marketplace/ProductCard';

interface CartItemProps {
  item: Product & { quantity: number };
  onRemove: () => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          <View style={styles.quantityControl}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleDecrease}
              disabled={quantity <= 1}
            >
              <Minus size={16} color="#757575" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleIncrease}
            >
              <Plus size={16} color="#757575" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
            <Trash2 size={16} color="#D32F2F" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
    fontFamily: 'Poppins-Medium',
  },
  category: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    fontFamily: 'Poppins-SemiBold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    paddingHorizontal: 8,
    fontFamily: 'Poppins-Medium',
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
});