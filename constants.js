export const COLORS = {
  textPurple: 'rgba(67, 56, 202, 1)',
  textPurpleDark: 'rgba(79, 70, 229, 1)',
  textBlack: 'rgba(17, 24, 39, 1)',
  textWhite100: 'rgba(229, 231, 235, 1)',
};

export const BREAKPOINTS = {
  smallDevice: 640,
  mediumDevice: 768,
  largeDevice: 1024,
  extraLargeDevice: 1280,
  twoExtraLargeDevice: 1536,
};

export const QUERIES = {
  smallAndUp: `(min-width: ${BREAKPOINTS.smallDevice / 16}rem)`,
  mediumAndUp: `(min-width: ${BREAKPOINTS.mediumDevice / 16}rem)`,
  largeAndUp: `(min-width: ${BREAKPOINTS.largeDevice / 16}rem)`,
  extraLargeAndUp: `(min-width: ${BREAKPOINTS.extraLargeDevice / 16}rem)`,
  twoExtraLargeAndUp: `(min-width: ${BREAKPOINTS.twoExtraLargeDevice / 16}rem)`,
};
