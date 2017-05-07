const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: ['./src/main.js'],
        vendor: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, './src/style'),
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        // plugins: ['transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: true,
            hash: true,
            cache: true,
            chunks: ['app', 'vendor', 'manifest']
        }),
        // compile time plugins
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"production"',
        // }),
        // webpack-dev-server enhancement plugins
        // new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}
