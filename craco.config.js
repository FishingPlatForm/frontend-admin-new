const CracoAntDesignPlugin = require('craco-antd')
module.exports = {
    webpack: {
      alias: {
        // 'antd/es/theme': false,
      },
    },
    plugins: [
      {
        plugin: CracoAntDesignPlugin,
        options: {
          customizeTheme: {
            '@primary-color': '#1DA57A',
          },
          babelPluginImportOptions: {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
          },
        },
      },
    ],
  }