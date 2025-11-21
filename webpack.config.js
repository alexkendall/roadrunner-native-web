const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  config.resolve = {
    ...config.resolve,
    alias: {
      "react-native": "react-native-web",
    },
    extensions: [".web.ts", ".web.tsx", ".web.js", ".js", ".ts", ".tsx", ".ttc", ".otf"],
  };
  
  // Ensure all routes serve index.html for client-side routing
  if (config.devServer) {
    config.devServer.historyApiFallback = {
      disableDotRule: false,
      index: '/index.html',
    };
  }
  
  return config;
};
