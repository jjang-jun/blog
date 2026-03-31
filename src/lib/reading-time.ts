export function calculateReadingTime(content: string): number {
  const plainText = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#*_\[\]()>`~\-|]/g, '')
    .replace(/\s+/g, '')

  const minutes = Math.ceil(plainText.length / 500)
  return Math.max(1, minutes)
}
