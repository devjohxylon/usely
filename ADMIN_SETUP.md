# Admin Setup Guide

## 1. Enable Supabase Auth

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Settings**
3. Enable **Email Auth** if not already enabled
4. Set **Site URL** to your domain (e.g., `https://usely.dev`)
5. Add **Redirect URLs**:
   - `https://usely.dev/admin/dashboard`
   - `http://localhost:3000/admin/dashboard` (for development)

## 2. Create Admin Users

1. Go to **Authentication** → **Users**
2. Click **"Add User"**
3. Add your admin emails:
   - Your email: `your-email@domain.com`
   - Your dev's email: `your-dev-email@domain.com`
4. Set temporary passwords (they'll reset on first login)

## 3. Update Admin Emails in Database

1. Go to **SQL Editor**
2. Run the `supabase-admin-setup.sql` file
3. **IMPORTANT**: Replace the placeholder emails with your actual emails:
   ```sql
   INSERT INTO admin_users (email, role) VALUES 
     ('your-actual-email@domain.com', 'admin'),
     ('your-dev-actual-email@domain.com', 'admin')
   ON CONFLICT (email) DO NOTHING;
   ```

## 4. Test Admin Access

1. Go to `/admin/login` on your site
2. Login with your admin credentials
3. You should be redirected to `/admin/dashboard`
4. Test the export functionality

## 5. Admin Dashboard Features

- **View all waitlist signups** with timestamps
- **Export CSV** of all emails
- **Analytics** showing total signups and recent activity
- **Secure logout** functionality

## 6. Security Notes

- Only emails in the `admin_users` table can access the dashboard
- All admin actions are logged
- Session management is handled by Supabase Auth
- RLS policies ensure only admins can view sensitive data

## 7. URLs

- **Admin Login**: `/admin/login`
- **Admin Dashboard**: `/admin/dashboard`
- **Public Waitlist**: `/waitlist`

## 8. Environment Variables

Make sure these are set in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for admin operations) 