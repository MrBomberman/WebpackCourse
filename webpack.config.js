const path = require('path'); // подключаем модуль path, благодаря которому удобно работать с путями на платформе
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); // забираем из объекта нужный класс
const CopyWebpackPlugin = require('copy-webpack-plugin'); // подключаем копирование плагинов
// const MiniCssExtractPlugi = require('mini-css-extract-plugin'); // класс предоставляет возможность добавить лоадер
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const isDev = process.env.NODE_ENV === 'development'; // переменная проверяет, находимся ли мы в стадии разработки(среде)
const isProd = !isDev;
// const filename = ext => isDev ? `name.${ext}` : `[name].[hash].${ext}`;

const cssLoaders = extra => { // принимает аргумент
    const loaders = ['style-loader', 'css-loader'];

    if (extra){ // если аргумент определен - лоадер
        loaders.push(extra); //  то в наш массив добавляем этот лоадер
    }

    return loaders;
}
const babelOptions = preset => {
    const opts = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    }
    
    if (preset){
        opts.presets.push(preset);
    }
    return opts;
}

const jsLoaders = () =>{
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
      }]
    
    if (isDev){
        loaders.push('eslint-loader')
    }
     
    return loaders
}

const plugins = () => {
    const base = [ // подключаем плагины
        new HTMLWebpackPlugin({
            title: 'Webpack course',
            template: './index.html', // полностью соберет контент из этого файла
            minify: {
                collapseWhitespace: isProd // делаем это, когда приложение собирается в продакшн- оптимизация html
            }
        }), // добавили новый плагин
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({ // передаем массив, для каждого элемента копирования указываем объект // откуда копируем и куда
            patterns: [
                {from: path.resolve(__dirname, 'src/favicon.ico'), 
                to: path.resolve(__dirname, 'dist')}
            ]
        }),
    ]
    if (isProd){
        base.push(new BundleAnalyzerPlugin());
    }
    return base
}

module.exports = { // задаем конфигурацию
    context: path.resolve(__dirname, 'src'), // говорит, где лежат все исходники нашего приложения
    mode: 'development', // собираем все в режиме разработки
    entry: { // собираем две точки входа для приложения, собираются они в файлы с определенными названиями
        main: ['@babel/polyfill','./index.jsx'], // задаем первую точку входа , а также полифил, которым мы пользуемся
        analytics: './analytics.ts'
    }, // указываем входной файл для нашего приложения
    output: { // куда нам необходимо складывать результат работы webpack
        filename: '[name].[hash].js', //  все скрипты соберуться в один файл
        path: path.resolve(__dirname, 'dist') // отталкиваясь от текущей директории, мы все складываем в папку dist

    },
    resolve: { // объект
        extensions: ['.js', '.png', '.json'], // говорим webpack какие расширения следует понимать по умолчанию
        alias: {
            '@models': path.resolve(__dirname, 'src/models'), // ключом меняем длинное написание пути до папки
            '@': path.resolve(__dirname, 'src')
        }
    },
    //devtool: isDev ? 'source-map' : '',
    optimization: { // оптимизация кода
        splitChunks: {
            chunks: 'all' // общий код подключенной бибилотеки js будет вынесен в отдельный файл vendor
        }
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: plugins(),
    module: {
        rules: [ // правила, тут и задаем новые лоадеры
            { // подключаем лоадеры 
                test: /\.css$/, // как только webpack встречает в импортах css файлы
                use: cssLoaders() // необходимо использовать определенный тип лоадеров
            }, // webpack  идет справа налево
            {
                test: /\.(png|jpg|svh|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            { // подключаем лоадеры айлы формата less
                test: /\.less$/, // как только webpack встречает в импортах css файлы
                use: cssLoaders('less-loader') // необходимо использовать определенный тип лоадеров
            }, // webpack  идет справа налево
            { // подключаем лоадеры айлы формата sass
                test: /\.s[ac]ss$/, // как только webpack встречает в импортах sass файлы
                use: cssLoaders('sass-loader') // необходимо использовать определенный тип лоадеров
            }, // webpack  идет справа налево
            {
                test: /\.m?js$/,
                exclude: /node_modules/, // необходимо из поиска убрать эту папку
                use: jsLoaders()
              },
              {
                test: /\.ts/,
                exclude: /node_modules/, // необходимо из поиска убрать эту папку
                use: {
                  loader: 'babel-loader',
                  options: babelOptions('@babel/preset-typescript')
                }
              },
              {
                test: /\.jsx/,
                exclude: /node_modules/, // необходимо из поиска убрать эту папку
                use: {
                  loader: 'babel-loader',
                  options: babelOptions('@babel/preset-react')
                }
              },
        ]

    }
}