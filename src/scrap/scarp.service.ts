import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { IMemo } from 'src/memo/memo.interface';
import { scrapFromUrl } from './scrap.util';
import { IScrap } from './scrap.interface';

@Injectable()
export class ScrapService {
  constructor(private databaseService: DatabaseService) {}
  async repopulateMemo(memo: IMemo): Promise<boolean> {
    const properties: IScrap = await scrapFromUrl(memo.url);
    const info = this.databaseService.db
      .prepare(
        'UPDATE memos SET (description, media_type) = (?, ?) WHERE id = ?',
      )
      .run(properties.ogDescription, properties.ogType, memo.id);
    console.log(info);
    return Boolean(info.changes);
  }
}
