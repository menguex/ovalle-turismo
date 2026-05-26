import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* Paleta oficial del logo Ovalle Turismo */
        brand: {
          yellow: "#FFCB05",
          orange: "#F7941D",
          blue: "#3D8FD9",
          "blue-dark": "#2B6CB8",
          night: "#0A0A0A",
        },
        night: {
          DEFAULT: "#0B0D17",
          50: "#1A1D2E",
          100: "#252838",
        },
        sand: {
          DEFAULT: "#FFF5E8",
          50: "#FFFBF5",
          100: "#FFF0DC",
        },
        copper: "#F7941D",
        gold: "#FFCB05",
        earth: "#D45A12",
        river: "#3D8FD9",
        olive: "#7A8450",
        mist: "#FFF5E8",
        fg: "var(--foreground)",
        bg: "var(--background)",
        muted: "var(--muted)",
        "muted-fg": "var(--muted-fg)",
        subtle: "var(--subtle)",
        border: "var(--border)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        "section-alt": "var(--section-alt)",
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        accent: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem,6vw,5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem,4.5vw,4rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem,3vw,2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.375rem,2vw,1.875rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "label-sm": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      spacing: {
        "section-y": "clamp(4rem, 8vw, 7rem)",
        "section-y-lg": "clamp(5rem, 10vw, 9rem)",
      },
      maxWidth: {
        prose: "65ch",
        "container-wide": "1400px",
        "container-narrow": "920px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(10, 10, 10, 0.04), 0 8px 24px rgba(10, 10, 10, 0.06)",
        "card-dark": "0 1px 3px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.35)",
        glow: "0 0 40px rgba(247, 148, 29, 0.18)",
        "glow-blue": "0 0 40px rgba(61, 143, 217, 0.2)",
        map: "0 0 0 1px rgba(61, 143, 217, 0.12), 0 24px 48px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #FFCB05 0%, #F7941D 100%)",
        "brand-gradient-vertical": "linear-gradient(180deg, #FFCB05 0%, #F7941D 100%)",
        "brand-accent": "linear-gradient(90deg, #FFCB05 0%, #F7941D 50%, #3D8FD9 100%)",
        "hero-warm": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 203, 5, 0.12), transparent)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        shimmer: "shimmer 4s linear infinite",
        float: "float 6s ease-in-out infinite",
        orbit: "orbit 16s linear infinite",
        "ken-burns": "kenBurns 20s ease-out forwards",
        "pin-pulse": "pinPulse 2s ease-in-out infinite",
        "gradient-flow": "gradientFlow 8s ease infinite",
        breathe: "breathe 4s ease-in-out infinite",
        "slide-up": "slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        orbit: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        pinPulse: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0.6" },
          "50%": { transform: "translate(-50%, -50%) scale(1.6)", opacity: "0" },
        },
        gradientFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.05)", opacity: "0.9" },
        },
        slideUp: {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,203,5,0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(255,203,5,0.3), 0 0 60px rgba(61,143,217,0.15)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
