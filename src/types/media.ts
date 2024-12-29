export interface MediaFile {
  id: string;
  path: string;
  filename: string;
  date: string;
  timestamp: Date;
  favorite: boolean;
  type: 'video';
}

export type ViewMode = 'grid' | 'list';

export interface DateGroup {
  date: string;
  files: MediaFile[];
}