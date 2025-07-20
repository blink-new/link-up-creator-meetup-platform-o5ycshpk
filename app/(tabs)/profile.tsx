import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Switch,
} from 'react-native';
import {
  Settings,
  Shield,
  CreditCard,
  Bell,
  HelpCircle,
  Star,
  Calendar,
  DollarSign,
  Users,
  ChevronRight,
  LogOut,
} from 'lucide-react-native';
import { blink } from '@/lib/blink';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    blink.auth.logout();
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <Text className="text-lg text-gray-600">Loading...</Text>
      </SafeAreaView>
    );
  }

  const menuItems = [
    {
      icon: Calendar,
      title: 'My Bookings',
      subtitle: 'View upcoming and past sessions',
      onPress: () => {},
    },
    {
      icon: DollarSign,
      title: 'Earnings',
      subtitle: 'Track your creator earnings',
      onPress: () => {},
    },
    {
      icon: Star,
      title: 'Reviews',
      subtitle: 'See what fans say about you',
      onPress: () => {},
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      subtitle: 'Manage cards and payouts',
      onPress: () => {},
    },
    {
      icon: Shield,
      title: 'Safety Center',
      subtitle: 'Verification and safety tools',
      onPress: () => {},
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Manage your preferences',
      onPress: () => {},
      rightComponent: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
          thumbColor={notificationsEnabled ? '#FFFFFF' : '#9CA3AF'}
        />
      ),
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help or contact us',
      onPress: () => {},
    },
    {
      icon: Settings,
      title: 'Settings',
      subtitle: 'App preferences and privacy',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-4 py-6 border-b border-gray-100">
          <View className="flex-row items-center">
            <Image
              source={{ 
                uri: user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
              }}
              className="w-20 h-20 rounded-full"
            />
            <View className="flex-1 ml-4">
              <Text className="text-2xl font-bold text-gray-900">
                {user.displayName || user.email?.split('@')[0] || 'User'}
              </Text>
              <Text className="text-gray-600">{user.email}</Text>
              <View className="flex-row items-center mt-2">
                <Shield size={16} color="#10B981" />
                <Text className="text-green-600 font-medium ml-1">Verified</Text>
              </View>
            </View>
            <TouchableOpacity className="p-2">
              <Settings size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="px-4 py-4">
          <View className="flex-row space-x-4">
            <View className="flex-1 bg-white rounded-2xl p-4 border border-gray-100">
              <View className="flex-row items-center justify-between mb-2">
                <Users size={20} color="#6366F1" />
                <Text className="text-2xl font-bold text-gray-900">12</Text>
              </View>
              <Text className="text-gray-600 text-sm">Sessions Booked</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 border border-gray-100">
              <View className="flex-row items-center justify-between mb-2">
                <Star size={20} color="#F59E0B" />
                <Text className="text-2xl font-bold text-gray-900">4.9</Text>
              </View>
              <Text className="text-gray-600 text-sm">Average Rating</Text>
            </View>
          </View>
        </View>

        {/* Creator Mode Toggle */}
        <View className="bg-gradient-to-r from-primary to-purple-600 mx-4 rounded-2xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">Become a Creator</Text>
              <Text className="text-white/80 text-sm">
                Start earning by offering your skills
              </Text>
            </View>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-full">
              <Text className="text-primary font-semibold">Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              className="bg-white rounded-2xl p-4 mb-3 border border-gray-100"
            >
              <View className="flex-row items-center">
                <View className="bg-gray-50 p-3 rounded-full">
                  <item.icon size={20} color="#6B7280" />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </Text>
                  <Text className="text-gray-600 text-sm">{item.subtitle}</Text>
                </View>
                {item.rightComponent || (
                  <ChevronRight size={20} color="#9CA3AF" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View className="px-4 py-4">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-50 border border-red-200 rounded-2xl p-4"
          >
            <View className="flex-row items-center justify-center">
              <LogOut size={20} color="#EF4444" />
              <Text className="text-red-600 font-semibold ml-2">Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="px-4 pb-8">
          <Text className="text-center text-gray-500 text-sm">
            Link Up v1.0.0
          </Text>
          <Text className="text-center text-gray-400 text-xs mt-1">
            Connecting creators and fans safely
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}