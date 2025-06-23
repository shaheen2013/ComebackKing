const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

// 1. Get the default Metro config
const defaultConfig = getDefaultConfig(__dirname);

// 2. Add SVG support
const svgConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

// 3. Merge SVG config with default config
const configWithSvg = mergeConfig(defaultConfig, svgConfig);

// 4. Apply NativeWind styling
const configWithNativeWind = withNativeWind(configWithSvg, {
  input: './global.css',
});

// 5. Wrap the final config with Reanimated's Metro plugin
module.exports = wrapWithReanimatedMetroConfig(configWithNativeWind);
