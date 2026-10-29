import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  jsxFramework: "react",
  theme: {
    extend: {
      tokens: {
        colors: {
          paper: { value: "#F6F6F3" },
          surface: { value: "#FFFFFF" },
          ink: { value: "#141414" },
          body: { value: "#2E2E2A" },
          muted: { value: "#55554F" },
          line: { value: "#E2E2DC" },
          placeholder: { value: "#ECECE6" },
          cobalt: { value: "#2B3BFF" },
          cobaltDeep: { value: "#1A24B8" },
          panel: { value: "#111317" },
          panelLine: { value: "#262A31" },
          panelText: { value: "#C9D1D9" },
          panelMuted: { value: "#9BA3AF" },
        },
        fonts: {
          sans: { value: "'IBM Plex Sans KR', system-ui, sans-serif" },
          mono: { value: "'JetBrains Mono', ui-monospace, monospace" },
        },
        durations: {
          inspect: { value: "320ms" },
        },
        easings: {
          settle: { value: "cubic-bezier(.2,.7,.2,1)" },
        },
      },
    },
  },
  outdir: "styled-system",
});
