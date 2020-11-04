const path = require('path');
const nextComposePlugins = require('next-compose-plugins');
const nextReactSvg = require('next-react-svg');

// eslint-disable-next-line no-undef
const svgDir = path.resolve(__dirname, 'src/assets/svg');

const nextConfig = { poweredByHeader: false, images: { domains: ['images.prismic.io'] } };

module.exports = nextComposePlugins(
  [[nextReactSvg, { include: svgDir }]],
  // eslint-disable-next-line prettier/prettier
  nextConfig);