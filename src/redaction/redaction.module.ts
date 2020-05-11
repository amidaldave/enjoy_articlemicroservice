import { Module } from '@nestjs/common';
import { RedactionController } from './redaction.controller';
import { RedactionService } from './redaction.service';
import { RedactionEntity } from '../entities/redaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RedactionEntity])],
  controllers: [RedactionController],
  providers: [RedactionService]
})
export class RedactionModule {}
