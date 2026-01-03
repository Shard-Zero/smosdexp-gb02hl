# Shard Zero DEX Template

This template provides a quick way to launch your own perpetual DEX powered by institutional-grade trading infrastructure.

🔗 Built with [Shard Zero](https://shard-zero.app)

## Quick Start

1. **Fork the Repository**
   
   Fork this repository to your GitHub account.

2. **Clone Your Fork**

```sh
git clone https://github.com/YOUR_USERNAME/shard-zero-template.git
cd shard-zero-template
```

3. **Install Dependencies**

```sh
yarn install
```

## Configuration Steps

### 1. Broker Configuration

Edit the `.env` file to set up your DEX details:

```env
# Broker settings
VITE_ORDERLY_BROKER_ID=your_broker_id
VITE_ORDERLY_BROKER_NAME=Your DEX Name
VITE_ORDERLY_NETWORK_ID=mainnet  # or testnet for testing

# Meta tags
VITE_APP_NAME=Your DEX Name
VITE_APP_DESCRIPTION=Your DEX description for SEO

# Navigation menu configuration (optional)
VITE_ENABLED_MENUS=Trading,Portfolio,Markets,Leaderboard
VITE_CUSTOM_MENUS=Documentation,https://docs.yoursite.com;Blog,https://blog.yoursite.com
```

### 2. Theme Customization

Use the Shard Zero dashboard to customize your theme, or manually edit `app/styles/theme.css`.

### 3. UI Configuration

Edit `app/utils/config.tsx` to customize your UI:

- **Footer Links**: Update `footerProps` with your social media links
- **Logos**: Replace the main and secondary logos in the `appIcons` section
- **PnL Sharing**: Customize the PnL poster backgrounds and colors in `sharePnLConfig`

Required assets:
- Place your logos in the `public` directory:
  - Main logo: `public/logo.svg`
  - Secondary logo: `public/logo-secondary.svg`
  - Favicon: `public/favicon.webp`
- PnL sharing backgrounds: `public/pnl/poster_bg_[1-4].png`

## Development

Run the development server:

```sh
yarn dev
```

## Deployment

1. Build the application:

```sh
yarn build
```

2. Deploy to Vercel:
   - Create an account on [Vercel](https://vercel.com) if you haven't already
   - Install Vercel CLI: `yarn global add vercel`
   - Run `vercel` in your project directory and follow the prompts
   - For subsequent deployments, use `vercel --prod` to deploy to production

For custom domain setup:
   - Go to your project settings in Vercel dashboard
   - Navigate to the "Domains" section
   - Add and configure your custom domain

## Support

- [Shard Zero Dashboard](https://shard-zero.app/dashboard)
- [Documentation](https://docs.shard-zero.app)

Built with ❤️ by Shard Labs
