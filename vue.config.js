const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 需要自定注入的文件
      patterns: [
        path.join(__dirname, './src/assets/css/variables.less'),
        path.join(__dirname, './src/assets/css/mixins.less')
      ]
    }
  }
}
