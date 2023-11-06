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
      image: s.image?.toString('base64'),
    }));
  }

  @Get(':id')
  getMemoById(@Param('id') id: number): MemoDto {
    const memoEntity = this.memoService.getMemoById(id);
    const response = {
      id: memoEntity.id,
      title: memoEntity.title,
      url: memoEntity.url,
      source: memoEntity.source,
      dateAdded: memoEntity.date_added,
      dateLastUsed: memoEntity.date_last_used,
      flagged: Boolean(memoEntity.flagged),
      mediaType: memoEntity.media_type,
      description: memoEntity.description,
      image: memoEntity.image.toString('base64'),
    };
    return response;
  }

  @Get('update/:id')
  async refillMemoById(@Param('id') id: number): Promise<boolean> {
    const isUpdated: boolean = await this.memoService.updateMemoById(id);
    return isUpdated;
  }
}
