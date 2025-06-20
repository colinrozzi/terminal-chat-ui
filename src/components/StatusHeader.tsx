/**
 * Shared StatusHeader component - unified status display
 */

import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import type { StatusHeaderProps } from '../types/ui.js';

/**
 * Unified status header that shows connection state and context information
 */
export function StatusHeader({ 
  title, 
  subtitle, 
  setupStatus, 
  setupMessage = '',
  variant = 'default',
  showSpinner = true
}: StatusHeaderProps) {
  
  // Don't show complex header when ready - keep it minimal
  if (setupStatus === 'ready') {
    return (
      <Box flexDirection="column" marginBottom={1} paddingLeft={1}>
        <Box>
          <Text color="cyan">{title}</Text>
          {subtitle && <Text color="gray"> ({subtitle})</Text>}
        </Box>
      </Box>
    );
  }

  // Show loading state with more info during setup
  return (
    <Box flexDirection="column" marginBottom={1} paddingLeft={1}>
      {/* Title line */}
      <Box>
        <Text color="cyan">{title}</Text>
        {subtitle && <Text color="gray"> ({subtitle})</Text>}
      </Box>
      
      {/* Status line with spinner */}
      {setupMessage && (
        <Box>
          {showSpinner && setupStatus !== 'error' && <Spinner type="dots" />}
          <Text color={setupStatus === 'error' ? 'red' : 'yellow'}>
            {showSpinner && setupStatus !== 'error' ? ' ' : ''}{setupMessage}
          </Text>
        </Box>
      )}
    </Box>
  );
}

/**
 * Simple loading spinner component
 */
export function LoadingSpinner({ 
  message = 'Loading...', 
  type = 'dots',
  color = 'yellow'
}: {
  message?: string;
  type?: 'dots' | 'line' | 'bounce';
  color?: string;
}) {
  return (
    <Box marginBottom={1}>
      <Spinner type={type} />
      <Text color={color}> {message}</Text>
    </Box>
  );
}
