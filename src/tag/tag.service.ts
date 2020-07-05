import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from '../entities/tag.entity';
import { Repository } from 'typeorm';
import { TagDto } from '../dtos/tag.dto';

@Injectable()
export class TagService {

    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
    ){}

    findAllTag(limit:number, offset: number){
        return this.tagRepository.find(
            {
                skip: offset,
                take: limit,
                relations:['articleTags']
            });
    }

    async findOneTag(tagId: string){
        const tag = await this.tagRepository.findOne(+tagId,{relations:['articleTags']});
        if(!tag)
            return null;
        return tag;
    }

    async updateTag(tagId: string, tagDto: TagDto){
        let tag = await this.tagRepository.findOne(+tagId,{relations:['articleTags']});
        if(!tag)
            return null;
        await this.tagRepository.update(tagId,tagDto);
        tag = await this.tagRepository.findOne(+tagId,{relations:['articleTags']});
        return {updatedId: tagId, Tag: tag};
    }

    async removeTag(tagId: string){
        const tag = await this.tagRepository.findOne(+tagId);
        if(!tag)
            return null;
        await this.tagRepository.delete(+tagId);
        return {deletedId: tagId, nbTags: await this.tagRepository.findAndCount.length};
    }

    async createTag(tagDto: TagDto){        
        const tag = await this.tagRepository.save(tagDto);
        return tag;
    }

}
