import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { MapPin, Star, Wifi, Coffee, Users, Shield } from 'lucide-react-native';

interface Venue {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  distance: string;
  address: string;
  amenities: string[];
  priceRange: string;
  isPartner: boolean;
}

export default function VenuesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const venues: Venue[] = [
    {
      id: '1',
      name: 'Blue Bottle Coffee',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop',
      category: 'Coffee Shop',
      rating: 4.8,
      distance: '0.3 miles',
      address: '66 Mint St, San Francisco',
      amenities: ['WiFi', 'Quiet Space', 'Outdoor Seating'],
      priceRange: '$',
      isPartner: true
    },
    {
      id: '2',
      name: 'Equinox SOMA',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      category: 'Fitness Studio',
      rating: 4.9,
      distance: '0.5 miles',
      address: '1 Post St, San Francisco',
      amenities: ['Equipment', 'Changing Rooms', 'Showers'],
      priceRange: '$$$',
      isPartner: true
    },
    {
      id: '3',
      name: 'The Mill',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop',
      category: 'Cafe',
      rating: 4.6,
      distance: '0.8 miles',
      address: '736 Divisadero St, San Francisco',
      amenities: ['WiFi', 'Large Tables', 'Pastries'],
      priceRange: '$$',
      isPartner: false
    },
    {
      id: '4',
      name: 'WeWork SOMA',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop',
      category: 'Coworking',
      rating: 4.7,
      distance: '0.4 miles',
      address: '535 Mission St, San Francisco',
      amenities: ['Meeting Rooms', 'WiFi', 'Printing'],
      priceRange: '$$',
      isPartner: true
    }
  ];

  const categories = ['All', 'Coffee Shop', 'Fitness Studio', 'Cafe', 'Coworking', 'Restaurant'];

  const filteredVenues = selectedCategory === 'All' 
    ? venues 
    : venues.filter(venue => venue.category === selectedCategory);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 py-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Venues</Text>
        <Text className="text-gray-600">Safe spaces for your meetups</Text>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-4 py-4"
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            className={`mr-3 px-4 py-2 rounded-full ${
              category === selectedCategory ? 'bg-primary' : 'bg-white border border-gray-200'
            }`}
          >
            <Text className={`font-medium ${
              category === selectedCategory ? 'text-white' : 'text-gray-700'
            }`}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Venues List */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {filteredVenues.map((venue) => (
          <TouchableOpacity
            key={venue.id}
            className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Venue Image */}
            <View className="relative">
              <Image
                source={{ uri: venue.image }}
                className="w-full h-48"
              />
              {venue.isPartner && (
                <View className="absolute top-3 left-3 bg-primary px-2 py-1 rounded-full flex-row items-center">
                  <Shield size={12} color="white" />
                  <Text className="text-white text-xs font-medium ml-1">Partner</Text>
                </View>
              )}
              <View className="absolute top-3 right-3 bg-black/50 px-2 py-1 rounded-full">
                <Text className="text-white text-xs font-medium">{venue.priceRange}</Text>
              </View>
            </View>

            {/* Venue Info */}
            <View className="p-4">
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900">{venue.name}</Text>
                  <Text className="text-primary font-medium">{venue.category}</Text>
                </View>
                <View className="flex-row items-center">
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text className="text-sm text-gray-600 ml-1">{venue.rating}</Text>
                </View>
              </View>

              <View className="flex-row items-center mb-3">
                <MapPin size={14} color="#6B7280" />
                <Text className="text-sm text-gray-600 ml-1">{venue.address}</Text>
                <Text className="text-sm text-gray-400 ml-2">• {venue.distance}</Text>
              </View>

              {/* Amenities */}
              <View className="flex-row flex-wrap mb-3">
                {venue.amenities.map((amenity, index) => (
                  <View
                    key={index}
                    className="bg-gray-50 px-2 py-1 rounded-full mr-2 mb-1 flex-row items-center"
                  >
                    {amenity === 'WiFi' && <Wifi size={12} color="#6B7280" />}
                    {amenity === 'Quiet Space' && <Users size={12} color="#6B7280" />}
                    {amenity === 'Outdoor Seating' && <Coffee size={12} color="#6B7280" />}
                    {amenity === 'Equipment' && <Users size={12} color="#6B7280" />}
                    {amenity === 'Changing Rooms' && <Users size={12} color="#6B7280" />}
                    {amenity === 'Showers' && <Users size={12} color="#6B7280" />}
                    {amenity === 'Large Tables' && <Users size={12} color="#6B7280" />}
                    {amenity === 'Pastries' && <Coffee size={12} color="#6B7280" />}
                    {amenity === 'Meeting Rooms' && <Users size={12} color="#6B7280" />}
                    {amenity === 'Printing' && <Users size={12} color="#6B7280" />}
                    <Text className="text-xs text-gray-600 ml-1">{amenity}</Text>
                  </View>
                ))}
              </View>

              {/* Action Button */}
              <TouchableOpacity className="bg-primary px-4 py-3 rounded-xl">
                <Text className="text-white font-semibold text-center">
                  Select Venue
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {/* Add Venue CTA */}
        <TouchableOpacity className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-6 mb-4 items-center">
          <MapPin size={32} color="#9CA3AF" />
          <Text className="text-lg font-semibold text-gray-700 mt-2">
            Don't see your venue?
          </Text>
          <Text className="text-gray-500 text-center mt-1 mb-3">
            Partner with us to host creator meetups
          </Text>
          <TouchableOpacity className="bg-primary px-6 py-2 rounded-full">
            <Text className="text-white font-semibold">Become a Partner</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
}