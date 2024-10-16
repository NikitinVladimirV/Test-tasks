const isProd = process.env.NODE_ENV === "prod";
const full = process.argv.includes("--full");

export const webpackConfig = {
  mode: !isProd ? "development" : full ? "development" : "production",
  output: {
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
        resolve: {
          fullySpecified: false,
        },
      },
      // TODO Style Loaders
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      // },
    ],
  },
};
