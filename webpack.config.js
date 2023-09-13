const { merge } = require("webpack-merge");

console.log(process.env.NODE_ENV);

const envConf =
  process.env.NODE_ENV === "production"
    ? require("./webpack.prod")
    : require("./webpack.dev");

module.exports = merge(require("./webpack.common"), envConf);
