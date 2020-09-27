module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pcr-clan-battle-analyzer-vue/'
    : '/'
};
