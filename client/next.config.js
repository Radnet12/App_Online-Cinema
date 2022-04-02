/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    API_URL: process.env.REACT_API_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.REACT_API_URL}/api/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `${process.env.REACT_API_URL}/uploads/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
