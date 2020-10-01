module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: process.env.CUSTOMIZED_PUBLICPATH || "/",
  configureWebpack: {
    devtool: 'source-map'
  }
};
