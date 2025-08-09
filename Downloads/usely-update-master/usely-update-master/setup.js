#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Usely Setup Script');
console.log('=====================\n');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setup() {
  try {
    // Check if .env.local already exists
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const overwrite = await question('.env.local already exists. Overwrite? (y/N): ');
      if (overwrite.toLowerCase() !== 'y') {
        console.log('Setup cancelled.');
        rl.close();
        return;
      }
    }

    console.log('To get your Supabase credentials:');
    console.log('1. Go to https://supabase.com');
    console.log('2. Create a new project or select existing one');
    console.log('3. Go to Settings > API');
    console.log('4. Copy the Project URL and anon public key\n');

    const supabaseUrl = await question('Enter your Supabase Project URL: ');
    const supabaseKey = await question('Enter your Supabase anon key: ');

    if (!supabaseUrl || !supabaseKey) {
      console.log('❌ Both URL and key are required!');
      rl.close();
      return;
    }

    // Create .env.local file
    const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}

# Optional: Stripe configuration for payments
# STRIPE_SECRET_KEY=sk_test_...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
`;

    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ Environment variables configured!');
    console.log('\nNext steps:');
    console.log('1. Run the database schema in your Supabase SQL editor');
    console.log('   - Copy the contents of database-schema.sql');
    console.log('   - Paste and run in Supabase SQL Editor');
    console.log('2. Start the development server: npm run dev');
    console.log('3. Test authentication: visit /api/auth/test in your browser');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setup(); 