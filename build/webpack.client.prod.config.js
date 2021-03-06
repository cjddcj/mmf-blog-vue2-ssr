const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//const SWPrecachePlugin = require('sw-precache-webpack-plugin')

module.exports = {
    devtool: false,
    module: {
        rules: [{
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'static/img/[name].[hash:7].[ext]'
            }
        }]
    },
    plugins: [
        new ExtractTextPlugin('static/css/[name].[hash:7].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf('node_modules') > 0)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({name: 'manifest', chunks: ['vendor']}),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // new SWPrecachePlugin({
        //     cacheId: 'vue-hn',
        //     filename: 'server/service-worker.js',
        //     dontCacheBustUrlsMatching: /./,
        //     staticFileGlobsIgnorePatterns: [/server\.html$/, /\.map$/]
        // }),
        new HtmlWebpackPlugin({
            chunks: [
                'manifest', 'vendor', 'app',
            ],
            filename: 'server.html',
            template: 'src/template/server.html',
            inject: true,
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'manifest', 'vendor', 'admin',
            ],
            filename: 'admin.html',
            template: 'src/template/admin.html',
            inject: true,
        })
    ]
}
