import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Search, MoreHorizontal, Clock, CheckCheck } from 'lucide-react-native';

interface Message {
  id: string;
  creatorName: string;
  creatorAvatar: string;
  lastMessage: string;
  timestamp: string;
  isRead: boolean;
  isOnline: boolean;
  meetupDate?: string;
}

export default function MessagesScreen() {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      creatorName: 'Sarah Chen',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Looking forward to our session tomorrow! I\'ll bring some extra equipment.',
      timestamp: '2m ago',
      isRead: false,
      isOnline: true,
      meetupDate: 'Tomorrow 3:00 PM'
    },
    {
      id: '2',
      creatorName: 'Marcus Johnson',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thanks for the great session! Hope the beats help with your project.',
      timestamp: '1h ago',
      isRead: true,
      isOnline: false,
      meetupDate: 'Completed'
    },
    {
      id: '3',
      creatorName: 'Emma Rodriguez',
      creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hey! Just confirmed our meetup for Friday. See you at Blue Bottle!',
      timestamp: '3h ago',
      isRead: true,
      isOnline: true,
      meetupDate: 'Friday 6:00 PM'
    }
  ]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 py-4 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-gray-900">Messages</Text>
          <TouchableOpacity className="p-2">
            <MoreHorizontal size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
        
        {/* Search */}
        <TouchableOpacity className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3">
          <Search size={20} color="#9CA3AF" />
          <Text className="ml-3 text-gray-500 flex-1">Search messages...</Text>
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {messages.length === 0 ? (
          <View className="flex-1 justify-center items-center px-4 py-20">
            <View className="bg-gray-100 rounded-full p-6 mb-4">
              <Search size={32} color="#9CA3AF" />
            </View>
            <Text className="text-xl font-semibold text-gray-900 mb-2">
              No messages yet
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              Book a session with a creator to start chatting!
            </Text>
            <TouchableOpacity className="bg-primary px-6 py-3 rounded-xl">
              <Text className="text-white font-semibold">Discover Creators</Text>
            </TouchableOpacity>
          </View>
        ) : (
          messages.map((message) => (
            <TouchableOpacity
              key={message.id}
              className="bg-white border-b border-gray-100 px-4 py-4"
            >
              <View className="flex-row items-start">
                {/* Avatar with Online Status */}
                <View className="relative">
                  <Image
                    source={{ uri: message.creatorAvatar }}
                    className="w-14 h-14 rounded-full"
                  />
                  {message.isOnline && (
                    <View className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </View>

                {/* Message Content */}
                <View className="flex-1 ml-3">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-lg font-semibold text-gray-900">
                      {message.creatorName}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-sm text-gray-500 mr-1">
                        {message.timestamp}
                      </Text>
                      {message.isRead ? (
                        <CheckCheck size={16} color="#10B981" />
                      ) : (
                        <View className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </View>
                  </View>

                  {/* Meetup Status */}
                  {message.meetupDate && (
                    <View className="flex-row items-center mb-2">
                      <Clock size={14} color="#6B7280" />
                      <Text className={`text-sm ml-1 font-medium ${
                        message.meetupDate === 'Completed' 
                          ? 'text-green-600' 
                          : 'text-primary'
                      }`}>
                        {message.meetupDate}
                      </Text>
                    </View>
                  )}

                  {/* Last Message */}
                  <Text className={`text-gray-600 ${
                    !message.isRead ? 'font-medium' : ''
                  }`} numberOfLines={2}>
                    {message.lastMessage}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}

        {/* Info Card */}
        <View className="bg-blue-50 border border-blue-200 rounded-2xl mx-4 my-4 p-4">
          <Text className="text-blue-900 font-semibold mb-2">
            💬 Chat Unlocked After Booking
          </Text>
          <Text className="text-blue-700 text-sm">
            You can only message creators after booking a session. This keeps everyone safe and ensures meaningful connections.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}