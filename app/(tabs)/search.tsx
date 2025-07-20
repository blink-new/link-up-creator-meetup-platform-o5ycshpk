import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Search, Filter, MapPin, Star, Clock } from 'lucide-react-native';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const categories = [
    'Fitness', 'Music', 'Content Creation', 'Business', 'Art', 'Cooking',
    'Photography', 'Writing', 'Tech', 'Fashion', 'Gaming', 'Wellness'
  ];

  const priceRanges = ['$0-25', '$25-50', '$50-100', '$100+'];
  const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Weekend'];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 py-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Search</Text>
        
        {/* Search Input */}
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 mb-4">
          <Search size={20} color="#9CA3AF" />
          <TextInput
            className="ml-3 flex-1 text-gray-900"
            placeholder="Search creators, skills, or categories..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Filter Button */}
        <TouchableOpacity className="flex-row items-center justify-center bg-primary px-4 py-3 rounded-xl">
          <Filter size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Filters</Text>
          {selectedFilters.length > 0 && (
            <View className="bg-accent rounded-full w-6 h-6 items-center justify-center ml-2">
              <Text className="text-white text-xs font-bold">
                {selectedFilters.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* Categories */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Categories</Text>
          <View className="flex-row flex-wrap">
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => toggleFilter(category)}
                className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                  selectedFilters.includes(category)
                    ? 'bg-primary border-primary'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text className={`font-medium ${
                  selectedFilters.includes(category) ? 'text-white' : 'text-gray-700'
                }`}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Range */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Price Range</Text>
          <View className="flex-row flex-wrap">
            {priceRanges.map((range) => (
              <TouchableOpacity
                key={range}
                onPress={() => toggleFilter(range)}
                className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                  selectedFilters.includes(range)
                    ? 'bg-primary border-primary'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text className={`font-medium ${
                  selectedFilters.includes(range) ? 'text-white' : 'text-gray-700'
                }`}>
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Time Availability */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Availability</Text>
          <View className="flex-row flex-wrap">
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot}
                onPress={() => toggleFilter(slot)}
                className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                  selectedFilters.includes(slot)
                    ? 'bg-primary border-primary'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text className={`font-medium ${
                  selectedFilters.includes(slot) ? 'text-white' : 'text-gray-700'
                }`}>
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location Filter */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Location</Text>
          <TouchableOpacity className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3">
            <MapPin size={20} color="#6B7280" />
            <Text className="ml-3 text-gray-600 flex-1">Current location (5 miles)</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Searches */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Popular Searches</Text>
          {[
            'Fitness coaching near me',
            'Music production lessons',
            'Content creation tips',
            'Business mentoring',
            'Photography workshops'
          ].map((search, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center py-3 border-b border-gray-100"
            >
              <Search size={16} color="#9CA3AF" />
              <Text className="ml-3 text-gray-700">{search}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Clear Filters */}
        {selectedFilters.length > 0 && (
          <TouchableOpacity
            onPress={() => setSelectedFilters([])}
            className="bg-gray-100 px-4 py-3 rounded-xl mb-4"
          >
            <Text className="text-gray-700 font-medium text-center">
              Clear All Filters
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}