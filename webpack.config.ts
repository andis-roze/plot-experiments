import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";

interface Env {
    NODE_ENV: string;
}

type configFactory = (env: Env) => webpack.Configuration;

const createConfig: configFactory = env => {
    let environment: string;

    switch (env.NODE_ENV) {
        case "dev":
            environment = "development";
            break;
        case "test":
            environment = "test";
            break;
        case "prod":
            environment = "production";
            break;
        default:
            environment = "development";
    }

    return {
        entry: {
            "index": "./src/index.tsx",
        },
        devtool: "source-map",
        mode: env.NODE_ENV === "prod" ? "production" : "development",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: ["ts-loader", "tslint-loader"],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(scss)$/,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: "css-loader",
                            options: {
                                esModule: true,
                                modules: {
                                    exportLocalsConvention: "camelCase",
                                },
                                importLoaders: 2,
                            },
                        }, 
                        { loader: "postcss-loader" }, 
                        { loader: "sass-loader" },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                title: "Plot experiments",
                template: "./src/index.html",
                filename: "./index.html",
            }),
            new CircularDependencyPlugin({
                exclude: /node_modules/,
                failOnError: true,
                allowAsyncCycles: false,
                cwd: process.cwd(),
            }),
            new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [`dist/${environment}`] }),
        ],
        resolve: {
            extensions: [ ".ts", ".tsx", ".js" ]
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "dist", environment),
        },
        devServer: {
            contentBase: path.join(__dirname, "dist", environment),
        }
    };
};

export default createConfig;
