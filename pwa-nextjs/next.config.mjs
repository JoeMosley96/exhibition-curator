// next.config.mjs

import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */

export const nextConfig = {
    reactStrictMode: true,      // Enable React strict mode for improved error handling
    // swcMinify: true,            // Enable SWC minification for improved performance
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
    },
    // experimental:{
    //     ppr: "incremental"
    // }
    // images: {
    //     remotePatterns:[
    //         {protocol: "https",
    //         hostname:'framemark.vam.ac.uk',
    //         port:"",
    //         pathname:"/collections/**/full/full/0/default.jpg"
    //         },
    //         {protocol: "https",
    //         hostname:'www.artic.edu',
    //         port:"",
    //         pathname:"/iiif/2/**/full/full/843,/0/default.jpg"
    //         },
    //     ],
    //     domains: ['framemark.vam.ac.uk', "www.artic.edu"],
    //   },
};

export default withPWA({
    dest: "public",         // destination directory for the PWA files
    disable: process.env.NODE_ENV === "development",        // disable PWA in the development environment
    register: true,         // register the PWA service worker
    skipWaiting: true,      // skip waiting for service worker activation
})(nextConfig);