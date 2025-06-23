/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable styled-components server-side rendering
  compiler: {
    styledComponents: true,
  },
  
  // Disable CSS optimization that strips 3D transforms
  experimental: {
    optimizeCss: false,
  },
  
  // Additional webpack configuration to preserve CSS
  webpack: (config, { isServer }) => {
    // Remove CSS minimizer that strips 3D properties
    if (!isServer) {
      config.optimization.minimizer = config.optimization.minimizer.filter(
        (plugin) => plugin.constructor.name !== 'CssMinimizerPlugin'
      );
    }
    
    return config;
  },
};

module.exports = nextConfig;