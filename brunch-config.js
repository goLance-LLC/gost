module.exports = {
  paths: {
    public: 'assets/build',
    watched: ['assets/source', 'node_modules/goui/source'],
  },
  conventions: {
    assets: 'assets/source/static',
  },
  files: {
    stylesheets: {
      joinTo: 'styles.css',
    },
    javascripts: {
      entryPoints: {
        'assets/source/scripts/index.js': 'scripts.js',
      },
    },
  },
  plugins: {
    stylus: {
      plugins: [require('autoprefixer-stylus')({ browsers: 'last 2 versions' })],
      includeCss: true,
      imports: [
        'node_modules/goui/source/utils/colors',
        'node_modules/goui/source/utils/misc',
        'node_modules/goui/source/utils/mixins',
      ],
    },
    browserSync: {
      proxy: 'localhost:2368',
      port: 3100,
      open: false,
      notify: false,
      files: ['**/*.hbs'],
    },
  },
  modules: {
    autoRequire: {
      'scripts.js': ['assets/source/scripts/index.js'],
    },
  },
  overrides: {
    production: {
      optimize: true,
      sourceMaps: false,
    },
  },
};
