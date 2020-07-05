import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleEntity } from '../entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '../entities/tag.entity';
import { RedactionEntity } from '../entities/redaction.entity';
import { LabelEntity } from '../entities/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ArticleEntity,
    TagEntity,
    LabelEntity,
    RedactionEntity])],
    
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
