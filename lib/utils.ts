export function getFlagEmoji(country: string): string {
  const flags: Record<string, string> = {
    Poland: '🇵🇱',
    Germany: '🇩🇪',
    Argentina: '🇦🇷',
    Finland: '🇫🇮',
    India: '🇮🇳',
    Ireland: '🇮🇪',
    Romania: '🇷🇴',
  };
  return flags[country] || '🏢';
}
