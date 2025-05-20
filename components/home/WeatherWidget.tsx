import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Cloud, Thermometer, Droplets, Wind } from 'lucide-react-native';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  forecast: Array<{
    day: string;
    temp: number;
    icon: JSX.Element;
  }>;
}

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      const API_KEY = 'e004d6c701b56408d71b309ce463ecc7';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=Delhi&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();

      const getDayName = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      };

      setWeatherData({
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        location: `${data.name}, ${data.sys.country}`,
        forecast: forecastData.list
          .filter((_: any, index: number) => index % 8 === 0)
          .slice(0, 4)
          .map((item: any) => ({
            day: getDayName(item.dt_txt),
            temp: Math.round(item.main.temp),
            icon: <Cloud size={20} color="#757575" />
          }))
      });
      setLoading(false);
    } catch (err) {
      setError('Unable to fetch weather data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  if (error || !weatherData) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.location}>{weatherData.location}</Text>
          <Text style={styles.condition}>{weatherData.condition}</Text>
        </View>
        <Text style={styles.temperature}>{weatherData.temperature}°C</Text>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Thermometer size={16} color="#757575" />
          <Text style={styles.detailText}>Feels like {weatherData.temperature}°C</Text>
        </View>
        <View style={styles.detailItem}>
          <Droplets size={16} color="#757575" />
          <Text style={styles.detailText}>Humidity {weatherData.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Wind size={16} color="#757575" />
          <Text style={styles.detailText}>Wind {weatherData.windSpeed} km/h</Text>
        </View>
      </View>
      
      <View style={styles.forecast}>
        {weatherData.forecast.map((day, index) => (
          <View key={index} style={styles.forecastDay}>
            <Text style={styles.forecastDayText}>{day.day}</Text>
            {day.icon}
            <Text style={styles.forecastTemp}>{day.temp}°</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    fontFamily: 'Poppins-SemiBold',
  },
  condition: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Poppins-Regular',
  },
  temperature: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'Poppins-Bold',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
    fontFamily: 'Poppins-Regular',
  },
  forecast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 12,
  },
  forecastDay: {
    alignItems: 'center',
  },
  forecastDayText: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  forecastTemp: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginTop: 4,
    fontFamily: 'Poppins-Medium',
  },
});