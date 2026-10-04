/**
 * Currency & number formatting helpers tailored for Cameroon (XAF / FCFA)
 */
export function formatCurrency(amount: number, currency: string = 'FCFA'): string {
  const formattedNumber = new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formattedNumber} ${currency}`;
}

export function formatSalaryRange(min?: number, max?: number, currency: string = 'FCFA'): string | null {
  if (min && max) {
    return `${formatCurrency(min, '')} - ${formatCurrency(max, currency)}`;
  }
  if (min) {
    return `À partir de ${formatCurrency(min, currency)}`;
  }
  if (max) {
    return `Jusqu'à ${formatCurrency(max, currency)}`;
  }
  return null;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export function getInitials(firstName: string, lastName: string): string {
  const f = firstName.trim().charAt(0).toUpperCase();
  const l = lastName.trim().charAt(0).toUpperCase();
  return `${f}${l}`;
}
