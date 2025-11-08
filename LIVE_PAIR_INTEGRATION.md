# Live Pair Programming Integration

This document describes the integration of real-time pair programming functionality into VibeXCarft.

## Overview

The live pair programming feature enables collaborative coding sessions with:
- Real-time code synchronization using Supabase Realtime
- Multi-file editor support
- WebRTC video/audio calls for peer-to-peer communication
- Session management (create/join sessions)

## Setup

### 1. Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Supabase Configuration (Required)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# Optional: Custom TURN Server for WebRTC
# TURN_URL=turn:turn.example.com:3478
# TURN_USERNAME=turnuser
# TURN_PASSWORD=turnpass
```

### 2. Supabase Database Setup

You need to create the following tables in your Supabase database:

#### Sessions Table
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_code TEXT UNIQUE NOT NULL,
  code_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Session Files Table
```sql
CREATE TABLE session_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_code TEXT NOT NULL REFERENCES sessions(session_code),
  filename TEXT NOT NULL,
  file_content TEXT,
  language TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_code, filename)
);
```

#### WebRTC Signals Table
```sql
CREATE TABLE webrtc_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_code TEXT NOT NULL,
  from_peer TEXT NOT NULL,
  to_peer TEXT,
  signal_type TEXT NOT NULL,
  signal_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Enable Realtime

Enable Realtime for the tables:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE public.sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.session_files;
ALTER PUBLICATION supabase_realtime ADD TABLE public.webrtc_signals;
```

### 3. Install Dependencies

```bash
npm install
```

The integration requires:
- `@supabase/supabase-js` - For database and realtime functionality

### 4. Supabase Edge Function (Optional)

If you want to support code compilation for languages like C, C++, Python, and Java, you'll need to set up a Supabase Edge Function. The function should be named `compile-code` and accept:

```typescript
{
  code: string;
  language: 'c' | 'cpp' | 'python' | 'java';
}
```

## Usage

### Accessing the Feature

Navigate to `/ai/live-pair` in your application (requires authentication).

### Creating a Session

1. Enter your name
2. Click "Create New Session"
3. Share the session code with others

### Joining a Session

1. Enter your name
2. Enter the session code
3. Click "Join"

### Features

- **Multi-file Editor**: Create and edit multiple files in a session
- **Real-time Sync**: Changes are synchronized in real-time across all participants
- **Video/Audio Calls**: Start video calls with other participants
- **Code Execution**: Run JavaScript code directly in the browser (other languages require the compile-code function)

## Architecture

### Components

- `LivePair.tsx` - Main page component
- `SessionControls.tsx` - Session creation/joining controls
- `MultiFileEditor.tsx` - Multi-file code editor with real-time sync
- `FileExplorer.tsx` - File management sidebar
- `FileTabs.tsx` - Tab interface for open files
- `VoiceChat.tsx` - WebRTC video/audio call component

### Data Flow

1. **Code Synchronization**: Uses Supabase Realtime subscriptions to listen for changes in `session_files` table
2. **WebRTC Signaling**: Uses Supabase `webrtc_signals` table to exchange WebRTC offer/answer/ICE candidates
3. **Session Management**: Sessions are stored in the `sessions` table

## Security Considerations

- Sessions are currently open (anyone with the code can join)
- Consider adding authentication/authorization in production
- Validate session codes and implement rate limiting
- Secure TURN server credentials if using custom TURN servers

## Troubleshooting

### WebRTC Connection Issues

- Ensure STUN/TURN servers are accessible
- Check browser console for WebRTC errors
- Verify media permissions are granted

### Real-time Sync Not Working

- Check Supabase Realtime is enabled for the tables
- Verify environment variables are set correctly
- Check browser console for Supabase connection errors

## Next Steps

- [ ] Add authentication/authorization for sessions
- [ ] Implement session listing and management
- [ ] Add invite links with expiration
- [ ] Improve UI/UX polish
- [ ] Add comprehensive error handling
- [ ] Implement reconnection logic

