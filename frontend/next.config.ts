import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // ✅ Google profile photos
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // ✅ GitHub avatars (optional)
      },
    ],
  },
};

export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com", // ✅ Images Google (NextAuth)
//       },
//       {
//         protocol: "https",
//         hostname: "avatars.githubusercontent.com", // ✅ GitHub (si besoin)
//       },
//     ],
//   },
// };

// // ✅ Une seule ligne d’export, pas les deux
// module.exports = nextConfig;







// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// // };

// // export default nextConfig;

