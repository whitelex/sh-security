export function formatFileDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function parseFileDate(dateStr: string): Date {
  return new Date(dateStr + 'T00:00:00');
}

export function groupFilesByDate(files: any[]): Record<string, any[]> {
  return files.reduce((groups: Record<string, any[]>, file) => {
    const date = file.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(file);
    return groups;
  }, {});
}