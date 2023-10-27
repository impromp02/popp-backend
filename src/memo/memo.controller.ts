import { Controller, Get } from '@nestjs/common';
import { MemoServie } from './memo.service';

@Controller('memo')
export class MemoController {
  constructor(private memoService: MemoServie) {}

  @Get()
  getMemo(): string {
    return this.memoService.getMemo();
  }
}
