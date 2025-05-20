import React from 'react';
import { Tractor, Microscope, TrendingUp, ChartBar as BarChart3, Building2, Truck, CircleHelp as HelpCircle } from 'lucide-react-native';

export const services = [
  {
    id: 1,
    title: 'Equipment Rental',
    description: 'Rent farming equipment for daily, weekly or monthly periods',
    icon: <Tractor size={24} color="#2E7D32" />
  },
  {
    id: 2,
    title: 'Soil Testing',
    description: 'Professional analysis of soil composition and quality',
    icon: <Microscope size={24} color="#2E7D32" />
  },
  {
    id: 3,
    title: 'Crop Insurance',
    description: 'Protect your crops against natural disasters and price fluctuations',
    icon: <TrendingUp size={24} color="#2E7D32" />
  },
  {
    id: 4,
    title: 'Market Analysis',
    description: 'Insights on crop prices and market trends',
    icon: <BarChart3 size={24} color="#2E7D32" />
  },
  {
    id: 5,
    title: 'Storage Solutions',
    description: 'Safe and efficient storage facilities for your produce',
    icon: <Building2 size={24} color="#2E7D32" />
  },
  {
    id: 6,
    title: 'Transport Services',
    description: 'Reliable transportation of goods to markets',
    icon: <Truck size={24} color="#2E7D32" />
  },
  {
    id: 7,
    title: 'Expert Consultation',
    description: 'Get advice from agricultural experts on various farming issues',
    icon: <HelpCircle size={24} color="#2E7D32" />
  }
];