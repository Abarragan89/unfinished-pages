/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
})({
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'unfinished-pages.s3.us-east-2.amazonaws.com',
            'profile.yahoo.com',
            's.yimg.com',
            'aol.com',
            'profile.aol.com',
            'apple.com',
            'icloud.com',
            'outlook.com',
            'hotmail.com',
            'profile.live.com',
        ],
    },
});

export default nextConfig;



