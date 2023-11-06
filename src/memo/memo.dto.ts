export class MemoDto {
  id: number;
  title: string;
  url: string;
  source: string;
  dateAdded: number;
  dateLastUsed?: number;
  flagged: boolean;
  mediaType: string;
  description?: string;
  image?: string;
}
