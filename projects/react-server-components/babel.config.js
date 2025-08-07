const developmentMode =
  !process.env.NODE_ENV || process.env.NODE_ENV !== "development";

export default {
  presets: [
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
        useSpread: true,
        development: developmentMode,
      },
    ],
  ],
};
