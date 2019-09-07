const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
  const isProduction = env === 'production';
  return {
    mode: 'none',
    entry: ["@babel/polyfill", './src/index.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
                    options: {
                sourceMap: true
              }
          },
          'css-loader',
          'sass-loader',
        ]
       
      },
    //   {
    //     test: /\.(jpg|jpeg|gif|png)$/,
    //     exclude: /node_modules/,
    //     loader:'url-loader?limit=1024&name=[name].[ext]'
    // },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          // 'file-loader'
          'file-loader?name=[name].[ext]'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
    },
    
    plugins: [
      // new webpack.DefinePlugin({
      //   'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      //   'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      //   'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      //   'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      //   'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      //   'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      //   'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID)
      // // }),
      // new CopyPlugin([
      //   { from: './src/assets/img', to: 'images' }
      // ]),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'styles.css',
        // chunkFilename: '[id].css',
      }),
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};
