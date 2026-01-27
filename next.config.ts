import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
<<<<<<< HEAD
        hostname: 'sdfjypdcqrqtivluwjxg.supabase.co',
=======
        hostname: 'res.cloudinary.com',
>>>>>>> 8519b4eb369536447b67503c75e22989c7694fc4
      },
    ],
  },
};

export default nextConfig;
