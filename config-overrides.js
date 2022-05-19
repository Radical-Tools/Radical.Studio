module.exports = {
  webpack: function override(config) {
    const { plugins } = config;

    plugins.forEach((plugin, i) => {
      if (plugin.options?.filename?.indexOf('css') >= 0) {
        plugins[i].options.filename = 'static/css/[name].css';
      }
    });

    return {
      ...config,
      plugins,
      output: {
        ...config.output,
        filename: 'static/js/[name].js',
        asyncChunks: false,
      },
      optimization: {
        ...config.optimization,
        splitChunks: false,
      },
    };
  },
};
