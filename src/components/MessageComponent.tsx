/**
 * Shared MessageComponent - unified from theater-chat and git-theater
 */

import { Box, Text } from 'ink';
import type { MessageComponentProps } from '../types/ui.js';

/**
 * Unified message component that works across different Theater chat interfaces
 */
export function MessageComponent({ 
  message, 
  toolDisplayMode, 
  variant = 'default',
  prefixOverrides = {},
  contentColor,
  showTimestamp = false
}: MessageComponentProps) {
  const { role, content, status, toolName, toolArgs } = message;

  // Don't show hidden tool messages
  if (role === 'tool' && toolDisplayMode === 'hidden') {
    return null;
  }

  // Skip empty system messages
  if (role === 'system' && !content.trim()) {
    return null;
  }

  // Default prefixes based on variant
  const getDefaultPrefixes = (variant: string) => {
    const base = {
      user: '👤 You: ',
      assistant: '🤖 Assistant: ',
      system: 'ℹ️  system: ',
      tool: '🔧 '
    };

    // Customize based on variant
    switch (variant) {
      case 'git':
        return { ...base, system: 'ℹ️  git: ' };
      case 'chat':
        return { ...base, assistant: '🤖 Chat: ' };
      default:
        return base;
    }
  };

  const defaultPrefixes = getDefaultPrefixes(variant);
  const prefixes = { ...defaultPrefixes, ...prefixOverrides };

  // Default colors based on role
  const getContentColor = (role: string) => {
    if (contentColor) return contentColor;
    
    return {
      user: 'gray',
      assistant: 'white',
      system: 'gray',
      tool: 'magenta'
    }[role] || 'white';
  };

  const roleColor = getContentColor(role);

  // Handle tool messages specially
  if (role === 'tool') {
    return <ToolMessage 
      toolName={toolName || 'unknown'} 
      toolArgs={toolArgs || []} 
      toolDisplayMode={toolDisplayMode}
      prefix={prefixes.tool}
    />;
  }

  // Handle regular messages
  const lines = content.split('\n');
  const hasMultipleLines = lines.length > 1;
  const prefix = prefixes[role] || '';

  return (
    <Box flexDirection="column" marginBottom={1}>
      {/* Message content */}
      {lines.map((line, index) => (
        <Text key={index} color={roleColor}>
          {index === 0 ? prefix : hasMultipleLines ? '   ' : ''}{line || ' '}
        </Text>
      ))}
      
      {/* Optional timestamp */}
      {showTimestamp && (
        <Text color="gray" dimColor>
          {message.timestamp.toLocaleTimeString()}
        </Text>
      )}
    </Box>
  );
}

/**
 * Tool message sub-component
 */
interface ToolMessageProps {
  toolName: string;
  toolArgs: string[];
  toolDisplayMode: 'minimal' | 'full';
  prefix: string;
}

function ToolMessage({ toolName, toolArgs, toolDisplayMode, prefix }: ToolMessageProps) {
  const args = toolArgs.join(' ');

  if (toolDisplayMode === 'minimal') {
    return (
      <Box marginBottom={1}>
        <Text color="magenta" dimColor>
          {prefix}{toolName}{args ? `: ${args}` : ''}
        </Text>
      </Box>
    );
  } else if (toolDisplayMode === 'full') {
    return (
      <Box flexDirection="column" marginBottom={1}>
        <Text color="magenta">
          {prefix}{toolName}
        </Text>
        {args && (
          <Text color="magenta" dimColor>
            Args: {args}
          </Text>
        )}
      </Box>
    );
  }

  return null; // hidden
}
