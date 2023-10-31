import { Module } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [MemoController],
  providers: [MemoService],
  imports: [DatabaseModule],
})
export class MemoModule {}
