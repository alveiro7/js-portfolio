const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require ('copy-webpack-plugin')

module.exports = {
    // Le pasamos explicitamente el modo desde el arhcivo
    mode: "production",
    // Entry nos permite decir el punto de entrada de nuestra aplicacion
    entry: "./src/index.js",
    // Output nos permite decir dónde va enviar lo que va a preparar webpacks
    output: {
        // path es donde estará la carpeta donde se guardará los archivos
        // con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
        path: path.resolve(__dirname, "dist"),
        // filename le pone el nombre al archivo final
        filename: "main.js",
        // carpeta donde van a ir los assets module
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
        extensions:[".js"]
    },
    module: {
        // Reglas para trabajar webpack
        rules: [
            {
                // lee los archivos .js
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader'
                },
                // ignora la carpeta node modules
                exclude: /node_modules/
            },
            // una nueva regla para los css y preprocesador sass
            {
                test:/\.css|.scss$/i,
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
                ],
            },
            {
                //asset module
                test: /\.png/,
                type: 'asset/resource'
            },
            // url loader fonts
            {
                test:/\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                            // o le pasamos un bool [true o false]
                            // habilita o deshabilita la transformacion en base64
                            limit: 10000,
                            // Especifica el tipo MIME con el que se alineará el archivo.
                            // Los MIME Types (Multipurpose Internet Mail Extensions)
                            // son la manera standard de mandar contenido a través de la red.
                            mimetype: "application/font-woff",
                            // nombre inicial del archivo + ext
                            // puedes agragarle  [name]hola.[ext]
                            // el output seria asi ubuntu-regularhola.woff
                            name: "[name].[ext]",
                            // directorio de salida
                            outputPath: "./assets/fonts/",
                            // directorio publico
                            publicPath: "./assets/fonts/",
                            // avisar explicitamente si es un modulo
                            esModule: false
                        }
                    }
                }
        ]
    },
    // Seccion de plugins
    plugins: [
        new HtmlWebpackPlugin({
            // configuracion del plugin
            inject: true, // inyecta el bumdle al template HTML
            template:'./public/index.html', // la ruta del template HTML
            filename: './index.html' // nombre final del archivo
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {   // la carpeta que voy a copiar
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images" // la ruta donde van los archivos
                }
            ]
        })
    ]
}
