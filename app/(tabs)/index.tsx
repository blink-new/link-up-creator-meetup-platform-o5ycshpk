import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { Search, Bell, Star, MapPin, Clock, Shield } from 'lucide-react-native';
import { blink } from '@/lib/blink';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  category: string;
  rating: number;
  price: number;
  location: string;
  isVerified: boolean;
  nextAvailable: string;
  description: string;
}

export default function DiscoverScreen() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCreators();
  }, []);

  const loadCreators = async () => {
    // Mock data for now - will connect to database later
    const mockCreators: Creator[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        category: 'Fitness Coach',
        rating: 4.9,
        price: 45,
        location: 'Downtown SF',
        isVerified: true,
        nextAvailable: 'Today 3:00 PM',
        description: 'Personal training & wellness coaching'
      },
      {
        id: '2',
        name: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        category: 'Music Producer',
        rating: 4.8,
        price: 75,
        location: 'Mission District',
        isVerified: true,
        nextAvailable: 'Tomorrow 10:00 AM',
        description: 'Beat making & music production tips'
      },
      {
        id: '3',
        name: 'Emma Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        category: 'Content Creator',
        rating: 4.7,
        price: 35,
        location: 'SOMA',
        isVerified: false,
        nextAvailable: 'Today 6:00 PM',
        description: 'Social media strategy & content creation'
      }
    ];
    setCreators(mockCreators);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCreators();
    setRefreshing(false);
  };



  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Discover</Text>
            <Text style={styles.headerSubtitle}>Find amazing creators near you</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <Text style={styles.searchPlaceholder}>Search creators, categories...</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {['All', 'Fitness', 'Music', 'Content', 'Business', 'Art'].map((category, index) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, index === 0 && styles.categoryButtonActive]}
          >
            <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Creator Cards */}
      <ScrollView
        style={styles.creatorsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {creators.map((creator) => (
          <TouchableOpacity key={creator.id} style={styles.creatorCard}>
            {/* Creator Header */}
            <View style={styles.creatorHeader}>
              <Image source={{ uri: creator.avatar }} style={styles.avatar} />
              <View style={styles.creatorInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.creatorName}>{creator.name}</Text>
                  {creator.isVerified && (
                    <Shield size={16} color="#6366F1" style={styles.verifiedIcon} />
                  )}
                </View>
                <Text style={styles.creatorCategory}>{creator.category}</Text>
                <View style={styles.ratingRow}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>
                    {creator.rating} • {creator.location}
                  </Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${creator.price}</Text>
                <Text style={styles.priceLabel}>per session</Text>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description}>{creator.description}</Text>

            {/* Availability */}
            <View style={styles.availabilityRow}>
              <View style={styles.availabilityInfo}>
                <Clock size={16} color="#10B981" />
                <Text style={styles.availabilityText}>{creator.nextAvailable}</Text>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    color: '#6B7280',
  },
  notificationButton: {
    padding: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchPlaceholder: {
    marginLeft: 12,
    color: '#9CA3AF',
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryButton: {
    marginRight: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  categoryText: {
    fontWeight: '500',
    color: '#374151',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  creatorsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  creatorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  creatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  creatorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  creatorCategory: {
    color: '#6366F1',
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  priceLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  description: {
    color: '#6B7280',
    marginBottom: 12,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  availabilityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 14,
    color: '#059669',
    marginLeft: 4,
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 16,
  },
});