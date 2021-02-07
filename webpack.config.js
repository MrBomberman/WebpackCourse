const path = require('path'); // подключаем модуль path, благодаря которому удобно работать с путями на платформе
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // забираем из объекта нужный класс

module.exports = { // задаем конфигурацию
    context: path.resolve(__dirname, 'src'), // говорит, где лежат все исходники нашего приложения
    mode: 'development', // собираем все в режиме разработки
    entry: { // собираем две точки входа для приложения, собираются они в файлы с определенными названиями
        main: './index.js', // задаем первую точку входа
        analytics: './analytics.js'
    }, // указываем входной файл для нашего приложения
    output: { // куда нам необходимо складывать результат работы webpack
        filename: '[name].[contenthash].js', //  все скрипты соберуться в один файл
        path: path.resolve(__dirname, 'dist') // отталкиваясь от текущей директории, мы все складываем в папку dist

    },
    plugins: [ // подключаем плагины
        new HTMLWebpackPlugin({
            title: 'Webpack course',
            template: './index.html' // полностью соберет контент из этого файла
        }), // добавили новый плагин
        new CleanWebpackPlugin()
    ],
    module: { 
        rules: [ // правила, тут и задаем новые лоадеры
            { // подключаем лоадеры 
                test: /\.css$/, // как только webpack встречает в импортах css файлы
                use: ['style-loader','css-loader'] // необходимо использовать определенный тип лоадеров
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
            }
        ]

    }
} 