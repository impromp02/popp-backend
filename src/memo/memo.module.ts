import { Module } from '@nestjs/common';
import { MemoServie } from './memo.service';
import { MemoController } from './memo.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [MemoController],
  providers: [MemoServie],
  imports: [DatabaseModule],
  exports: [MemoServie],
})
export class MemoModule {}
