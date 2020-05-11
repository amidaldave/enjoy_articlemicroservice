import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class LabelEntity {
  
    @PrimaryGeneratedColumn({name:'label_id'})
    @ApiProperty()
    idLabel: number;

    @Column({name:'label_title', length:100})
    @ApiProperty()
    labeltitle: string;

    @Column({name:'label_description', length:200})
    @ApiProperty()
    labelDescription: string;

    @ManyToMany(type =>ArticleEntity, articleEntity => articleEntity.labels)
    articleLabels: ArticleEntity[];

}