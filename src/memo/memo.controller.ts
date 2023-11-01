import { Controller, Get, Param } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoDto } from './memo.dto';

@Controller('memos')
export class MemoController {
  constructor(private memoService: MemoService) {}

  @Get()
  getAllMemos(): MemoDto[] {
    const memoEntities = this.memoService.getAllMemos();
    return memoEntities.map((s) => ({
      id: s.id,
      title: s.title,
      url: s.url,
      source: s.source,
      dateAdded: s.date_added,
      dateLastUsed: s.date_last_used,
      flagged: Boolean(s.flagged),
      mediaType: s.media_type,
      description: s.description,
    }));
  }

  @Get(':id')
  getMemoById(@Param('id') id: number) {
    return this.memoService.getMemoById(id);
  }

  @Get('update/:id')
  refillMemoById(@Param('id') id: number) {
    return this.memoService.updateMemoById(id);
  }
}
