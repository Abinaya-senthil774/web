// ============================================================
// Shared Tailwind Configuration — loaded by all pages
// ============================================================
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary":                    "#725c1d",
        "on-primary":                 "#ffffff",
        "primary-container":          "#af9550",
        "on-primary-container":       "#3d2e00",
        "primary-fixed":              "#fee093",
        "primary-fixed-dim":          "#e1c47a",
        "on-primary-fixed":           "#241a00",
        "on-primary-fixed-variant":   "#584404",
        "inverse-primary":            "#e1c47a",

        "secondary":                  "#8d4e2f",
        "on-secondary":               "#ffffff",
        "secondary-container":        "#fdab85",
        "on-secondary-container":     "#773d20",
        "secondary-fixed":            "#ffdbcc",
        "secondary-fixed-dim":        "#ffb695",
        "on-secondary-fixed":         "#351000",
        "on-secondary-fixed-variant": "#70371a",

        "tertiary":                   "#00677e",
        "on-tertiary":                "#ffffff",
        "tertiary-container":         "#38a4c2",
        "on-tertiary-container":      "#003542",
        "tertiary-fixed":             "#b4ebff",
        "tertiary-fixed-dim":         "#70d3f3",
        "on-tertiary-fixed":          "#001f27",
        "on-tertiary-fixed-variant":  "#004e5f",

        "error":                      "#ba1a1a",
        "on-error":                   "#ffffff",
        "error-container":            "#ffdad6",
        "on-error-container":         "#93000a",

        "background":                 "#faf9f5",
        "on-background":              "#1b1c1a",
        "surface":                    "#faf9f5",
        "on-surface":                 "#1b1c1a",
        "surface-variant":            "#e3e2df",
        "on-surface-variant":         "#4c4639",
        "surface-dim":                "#dbdad6",
        "surface-bright":             "#faf9f5",
        "surface-container-lowest":   "#ffffff",
        "surface-container-low":      "#f4f4f0",
        "surface-container":          "#efeeea",
        "surface-container-high":     "#e9e8e4",
        "surface-container-highest":  "#e3e2df",
        "surface-tint":               "#725c1d",

        "inverse-surface":            "#2f312e",
        "inverse-on-surface":         "#f2f1ed",

        "outline":                    "#7e7667",
        "outline-variant":            "#cfc5b4",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg:      "0.25rem",
        xl:      "0.5rem",
        full:    "0.75rem",
      },
      spacing: {
        "base":            "8px",
        "gutter":          "24px",
        "margin-mobile":   "20px",
        "margin-desktop":  "64px",
        "container-max":   "1100px",
      },
      fontFamily: {
        "headline-xl":        ["Newsreader"],
        "headline-lg":        ["Newsreader"],
        "headline-lg-mobile": ["Newsreader"],
        "body-lg":            ["Source Sans 3"],
        "body-md":            ["Source Sans 3"],
        "label-md":           ["Source Sans 3"],
      },
      fontSize: {
        "headline-xl": ["48px", { lineHeight: "1.1",  letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "1.2",  fontWeight: "500" }],
        "headline-lg-mobile": ["28px", { lineHeight: "1.2", fontWeight: "500" }],
        "body-lg":     ["18px", { lineHeight: "1.6",  fontWeight: "400" }],
        "body-md":     ["16px", { lineHeight: "1.5",  fontWeight: "400" }],
        "label-md":    ["14px", { lineHeight: "1.0",  letterSpacing: "0.05em", fontWeight: "600" }],
      },
    },
  },
};
