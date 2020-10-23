const path = require('path');
const nextComposePlugins = require('next-compose-plugins');
const nextReactSvg = require('next-react-svg');
const nextImages = require('next-images');
const nextVideos = require('next-videos');

// eslint-disable-next-line no-undef
const svgDir = path.resolve(__dirname, 'src/assets/svg');

const nextConfig = { poweredByHeader: false };

module.exports = nextComposePlugins(
  [
    [nextImages, { exclude: svgDir }],
    [nextReactSvg, { include: svgDir }],
    [nextVideos, { assetDirectory: 'static' }],
  ],
  // eslint-disable-next-line prettier/prettier
  nextConfig);