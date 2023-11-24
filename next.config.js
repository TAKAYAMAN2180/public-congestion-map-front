/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
    images: {
        disableStaticImages: true
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                and: [/\.(js|ts)x?$/],
            },
            use: ["@svgr/webpack"],
        });

        // HTMLファイルのローダー設定
        config.module.rules.push({
            test: /\.html$/,
            use: "html-loader",
        });

        return config;
    },
};
