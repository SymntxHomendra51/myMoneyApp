/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  text: '#212529',
  primary: '#cfd8dc',
  secondary: '#90a4ae',
  success: '#28a745',
  error: '#dc3545',
}

export const NavigationColors = {
  primary: Colors.primary, // The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
  secondary: Colors.secondary,
  // background: '', The color of various backgrounds, such as background color for the screens
  // card: '', The background color of card-like elements, such as headers, tab bars etc.
  // text: '', The text color of various elements
  // border: '', The color of borders, e.g. header border, tab bar border etc
  // notification: '', The color of Tab Navigator badge
}

/**
 * FontSize
 */
export const FontSize = {
  small: 16,
  regular: 20,
  large: 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
