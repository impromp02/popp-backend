import { BadGatewayException } from '@nestjs/common';
import sharp from 'sharp';

export class PlatformImage {
  size?: number;
  type?: string;
  buffer?: ArrayBuffer;
}

export async function fetchImage(url: string): Promise<PlatformImage> {
  try {
    const response = await fetch(url);
    const size = response.headers.has('content-length')
      ? +response.headers.get('content-length')
      : -1;
    const type = response.headers.has('content-type')
      ? response.headers.get('content-type')
      : '';
    const buff = await response.arrayBuffer();
    return { buffer: buff, size, type };
  } catch (error) {
    throw new BadGatewayException(error.message, {
      cause: error,
      description: `${error.message}: ${url}`,
    });
  }
}

export async function convertToWebp({ buffer, type }: PlatformImage) {
  if (type !== 'image/webp') {
    const imageBuffer = await sharp(buffer).webp({ lossless: true }).toBuffer();
    return imageBuffer;
  }
  return null;
}
