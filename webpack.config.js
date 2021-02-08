const path = require('path'); // подключаем модуль path, благодаря которому удобно работать с путями на платформе
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); // забираем из объекта нужный класс
const CopyWebpackPlugin = require('copy-webpack-plugin'); // подключаем копирование плагинов


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
    resolve: { // объект
        extensions: ['.js', '.png', '.json'], // говорим webpack какие расширения следует понимать по умолчанию
        alias: {
            '@models': path.resolve(__dirname, 'src/models'), // ключом меняем длинное написание пути до папки
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: { // оптимизация кода
        splitChunks: {
            chunks: 'all' // общий код подключенной бибилотеки js будет вынесен в отдельный файл vendor
        }
    },
    devServer: {
        port: 4200
    },
    plugins: [ // подключаем плагины
        new HTMLWebpackPlugin({
            title: 'Webpack course',
            template: './index.html' // полностью соберет контент из этого файла
        }), // добавили новый плагин
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([ // передаем массив, для каждого элемента копирования указываем объект
            {
                from: path.resolve(__dirname, 'src/favicon.ico'), // откуда копируем и куда
                to: path.resolve(__dirname, 'dist')
            }
        ])
    ],
    module: {
        rules: [ // правила, тут и задаем новые лоадеры
            { // подключаем лоадеры 
                test: /\.css$/, // как только webpack встречает в импортах css файлы
                use: ['style-loader', 'css-loader'] // необходимо использовать определенный тип лоадеров
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
            }
        ]

    }
}