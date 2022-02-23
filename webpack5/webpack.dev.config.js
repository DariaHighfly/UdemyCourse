const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// devDependencies - for build process

module.exports = {
    // was 1 bundle entry: './src/index.js',
    entry: {
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js',
    },
    output: {
        // contenthash - хэш для кэшироваия бандлов - один код == один хэш
        // !!!!! DON'T NEED contenthash IN DEV !!!!!
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, "./dist"),
        publicPath: ''
    },
    // production/development/none
    mode: 'development',
    // want to run dev locally on server
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, "./dist"),
        },
        devMiddleware: {
            index: 'index.html',
            //save explicity files into folder
            writeToDisk: true,
        }

    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // inline - generate base64 represent + put in js bundle - for many small img (icons) for 1 request
                // resource - generate separate file in dist (+export url to file) - for big img (1-10) for many request
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024 // 3 kilobites
                    }
                }
            },
            {
                test: /\.txt/,
                // source - takes file as it is + put in js bundle (without modification)
                type: 'asset/source'
            },
            // loaders - for files can't import with assets
            {
                test: /\.css$/,
                use: [
                    // was replacead - 'style-loader', // inject styles to files
                    'style-loader',
                    'css-loader' // read
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // was replacead - 'style-loader', // inject styles to files
                    'style-loader',
                    'css-loader', // read + cjnvert to js rep
                    'sass-loader' // convert scss to css
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // env converts all js to ES5
                        presets: [ '@babel/env' ],
                        plugins: [ '@babel/plugin-proposal-class-properties' ],
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: {
                    loader: 'handlebars-loader',
                }
            },
        ],
    },
    // loaders for import
    // plugins for other stuff
    plugins: [
        // from 16KB bytes to 5KB bytes wooooo
        // !!!!! DON'T NEED TerserPlugin MiniCssExtractPlugin IN DEV !!!!!
        // new TerserPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: 'styles.css'
        // }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                // remove recursive all files
                '**/*',
                // removes all files in directory
                path.join(process.cwd(), 'build/**/*')
            ]
        }),
        // put html in bundle (saves md5 hash)
        new HtmlWebpackPlugin({
            filename: 'hello-world.html',
            title: 'Hello world!',
            chunks: [ 'hello-world' ],
            // filename: 'subfolder/custo_filename.html',
            template: 'src/page-template.hbs',
            // meta: {
            //     description: 'Some description'
            // }
            description: 'Hellow world',
            minify: false
        }),
        new HtmlWebpackPlugin({
            filename: 'kiwi.html',
            title: 'Kiwi!',
            chunks: [ 'kiwi' ],
            template: 'src/page-template.hbs',
            description: 'Some description',
            minify: false
            // minify: false - no optimisations
        })
    ]
}
