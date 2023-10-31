import { Injectable } from '@nestjs/common';
import { IMemo } from './memo.interface';
import { DatabaseService } from 'src/database/database.service';
import { IScrap, scrapFromUrl } from 'src/utils';

@Injectable()
export class MemoService {
  constructor(private databaseService: DatabaseService) {}

  getAllMemos(): IMemo[] {
    return this.databaseService.db
      .prepare('SELECT * FROM memos')
      .all() as IMemo[];
  }

  getMemoById(id: number): IMemo {
    return this.databaseService.db
      .prepare('SELECT * FROM memos WHERE id = ?')
      .get(id) as IMemo;
  }

  async refillMemoById(id: number): Promise<boolean> {
    const memo = this.getMemoById(id);
    console.log({ memo });
    const properties: IScrap = await scrapFromUrl(memo.url);
    console.log(properties);
    const info = this.databaseService.db
      .prepare(
        'UPDATE memos SET (description, media_type) = (?, ?) WHERE id = ?',
      )
      .run(properties.ogDescription, properties.ogType, id);
    console.log(info);
    return Boolean(info.changes);
  }
}
