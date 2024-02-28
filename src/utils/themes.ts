export const lightTheme = {
  colors: {
    typography: "#000000",
    secondaryTypography: "#89898E",
    background: "#ffffff",
    cardBackground: "#FDFFFF",
    borderColor: "#C0C1C1",
    gray100: "#666666",
    secondaryButtonBackgroundColor: "#FDFFFF",
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
    "2xl": 16,
  },
} as const;

export const darkTheme = {
  colors: {
    typography: "#ffffff",
    secondaryTypography: "#8C8D92",
    background: "#000000",
    cardBackground: "#201E23",
    borderColor: "#4D4D4F",
    gray100: "#A6A5A7",
    secondaryButtonBackgroundColor: "#1A1A1D",
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
    "2xl": 16,
  },
} as const;
