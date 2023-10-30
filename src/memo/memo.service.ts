import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';
import { IMemo } from './memo.interface';

@Injectable()
export class MemoServie {
  private _db: Database.Database;
  constructor() {
    this._db = new Database(`${process.cwd()}/database/popp.db`);
  }

  getMemo(): IMemo[] {
    return this._db.prepare('SELECT * FROM memos').all() as IMemo[];
  }
}
