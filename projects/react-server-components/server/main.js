import reactServerRegister from "react-server-dom-webpack/node-register";
import babelRegister from "@babel/register";

import { runServer } from "./server";

reactServerRegister();
babelRegister({
  ignore: [/[\\\/](dist|server|node_modules)[\\\/]/],
  plugins: ["@babel/transform-modules-commonjs"],
});

runServer();
