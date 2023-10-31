import { Module } from '@nestjs/common';
import { MemoModule } from './memo/memo.module';
import { ScrapModule } from './scrap/scrap.module';

@Module({
  imports: [MemoModule, ScrapModule],
})
export class AppModule {}
