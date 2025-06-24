# Stripe Configuration for Production Deployment

## Environment Variables Required

For the checkout system to work in production, the following environment variables must be set in your Vercel deployment:

### Required Stripe Keys

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

**Note**: Replace the placeholder values with actual keys from your Stripe Dashboard.

## Setting Up in Vercel

1. Go to your Vercel dashboard
2. Select your project (AnnaLea)
3. Go to Settings → Environment Variables
4. Add both variables:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (set for all environments)
   - `STRIPE_SECRET_KEY` (set for all environments)

## Vercel CLI Setup (Alternative)

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# Enter: [Your Stripe publishable key starting with pk_test_]
# Select: Production, Preview, Development

vercel env add STRIPE_SECRET_KEY
# Enter: [Your Stripe secret key starting with sk_test_]
# Select: Production, Preview, Development

# Redeploy to apply changes
vercel --prod
```

## Verification

After setting the environment variables:

1. **Check build logs** - Should see no Stripe configuration errors
2. **Test checkout flow** - Navigate to `/checkout` with items in cart
3. **Payment intent creation** - Should return `clientSecret` instead of 503 error

## Error Messages

- **Before fix**: "Payment processing is not configured"
- **After fix**: Payment form loads with Stripe Elements

## Security Notes

- These are **test keys** - safe for development and testing
- For production, replace with live keys from Stripe Dashboard
- Never commit secret keys to git repository
- Environment variables are secure in Vercel's environment

## Troubleshooting

If checkout still fails after setting environment variables:

1. **Clear deployment cache**: Force new deployment
2. **Check environment scope**: Ensure variables are set for Production
3. **Verify key format**: Keys should start with `pk_test_` and `sk_test_`
4. **Check build logs**: Look for Stripe initialization errors

## Files Modified

- `src/lib/stripe.ts` - Graceful environment variable handling
- `src/app/api/create-payment-intent/route.ts` - Better error messages
- `src/app/checkout/page.tsx` - Improved error handling
- `.env.example` - Updated with actual test keys