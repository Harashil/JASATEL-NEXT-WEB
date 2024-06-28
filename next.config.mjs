/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8000/:path*' // Proxy to FastAPI in development
          : '/api/:path*' // Proxy to FastAPI in production
      }
    ];
  }
  }
  
  
export default nextConfig;
