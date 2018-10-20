const path = require('path');
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:'./src/app.jsx',
    output: {
        path: path.resolve(__dirname,'./dist'),
        publicPath: '/dist/',
        filename: 'js/app.js'
    },
    module: {
        rules: [
            {
                test:/\.jsx$/,
                //使用react之后文件后缀改为了jsx
                exclude: /(node_modules)/,  //对参数不做处理
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react']
                    }
                }
            },
            {
                test: /\.css$/,
                use:  ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, //小于这个大小的图片资源直接转成base64
                            name: 'resource/[name].[ext]'  //文件打包后的位置
                        }
                    }
                 ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'  //文件打包后的位置
                        }
                    }
                 ]
            }
        ]   
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
         //独立css文件
        new ExtractTextPlugin('css/[name].css'),
        //提出公共模块的插件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js' //通用的文件被打包到这个文件里
        })
    ],
    devServer: {
        //默认的8080端口可能会被占用，所以修改
        port: 8086 
    }
}