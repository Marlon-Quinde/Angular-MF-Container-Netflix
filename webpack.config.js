const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');


module.exports = {
  output: {
    publicPath: 'auto',
    scriptType: 'text/javascript'
  },
}
module.exports = withModuleFederationPlugin({

  remotes: {
    "usuario": "http://localhost:4201/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
