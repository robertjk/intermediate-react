const reactServerregister = require("react-server-dom-webpack/node-register");
reactServerregister();

const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/[\\\/](dist|server|node_modules)[\\\/]/],
  plugins: ["@babel/transform-modules-commonjs"],
});

const { startServer } = require("./server");
startServer();
