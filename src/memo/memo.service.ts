import { Injectable } from '@nestjs/common';
import { MemoEntity } from './memo.interface';
import { DatabaseService } from 'src/database/database.service';
import {
  IScrap,
  fetchImage,
  fetchOGMetadata,
  SQLiteDatabaseException,
  convertToWebp,
} from 'src/utils';
import { MediaType } from './enums';
import { Buffer } from 'node:buffer';
import { SqliteError } from 'better-sqlite3';

@Injectable()
export class MemoService {
  constructor(private databaseService: DatabaseService) {}

  getAllMemos(): MemoEntity[] {
    try {
      const rows = this.databaseService.db
        .prepare('SELECT * FROM memos LIMIT 10')
        .all() as MemoEntity[];
      return rows.map((s) => new MemoEntity(s));
    } catch (error) {
      throw new SQLiteDatabaseException(error);
    }
  }

  getMemoById(id: number): MemoEntity {
    try {
      const row = this.databaseService.db
        .prepare('SELECT * FROM memos WHERE id = ?')
        .get(id) as MemoEntity;
      return new MemoEntity(row);
    } catch (error) {
      throw new SQLiteDatabaseException(error);
    }
  }

  async updateMemoById(id: number): Promise<boolean> {
    try {
      const memo = this.getMemoById(id);

      let properties: IScrap = null;
      let imageBuffer: Buffer = null;

      if (memo.url) {
        properties = await fetchOGMetadata(memo.url);
      }

      if (properties.ogImage) {
        try {
          const image = await fetchImage(properties.ogImage);
          imageBuffer = await convertToWebp(image);
        } catch {}
      }

      const info = this.databaseService.db
        .prepare(
          'UPDATE memos SET (title, media_type, image, description) = (@title, @media_type, @image, @description) WHERE id = @id',
        )
        .run({
          title: properties.ogTitle ?? memo.title,
          media_type: properties.ogType ?? MediaType.other,
          image: imageBuffer,
          description: properties.ogDescription ?? memo.description,
          id: id,
        });
      return Boolean(info.changes);
    } catch (error) {
      if (error instanceof SqliteError) {
        throw new SQLiteDatabaseException(error);
      } else {
        throw error;
      }
    }
  }
}
