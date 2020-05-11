import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { TagService } from './tag.service';
import { MessagePattern } from '@nestjs/microservices';
import { TagDto } from '../dtos/tag.dto';
import { TagEntity } from '../entities/tag.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('tag')
export class TagController {

    constructor(
        private readonly tagService: TagService,
    ){}

    @MessagePattern({cmd :'getTag'})    
    findAllTag(data: any[]){
        return this.tagService.findAllTag(data[0], data[1]);
    }

    @MessagePattern({cmd :'addTag'})
     @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: TagEntity,
      }) 
    async createTag(tagDto: TagDto){
        const tag = await this.tagService.createTag(tagDto);
        if(tag)
            return tag;
        throw new HttpException('Song not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({cmd :'getTagById'})
    async findOneTag(tagId: string){
        Logger.log('Le tag dont l"id est '+tagId,'TagController');
        const tag = await this.tagService.findOneTag(tagId);
        if(tag)
            return tag;
        throw new HttpException('Tag not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({cmd :'updateTag'})
    async updateTag(tagId: string, tagDto: TagDto){
        const tag = await this.tagService.findOneTag(tagId);
        if(tag)
            return await this.tagService.updateTag(tagId,tagDto);
        throw new HttpException('Tag not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({cmd :'deleteTag'})
    async removeTag(tagId: string){
        const tag = await this.tagService.findOneTag(tagId);
        if(tag)
            return await this.tagService.removeTag(tagId);
         throw new HttpException('Tag not modified',HttpStatus.NOT_FOUND);
    }

}
