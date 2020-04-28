// 用途：
// 1.給@babel/register临时转码
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          debug: false,
          targets: { node: 'current' },
          useBuiltIns: 'usage',
          corejs: 3
        }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-modules-commonjs',
    ]
  };
}