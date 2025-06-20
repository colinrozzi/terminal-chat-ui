#!/usr/bin/env node

const { execSync } = require('child_process');

try {
  console.log('Building terminal-chat-ui...');
  execSync('npx tsc', { stdio: 'inherit', cwd: __dirname });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
