export class MemoEntity {
  id: number;
  title: string;
  url: string;
  source: string;
  date_added: number;
  date_last_used?: number;
  flagged: boolean;
  media_type: string;
  description?: string;
  image?: Buffer;

  constructor({
    id,
    title,
    url,
    source,
    date_added,
    date_last_used = null,
    flagged,
    media_type,
    description = null,
    image = null,
  }) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.source = source;
    this.date_added = date_added;
    this.date_last_used = date_last_used;
    this.flagged = flagged;
    this.media_type = media_type;
    this.description = description;
    this.image = image;
  }
}
