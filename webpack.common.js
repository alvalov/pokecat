const path = require("path");

const loaders = [];
loaders.push({
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: "babel-loader"
})

loaders.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: "ts-loader",
})

module.exports = {
    entry: {
        app: "./src/app/index.tsx"
    },
    module: {
        rules: loaders
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"], 
    },
    output: {
        filename: "main.bundle.js",
        path: path.resolve(path.resolve(), "public")
    }
}