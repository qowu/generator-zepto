
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
   mode: 'development',
   // 项目根目录
   context: path.join(__dirname, './') ,
   // 入口文件 
   entry: [
       './src/main.js'
   ],
   // 打包编译生成文件配置
   output: {
       path: path.join(__dirname, './dist'),
       filename: 'index.js',
       publicPath: '/dist/' // devServer访问的路径前缀
   },
   resolve: {
       extensions: ['.js', '.es6'], // 引入文件的默认扩展名
   },
   devServer: {
    contentBase: path.join(__dirname, './'),
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 8081
   },
   devtool: 'source-map',
   module: {
       rules: [
            {
               test: /\.(js|es6)$/,
               use: 'babel-loader',
               exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: 'css-loader'
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: require.resolve('zepto'),
                use: ['exports-loader?window.Zepto', 'script-loader']
            }
        ]
   },
   plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('global.css') 
    ]
}