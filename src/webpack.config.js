module.exports = {
    // ... autres configurations
    module: {
      rules: [
        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        },
      ],
    },
  };