import { Module } from '@nestjs/common';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelEntity } from '../entities/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabelEntity])],
  controllers: [LabelController],
  providers: [LabelService]
})
export class LabelModule {}
