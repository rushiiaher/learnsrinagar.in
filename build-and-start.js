const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building and starting Remix application...');

try {
  // Clean previous build
  const buildDir = path.join(__dirname, 'build');
  if (fs.existsSync(buildDir)) {
    console.log('🧹 Cleaning previous build...');
    fs.rmSync(buildDir, { recursive: true, force: true });
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build the application
  console.log('🔨 Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Check if build was successful
  if (fs.existsSync(buildDir)) {
    console.log('✅ Build successful!');
    
    // Start the application
    console.log('🚀 Starting application...');
    execSync('npm start', { stdio: 'inherit' });
  } else {
    throw new Error('Build directory not found');
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}