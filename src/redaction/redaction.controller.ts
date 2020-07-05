import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { RedactionService } from './redaction.service';
import { MessagePattern } from '@nestjs/microservices';
import { RedactionDto } from '../dtos/redaction.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { RedactionEntity } from '../entities/redaction.entity';

@Controller('redaction')
export class RedactionController {

    constructor(
        private readonly redactionService: RedactionService,
    ){}

    @MessagePattern({cmd :'getAuthor'})    
    findAllRedaction(data: any[]){
        return this.redactionService.findAllRedaction(data[0], data[1]);
    }

    @MessagePattern({cmd :'addAuthor'})
     @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: RedactionEntity,
      }) 
    async createRedaction(redactionDto: RedactionDto){
        const author = await this.redactionService.createRedaction(redactionDto);
        if(author)
            return author;
        throw new HttpException('Author not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({cmd :'getAuthorById'})
    async findOneRedaction(authorId: string){
        Logger.log('L"Auteur dont l"id est '+authorId,'RedactionController');
        const author = await this.redactionService.findOneRedaction(authorId);
        if(author)
            return author;
        throw new HttpException('Author not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({cmd :'updateAuthor'})
    async updateRedaction(data: any[]){
        const author = await this.redactionService.findOneRedaction(data[0]);
        if(author)
            return await this.redactionService.updateRedaction(data[0],data[1]);
        throw new HttpException('Author not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({cmd :'deleteAuthor'})
    async removeRedaction(authorId: string){
        const author = await this.redactionService.findOneRedaction(authorId);
        if(author)
            return await this.redactionService.removeRedaction(authorId);
         throw new HttpException('Author not modified',HttpStatus.NOT_FOUND);
    }
}
