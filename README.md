# terminal-chat-ui

**Shared UI components for terminal-based chat interfaces using Theater actors**

A comprehensive React Ink component library that provides everything you need to build rich, interactive terminal chat applications with Theater actor integration.

## Features

🎨 **Rich Components** - Pre-built message display, input handling, and status components  
🎭 **Theater Integration** - Built-in hooks for Theater actor communication  
⌨️ **Smart Input** - Auto-switching between simple and multiline input modes  
🔧 **Tool Display** - Configurable tool call visualization  
🎯 **Focused Design** - Optimized for terminal chat workflows  
📦 **TypeScript First** - Full type safety and excellent developer experience  

## Installation

```bash
# With bun (recommended)
bun add terminal-chat-ui

# With npm
npm install terminal-chat-ui

# With yarn
yarn add terminal-chat-ui
```

**Peer Dependencies:**
- `react ^18.0.0`
- `ink ^4.4.1` 
- `theater-client` (any version)

## Quick Start

```tsx
import { render } from 'ink';
import { 
  MessageComponent, 
  SmartInput, 
  StatusHeader,
  useMessageState,
  useKeyboardShortcuts,
  commonShortcuts
} from 'terminal-chat-ui';

function MyChatApp() {
  const { messages, addMessage, clearMessages } = useMessageState();
  
  useKeyboardShortcuts({
    shortcuts: [
      commonShortcuts.clear(clearMessages),
      commonShortcuts.exit(() => process.exit(0))
    ]
  });

  const handleSubmit = (content: string) => {
    addMessage('user', content);
    // Handle message submission...
  };

  return (
    <>
      <StatusHeader 
        title="My Chat App" 
        setupStatus="ready" 
      />
      
      {messages.map((message, index) => (
        <MessageComponent 
          key={index} 
          message={message} 
          toolDisplayMode="minimal" 
        />
      ))}
      
      <SmartInput 
        placeholder="Type a message..." 
        onSubmit={handleSubmit} 
      />
    </>
  );
}

render(<MyChatApp />);
```

## Components

### MessageComponent

Unified message display with support for different UI variants and tool visualization.

```tsx
<MessageComponent 
  message={{
    role: 'assistant',
    content: 'Hello! How can I help you?',
    timestamp: new Date(),
    status: 'complete'
  }}
  toolDisplayMode="minimal"
  variant="git"  // 'default' | 'git' | 'chat' | 'custom'
  prefixOverrides={{ assistant: '🤖 Git: ' }}
/>
```

### Input Components

#### SmartInput (Recommended)
Auto-switches between simple and multiline modes:

```tsx
<SmartInput
  mode="auto"  // 'simple' | 'multiline' | 'auto'
  onSubmit={handleSubmit}
  autoMultilineThreshold={50}  // Switch to multiline after 50 chars
/>
```

#### SimpleInput
Lightweight single-line input:

```tsx
<SimpleInput
  placeholder="> "
  onSubmit={handleSubmit}
  disabled={isLoading}
/>
```

#### MultiLineInput
Advanced vim-style editor:

```tsx
<MultiLineInput
  placeholder="Type your message..."
  onSubmit={handleSubmit}
  maxHeight={10}
  mode="insert"  // 'insert' | 'command'
  content={content}
  onContentChange={setContent}
/>
```

### StatusHeader

Displays connection status and application info:

```tsx
<StatusHeader
  title="Git Theater"
  subtitle="claude-sonnet-4-20250514"
  setupStatus="connecting"  // 'connecting' | 'ready' | 'error'
  setupMessage="Connecting to Theater..."
  variant="git"
/>
```

### HelpPanel

Keyboard shortcuts and help information:

```tsx
<HelpPanel
  shortcuts={[
    { key: 'Ctrl+C', description: 'Exit' },
    { key: 'Ctrl+L', description: 'Clear' }
  ]}
  variant="git"
/>
```

## Hooks

### useMessageState

Centralized message management:

```tsx
const {
  messages,
  addMessage,
  addPendingMessage,
  updateLastPendingMessage,
  addToolMessage,
  clearMessages
} = useMessageState();

// Add a user message
addMessage('user', 'Hello!');

// Add pending assistant message (for loading)
addPendingMessage('assistant', '');

// Update it when response arrives
updateLastPendingMessage('Hi there!');

// Add tool call
addToolMessage('git status', ['--porcelain']);
```

### useKeyboardShortcuts

Centralized keyboard handling:

```tsx
const { exit } = useApp();
const { clearMessages } = useMessageState();
const [showHelp, setShowHelp] = useState(false);

useKeyboardShortcuts({
  shortcuts: [
    commonShortcuts.exit(exit),
    commonShortcuts.clear(clearMessages),
    commonShortcuts.toggleHelp(() => setShowHelp(!showHelp)),
    {
      key: 'r',
      ctrl: true,
      description: 'Refresh',
      action: handleRefresh
    }
  ]
});
```

### useTheaterSession

Theater actor session management:

```tsx
const {
  setupStatus,
  setupMessage,
  session,
  channel,
  sendMessage,
  cleanup,
  isReady
} = useTheaterSession(theaterClient, config);

// Send a message
if (isReady) {
  await sendMessage('Hello Theater!');
}

// Cleanup on unmount
useEffect(() => cleanup, [cleanup]);
```

## License

MIT License - see LICENSE file for details.

---

**terminal-chat-ui** - Building beautiful terminal chat interfaces has never been easier! 🎭✨
