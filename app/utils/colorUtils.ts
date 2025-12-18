/**
 * Arka plan rengine göre uygun metin rengini döndürür
 */
export function getTextColor(backgroundColor: string): string {
  // Hex rengi RGB'ye çevir
  const hex = backgroundColor.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  
  // Luminance hesapla (WCAG standardı)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  // Luminance 0.5'ten büyükse koyu metin, küçükse açık metin
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

/**
 * RGB rengi hex'e çevirir
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

/**
 * Hex rengi RGB'ye çevirir
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

/**
 * Shadow rengini tema rengine göre oluşturur
 */
export function getShadowColor(color: string, opacity: number = 0.3): string {
  const rgb = hexToRgb(color)
  if (!rgb) return `rgba(0, 0, 0, ${opacity})`
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
}

