const rules = require("./webpack.rules");
const webpack = require('webpack')

rules.push({
    test: /\.css$/,
    use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        "postcss-loader",
    ],
});

module.exports = {
    // Put your normal webpack config below here
    module: {
        rules,
    },
    resolve: {
        fallback: {
            stream: require.resolve("stream-browserify"),
            zlib: require.resolve("browserify-zlib"),
            path: require.resolve("path-browserify"),
            https: require.resolve("https-browserify"),
            http: require.resolve("stream-http"),
            url: require.resolve("url"),
            assert: require.resolve("assert"),
            util: require.resolve("util"),
            fs: false,
        },
    },

    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        // fix "process is not defined" error:
        // (do "npm install process" before running the build)
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
};
