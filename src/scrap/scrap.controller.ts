import { Controller, Get, Query } from '@nestjs/common';
import { scrapFromUrl } from './scrap.util';

@Controller('scrap')
export class ScrapController {
  @Get()
  async repopulate(@Query('url') url: string) {
    // const url =
    //   'https://medium.com/@carloarg02/how-i-scaled-amazons-load-generator-to-run-on-1000s-of-machines-4ca8f53812cf';
    return scrapFromUrl(url);
  }
}
