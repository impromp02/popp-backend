import { Controller, Get, Param } from '@nestjs/common';
import { MemoServie } from './memo.service';
import { MemoDto } from './memo.dto';

@Controller('memo')
export class MemoController {
  constructor(private memoService: MemoServie) {}

  @Get()
  getAllMemos(): MemoDto[] {
    const rows = this.memoService.getAllMemos();
    if (rows) {
      return rows.map((s) => ({
        id: s.id,
        title: s.title,
        url: s.url,
        source: s.source,
        dateAdded: s.date_added,
        dateLastUsed: s.date_last_used,
        flagged: Boolean(s.flagged),
        mediaType: s.media_type,
      }));
    }
    throw Error('failed to fetch memo row');
  }

  @Get(':id')
  getMemoById(@Param('id') id: number) {
    return this.memoService.getMemoById(id);
  }
}
