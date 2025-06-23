/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable styled-components server-side rendering
  compiler: {
    styledComponents: true,
  },
  
  // Aggressively disable CSS optimization that strips 3D transforms
  experimental: {
    optimizeCss: false,
    swcMinify: false, // Disable SWC minification
  },
  
  // Disable all CSS optimization and minification
  swcMinify: false,
  
  // Additional webpack configuration to preserve CSS
  webpack: (config, { isServer, dev }) => {
    // In development and production, preserve CSS transforms
    if (!dev) {
      // Remove all CSS optimization plugins
      config.optimization.minimizer = config.optimization.minimizer.filter(
        (plugin) => 
          plugin.constructor.name !== 'CssMinimizerPlugin' &&
          plugin.constructor.name !== 'OptimizeCssAssetsWebpackPlugin' &&
          plugin.constructor.name !== 'CssMinimizerWebpackPlugin'
      );
      
      // Disable CSS optimization entirely
      config.optimization.minimize = false;
    }
    
    // Ensure CSS modules preserve transform properties
    const cssRule = config.module.rules.find(rule => 
      rule.test && rule.test.toString().includes('css')
    );
    
    if (cssRule && cssRule.use) {
      cssRule.use.forEach(useItem => {
        if (useItem.loader && useItem.loader.includes('css-loader')) {
          useItem.options = {
            ...useItem.options,
            minimize: false,
          };
        }
      });
    }
    
    return config;
  },
  
  // Disable static optimization for better CSS preservation
  output: 'standalone',
};

module.exports = nextConfig;