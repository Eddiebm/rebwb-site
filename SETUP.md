# REBWB Setup Guide

## Overview
REBWB (Real Estate Without Bullshit) is a static website with Supabase backend for authentication, payments, and data storage.

---

## 1. Prerequisites

- Domain name (optional, can use Supabase hosting)
- Supabase account (free tier works)
- Stripe account (for payments)
- Mailchimp account (for email list)

---

## 2. Supabase Setup

### Create Project
1. Go to https://supabase.com
2. Create new project
3. Note your:
   - Project URL: `https://[project-id].supabase.co`
   - Anon Key: `eyJ...` (public)
   - Service Role Key: `sb_secret_...` (keep private)

### Database Tables
Run these SQL commands in Supabase SQL Editor:

```sql
-- User profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email VARCHAR(255),
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Purchases
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    email VARCHAR(255),
    amount INTEGER,
    currency VARCHAR(10) DEFAULT 'usd',
    status VARCHAR(50),
    stripe_session_id VARCHAR(255),
    stripe_customer_id VARCHAR(255),
    plan_type VARCHAR(50),
    payment_mode VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Course access
CREATE TABLE course_access (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    course_id VARCHAR(100),
    plan_type VARCHAR(50),
    granted_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

-- Email signups (Cliff Notes)
CREATE TABLE cliff_notes_signups (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Subscription plans
CREATE TABLE rebwb_plans (
    id SERIAL PRIMARY KEY,
    price_id VARCHAR(255) UNIQUE,
    plan_type VARCHAR(50),
    price INTEGER,
    monthly_limit INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE rebwb_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_customer_id VARCHAR(255),
    price_id VARCHAR(255),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Insert Plans
```sql
INSERT INTO rebwb_plans (price_id, plan_type, price, monthly_limit) VALUES 
('price_monthly_97', 'monthly', 9700, 999),
('price_yearly_997', 'yearly', 99700, 999),
('price_onetime_997', 'lifetime', 99700, 999);
```

### Enable Row Level Security
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_access ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users read own purchases" ON purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own access" ON course_access FOR SELECT USING (auth.uid() = user_id);
```

---

## 3. Edge Functions

Deploy these edge functions in Supabase:

### create-checkout
Handles Stripe checkout sessions. See `/supabase/functions/create-checkout/index.ts`

### stripe-webhook  
Handles Stripe payment confirmations. See `/supabase/functions/stripe-webhook/index.ts`

### mailchimp-subscribe
Handles email signups. See `/supabase/functions/mailchimp-subscribe/index.ts`

### Deploy Commands
```bash
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook
supabase functions deploy mailchimp-subscribe
```

### Set Secrets
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_xxx
supabase secrets set STRIPE_PUBLISHABLE_KEY=pk_test_xxx
supabase secrets set MAILCHIMP_API_KEY=xxx-us16
supabase secrets set MAILCHIMP_LIST_ID=xxx
```

---

## 4. Stripe Setup

### API Keys
1. Go to https://dashboard.stripe.com/apikeys
2. Copy Publishable key and Secret key
3. Add to Supabase secrets (see above)

### Webhook
1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://[your-project].supabase.co/functions/v1/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`

---

## 5. Mailchimp Setup

1. Get API key from https://mailchimp.com/account/api/
2. Get List ID from Audience > Settings > Audience name and defaults
3. Add to Supabase secrets
4. Create Welcome Automation in Mailchimp to send Cliff Notes PDF

---

## 6. Frontend Configuration

Update these files with your Supabase credentials:

### js/auth.js
```javascript
const SUPABASE_URL = 'https://[your-project].supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

### index.html (Stripe checkout section)
```javascript
const SUPABASE_URL = 'https://[your-project].supabase.co';
```

---

## 7. Deployment Options

### Option A: Static Hosting (Netlify/Vercel)
1. Push code to GitHub
2. Connect to Netlify or Vercel
3. Deploy (no build step needed - static HTML)

### Option B: Custom Domain
1. Deploy to any static host
2. Point your domain's DNS
3. Enable HTTPS

### Option C: Supabase Storage
1. Create public bucket
2. Upload all files
3. Access via Supabase URL

---

## 8. File Structure

```
rebwb/
├── index.html          # Homepage with pricing
├── course.html         # Course content
├── dealpilot.html      # Deal analyzer tool
├── templates.html      # Document templates
├── tools.html          # Calculator tools
├── faq.html            # FAQ page
├── signup.html         # Registration
├── login.html          # Login
├── css/
│   └── styles.css
├── js/
│   ├── auth.js         # Supabase auth
│   └── main.js         # Site functionality
├── imgs/               # Images
└── supabase/
    └── functions/      # Edge functions
```

---

## 9. Testing

### Test Card Numbers (Stripe)
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future date, any CVC

### Test User Flow
1. Visit site → Sign up
2. Go to pricing → Click payment button
3. Complete Stripe checkout
4. Verify course access granted

---

## 10. Going Live

1. Switch Stripe to live mode
2. Update API keys to live keys
3. Update webhook URL
4. Test with real small payment
5. Launch!

---

## Support

For technical issues, check:
- Supabase Dashboard > Logs
- Stripe Dashboard > Developers > Logs
- Browser Console for frontend errors
