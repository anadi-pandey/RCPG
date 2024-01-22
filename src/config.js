import { ProvidePlugin } from "webpack";

export const resolve = {
  fallback: {
    path: require.resolve("path-browserify"),
  },
};

export const moduleConfig = {
  rules: [
    {
      test: /\.worker\.js$/,
      use: {
        loader: "worker-loader",
        options: {
          // Additional options for the worker-loader if needed
        },
      },
    },
    // Other rules
  ],
};

export const plugins = [
  // Add any necessary plugins here
  new ProvidePlugin({
    process: "global", // Use the 'process' polyfill if needed
  }),
];
