module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://opentdb.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
