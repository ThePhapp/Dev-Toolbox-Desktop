export interface ColorValue {
  hex: string;
  rgb: string;
  hsl: string;
}

export function convertColor(hexInput: string): ColorValue {
  let hex = hexInput.trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(hex))
    hex = [...hex].map((character) => character.repeat(2)).join('');
  if (!/^[0-9a-f]{6}$/i.test(hex))
    throw new Error('Enter a 3 or 6 digit hex color.');
  const [r, g, b] = [0, 2, 4].map((offset) =>
    parseInt(hex.slice(offset, offset + 2), 16),
  );
  const [red, green, blue] = [r, g, b].map((value) => value / 255);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  let hue = 0;
  let saturation = 0;
  if (max !== min) {
    const delta = max - min;
    saturation =
      lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    if (max === red) hue = (green - blue) / delta + (green < blue ? 6 : 0);
    else if (max === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
    hue /= 6;
  }
  return {
    hex: `#${hex.toUpperCase()}`,
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${Math.round(hue * 360)}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`,
  };
}
