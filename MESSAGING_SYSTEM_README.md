# DUBAIMERX Messaging System

A comprehensive, real-time messaging system built for the DUBAIMERX B2B platform. This system enables seamless communication between buyers, suppliers, and manufacturers with advanced features like real-time messaging, file sharing, typing indicators, and multi-language support.

## 🚀 Features

### Core Messaging Features
- **Real-time messaging** - Instant message delivery using Supabase real-time subscriptions
- **File sharing** - Support for images, documents, and other file types (up to 10MB)
- **Message status tracking** - Sent, delivered, and read receipts
- **Typing indicators** - Real-time typing status
- **Search functionality** - Search through conversations and users
- **Mobile responsive** - Optimized for both desktop and mobile devices

### Smart Features
- **Auto-scroll to bottom** - Automatically scrolls to new messages
- **Message timestamps** - Smart time formatting (just now, 5m ago, 2h ago)
- **User avatars** - Generated avatars based on user initials
- **Conversation sorting** - Automatically sorted by last message time
- **Unread message counts** - Visual indicators for unread messages
- **File type detection** - Different handling for images vs. documents

### Multi-language Support
- **English** - Primary language
- **Arabic** - With RTL (Right-to-Left) support
- **French** - International business language
- All UI elements and error messages are fully translated

### Security Features
- **Row Level Security (RLS)** - Database-level security policies
- **File upload validation** - Size and type restrictions
- **User authentication** - Supabase Auth integration
- **Privacy controls** - Users can only see their own conversations

## 🏗️ Architecture

### Database Schema
```sql
profiles              # User information
├── conversations     # Conversation metadata between two users
│   └── messages      # Individual messages within conversations
│       └── attachments # File attachments for messages
└── typing_indicators # Real-time typing status
```

### Component Structure
```
src/components/messaging/
├── ConversationList.jsx      # List of all user conversations
├── ChatWindow.jsx           # Main chat interface
└── NewConversationModal.jsx # Modal for starting new conversations

src/pages/
└── MessengerPage.jsx        # Main messaging page layout
```

## 📋 Setup Instructions

### 1. Database Setup

Run the provided SQL script to set up the database:

```bash
# Connect to your Supabase project and run:
psql -h db.xxx.supabase.co -p 5432 -d postgres -U postgres -f database/messaging_setup.sql
```

Or execute the script in the Supabase dashboard SQL editor.

### 2. Storage Configuration

The system automatically creates a storage bucket called `message-attachments`. Ensure your Supabase project has storage enabled.

### 3. Environment Variables

Make sure your Supabase configuration is properly set in `src/lib/customSupabaseClient.js`:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
```

### 4. Authentication Setup

The messaging system requires users to be authenticated. Ensure your authentication flow is working:

- Users must be registered and logged in
- User profiles should be created in the `profiles` table
- The system will redirect non-authenticated users to the registration page

## 🎯 Usage

### Starting a Conversation

1. Navigate to the Messenger page (`/messenger`)
2. Click the "+" button to start a new conversation
3. Search for and select a user from the modal
4. Start messaging immediately

### Sending Messages

- **Text messages**: Type in the input field and press Enter or click Send
- **File sharing**: Click the paperclip icon to upload files
- **Images**: Automatically displayed inline in the chat
- **Documents**: Shown with download links

### Message Features

- **Real-time delivery**: Messages appear instantly for both parties
- **Read receipts**: See when messages are delivered and read
- **Typing indicators**: See when the other person is typing
- **Message timestamps**: Hover over messages to see exact time

### Mobile Experience

- **Responsive design**: Automatically adapts to mobile screens
- **Touch-friendly**: Optimized for touch interactions
- **Navigation**: Easy switching between conversation list and chat view

## 🔧 Technical Details

### Real-time Implementation

The system uses Supabase real-time subscriptions for:

```javascript
// Message real-time updates
supabase
  .channel(`messages:${conversationId}`)
  .on('postgres_changes', { event: 'INSERT', table: 'messages' }, callback)
  .subscribe()

// Typing indicators
supabase
  .channel(`typing:${conversationId}`)
  .on('broadcast', { event: 'typing' }, callback)
  .subscribe()
```

### Performance Optimizations

- **Efficient queries**: Optimized SQL queries with proper indexing
- **Lazy loading**: Messages loaded as needed
- **Debounced typing**: Typing indicators are debounced to reduce API calls
- **Image optimization**: Automatic image resizing and compression
- **Caching**: Conversation list cached and updated incrementally

### File Upload Process

1. File validation (size, type)
2. Upload to Supabase Storage
3. Create message record with attachment
4. Link attachment to message
5. Real-time update to other user

### Security Measures

- **RLS Policies**: Users can only access their own conversations
- **File validation**: Server-side file type and size validation
- **SQL injection protection**: All queries use parameterized statements
- **CSRF protection**: Built-in Supabase security features

## 🛠️ Customization

### Adding New Message Types

To add support for new message types (e.g., voice messages):

1. Update the database schema:
```sql
ALTER TYPE message_type_enum ADD VALUE 'voice';
```

2. Add handling in `ChatWindow.jsx`:
```javascript
case 'voice':
  return <VoiceMessageComponent message={message} />;
```

### Styling Customization

The system uses Tailwind CSS classes. Key customization points:

- **Colors**: Update orange theme colors in component files
- **Layout**: Modify container classes for different layouts
- **Animations**: Framer Motion animations can be customized
- **RTL Support**: Arabic RTL styling is already implemented

### Adding New Languages

1. Add translations to `src/contexts/LanguageContext.jsx`:
```javascript
const translations = {
  // ... existing translations
  es: {
    messaging_conversations: 'Conversaciones',
    // ... add all messaging translations
  }
}
```

## 📱 API Reference

### Key Functions

#### `fetchConversations()`
Retrieves all conversations for the current user with participant details and last messages.

#### `sendMessage(content, type = 'text')`
Sends a new message to the current conversation.

#### `markMessagesAsRead(conversationId)`
Marks all unread messages in a conversation as read.

#### `handleFileUpload(file)`
Handles file upload process including validation and storage.

## 🔍 Troubleshooting

### Common Issues

**Messages not appearing in real-time**
- Check Supabase real-time configuration
- Verify WebSocket connections in browser dev tools
- Ensure RLS policies are correctly configured

**File uploads failing**
- Check storage bucket permissions
- Verify file size limits (default: 10MB)
- Ensure storage bucket exists and is accessible

**Authentication errors**
- Verify user is logged in before accessing messaging
- Check if user profile exists in profiles table
- Ensure Supabase Auth is properly configured

**Database connection issues**
- Run the SQL setup script completely
- Check if all tables and policies are created
- Verify database indexes are in place

### Performance Issues

**Slow message loading**
- Check database indexes are properly created
- Consider implementing pagination for large conversations
- Verify efficient query patterns are being used

**High memory usage**
- Implement message virtualization for very long conversations
- Clean up old subscriptions properly
- Consider limiting conversation history

## 🔮 Future Enhancements

### Planned Features
- **Voice messages** - Audio recording and playback
- **Video calls** - WebRTC integration
- **Message reactions** - Emoji reactions to messages
- **Message threading** - Reply to specific messages
- **Group conversations** - Multi-party conversations
- **Message encryption** - End-to-end encryption
- **Offline support** - Message queuing when offline
- **Push notifications** - Mobile push notifications
- **Message scheduling** - Send messages at specific times
- **Auto-translation** - Automatic message translation

### Technical Improvements
- **Message virtualization** - Handle very long conversations efficiently
- **Advanced caching** - Redis integration for better performance
- **Analytics** - Message delivery and engagement analytics
- **Backup system** - Automated conversation backups
- **Rate limiting** - Prevent spam and abuse

## 📄 License

This messaging system is part of the DUBAIMERX platform and follows the same licensing terms.

## 🤝 Contributing

When contributing to the messaging system:

1. Follow the existing code patterns and naming conventions
2. Add proper error handling and loading states
3. Include comprehensive tests for new features
4. Update translations for all supported languages
5. Ensure mobile responsiveness for all new components
6. Follow security best practices, especially for file handling

## 📞 Support

For technical support or questions about the messaging system:

- Check the troubleshooting section above
- Review the component code for implementation details
- Consult the Supabase documentation for real-time features
- Create detailed bug reports with reproduction steps

---

**Built with ❤️ for the DUBAIMERX platform** - Connecting Gulf excellence with global markets through seamless communication.