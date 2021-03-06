/* eslint-env node */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/example/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: './src/example/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map',
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
		],
	},
	plugins: [HtmlWebpackPluginConfig],
};
