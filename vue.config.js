const configureWebpack = {
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  }
}

if (process.argv.includes('build')) {
  configureWebpack.externals = {
    'vue': 'vue',
    'vue-property-decorator': 'vue-property-decorator',
    'vue-router': 'vue-router',
    'vue-class-component': 'vue-class-component',
  };
}

module.exports = { configureWebpack };
