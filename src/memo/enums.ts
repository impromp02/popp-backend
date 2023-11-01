// Define the enum which corresponds to the media_type column
// On the www, it's fetched from the og:type meta tag value

export enum MediaType {
  article = 'article',
  object = 'object',
  video = 'video',
  image = 'image',
  other = 'other',
}

// It is used to store the value in source column
export enum Source {
  youtube = 'youtube',
  twitter = 'twitter',
  bookmark = 'bookmark',
}
