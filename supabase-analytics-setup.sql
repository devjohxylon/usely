-- Create analytics tracking tables for real data

-- Page views tracking
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions tracking
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  page_views_count INTEGER DEFAULT 1
);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for tracking
CREATE POLICY "Allow public page view tracking" ON page_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public session tracking" ON user_sessions
  FOR INSERT WITH CHECK (true);

-- Allow admins to read analytics data
CREATE POLICY "Allow admin read page views" ON page_views
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin read sessions" ON user_sessions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_user_sessions_last_activity ON user_sessions(last_activity);

-- Function to get active users count
CREATE OR REPLACE FUNCTION get_active_users_count()
RETURNS INTEGER AS $$
DECLARE
  active_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO active_count
  FROM user_sessions
  WHERE last_activity > NOW() - INTERVAL '5 minutes';
  
  RETURN COALESCE(active_count, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get page views count for today
CREATE OR REPLACE FUNCTION get_today_page_views()
RETURNS INTEGER AS $$
DECLARE
  views_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO views_count
  FROM page_views
  WHERE created_at >= CURRENT_DATE;
  
  RETURN COALESCE(views_count, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get conversion rate
CREATE OR REPLACE FUNCTION get_conversion_rate()
RETURNS DECIMAL AS $$
DECLARE
  signups_count INTEGER;
  page_views_count INTEGER;
  conversion_rate DECIMAL;
BEGIN
  SELECT COUNT(*) INTO signups_count
  FROM waitlist
  WHERE created_at >= CURRENT_DATE;
  
  SELECT COUNT(*) INTO page_views_count
  FROM page_views
  WHERE created_at >= CURRENT_DATE;
  
  IF page_views_count = 0 THEN
    RETURN 0;
  END IF;
  
  conversion_rate = (signups_count::DECIMAL / page_views_count::DECIMAL) * 100;
  RETURN ROUND(conversion_rate, 2);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 