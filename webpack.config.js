var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './javascripts/app.js',
    output: {
        //path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
	include: [
		path.resolve(__dirname, "javascripts"),
		path.resolve(__dirname, "stylesheets")
	],
	resolve: {
		root: [
			path.resolve('./javascripts/'),
			path.resolve('./stylesheets/')
		]
	},
    plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.IgnorePlugin(/^fs$/), // This is how we get RiTa to load without 'fs'
		/*new webpack.DefinePlugin({
		    'process.env': {
		      'NODE_ENV': JSON.stringify('production')
		    }
		  })*/
    ],
    module: {
        loaders: [
            {
				test: /\.css$/, loader: 'style!css'
			},
			{
				test: /\.txt$/, loaders: ['raw']
			},
			{
				test: /\.yml$/,
				loaders: ['json', 'yaml'],
				include:[
					path.resolve(__dirname, 'data')
				]
			},
			{
				test: /.json$/,
				loaders: ['json'],
				include:[
					path.resolve(__dirname, 'data')
				]
			},
			{
				test: /(\.md|\.markdown|\.mdown)$/,
				loader: "html!markdown",
				include:[
					path.resolve(__dirname, 'markdown')
				]
			},
			{
				test: /(\.jsx|\.js)$/,
				loader: 'babel-loader',
				include: [
					path.resolve(__dirname, 'javascripts')
				],
				query: {
					plugins: ['transform-runtime', 'transform-class-properties'],
					presets: ["es2015", "react", "stage-0"] //"react", 
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'raw', 'sass']
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
						'file?hash=sha512&digest=hex&name=[hash].[ext]',
						'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			}
        ]
    },
	sassLoader: {
		includePaths: [
			'./node_modules',
			'./source/stylesheets'
		]
	}
};