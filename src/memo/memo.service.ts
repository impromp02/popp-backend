import { Injectable } from '@nestjs/common';
import { IMemo } from './memo.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MemoServie {
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
}
