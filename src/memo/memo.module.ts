import { Module } from '@nestjs/common';
import { MemoServie } from './memo.service';
import { MemoController } from './memo.controller';

@Module({
  controllers: [MemoController],
  providers: [MemoServie],
})
export class MemoModule {}
