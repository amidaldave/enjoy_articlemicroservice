import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { TagModule } from './tag/tag.module';
import { LabelModule } from './label/label.module';
import { RedactionModule } from './redaction/redaction.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TagModule, LabelModule, RedactionModule, ArticleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
