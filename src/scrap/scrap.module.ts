import { Module } from '@nestjs/common';
import { ScrapController } from './scrap.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MemoModule } from 'src/memo/memo.module';

@Module({
  controllers: [ScrapController],
  imports: [DatabaseModule, MemoModule],
})
export class ScrapModule {}
