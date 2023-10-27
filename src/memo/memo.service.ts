import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';

@Injectable()
export class MemoServie {
  private _db: Database.Database;
  constructor() {
    this._db = new Database(`${process.cwd()}/database/popp.db`);
  }

  getMemo(): any {
    const row = this._db.prepare('SELECT * FROM memos WHERE id = ?').get(1);
    return row;
  }
}
