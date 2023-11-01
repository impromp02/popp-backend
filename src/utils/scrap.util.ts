import * as cheerio from 'cheerio';
import { IScrap } from './scrap.interface';
import { BadGatewayException } from '@nestjs/common';

export async function fetchOGMetadata(url: string): Promise<IScrap> {
  try {
    const response = await fetch(url);
    const body = await response.text();
    return extractGraphMetadata(body);
  } catch (error) {
    throw new BadGatewayException(error.message, {
      cause: error,
      description: url,
    });
  }
}

/**
 * Using the <meta> elements to get page's properties.
 * Visit The Open Graph protocol: https://ogp.me/
 */
function extractGraphMetadata(body: string): IScrap {
  const $ = cheerio.load(body);
  const ogTitle = $('[property=og:title],[name=og:title]').attr('content');
  const ogType = $('[property=og:type],[name=og:type]').attr('content');
  const ogImage = $('[property=og:image],[name=og:image]').attr('content');
  const ogUrl = $('[property=og:url],[name=og:url]').attr('content');
  const ogDescription = $(
    '[property=og:description],[name=og:description]',
  ).attr('content');
  return { ogImage, ogTitle, ogType, ogUrl, ogDescription };
}
