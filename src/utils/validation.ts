export function isValidMediaFile(file: any): boolean {
  return (
    file &&
    typeof file.path === 'string' &&
    typeof file.filename === 'string' &&
    typeof file.date === 'string' &&
    typeof file.timestamp === 'string' &&
    file.filename.endsWith('.mkv')
  );
}

export function validateMediaFiles(files: any[]): boolean {
  return Array.isArray(files) && files.every(isValidMediaFile);
}