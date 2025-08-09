# Usely Dashboard

A comprehensive dashboard for Usely, a token metering and Stripe-like billing app.

## Features

### 🎯 Usage Overview
- Real-time token usage display with progress bar
- Daily usage trends chart (last 30 days)
- Usage statistics (average daily, peak usage)
- Color-coded progress indicators

### 💳 Billing Details
- Current billing cycle information
- Last payment details with status
- Next payment schedule
- Payment method management
- Invoice access

### 👑 Subscription Management
- Current plan details and features
- Upgrade and cancellation options
- Confirmation modal for cancellations
- Plan feature comparison

### 👤 User Menu
- Collapsible sidebar navigation
- User profile management
- Quick access to account settings
- Smooth animations and transitions

## Components

- `Dashboard.tsx` - Main dashboard layout
- `Sidebar.tsx` - Navigation sidebar with user menu
- `UsageOverview.tsx` - Token usage statistics and charts
- `BillingDetails.tsx` - Billing information and payment details
- `SubscriptionManagement.tsx` - Plan management with modal

## Design Features

- **Responsive Design**: Works on all screen sizes
- **Modern UI**: Clean, minimal design with rounded corners
- **Smooth Animations**: 300ms transitions for all interactions
- **Error Handling**: Graceful fallbacks for demo data
- **Accessibility**: Proper focus states and keyboard navigation

## Demo Data

All components use realistic demo data:
- 7,500/10,000 tokens used (75% quota)
- $49/month Pro Plan
- July 1, 2025 billing cycle
- Random daily usage patterns

## Usage

Navigate to `/dashboard` to view the dashboard. The sidebar can be collapsed for more screen space, and all interactive elements include hover states and smooth transitions. 