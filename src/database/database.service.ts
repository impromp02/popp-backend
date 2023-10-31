import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';

@Injectable()
export class DatabaseService {
  db: Database.Database;
  constructor() {
    this.db = new Database(`${process.cwd()}/database/popp.db`);
  }
}
