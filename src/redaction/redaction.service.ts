import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedactionEntity } from '../entities/redaction.entity';
import { Repository } from 'typeorm';
import { RedactionDto } from '../dtos/redaction.dto';

@Injectable()
export class RedactionService {

    constructor(
        @InjectRepository(RedactionEntity)
        private readonly redactionRepository: Repository<RedactionEntity>,
    ){}

    findAllRedaction(limit:number, offset: number){
        return this.redactionRepository.find(
            {
                skip: offset,
                take: limit,
                relations:['authorArticles']
            });
    }

    async findOneRedaction(authorId: string){
        const author = await this.redactionRepository.findOne(+authorId,{relations:['authorArticles']});
        if(!author)
            return null;
        return author;
    }

    async updateRedaction(authorId: string, redactionDto: RedactionDto){
        let author = await this.redactionRepository.findOne(+authorId,{relations:['authorArticles']});
        if(!author)
            return null;
        await this.redactionRepository.update(authorId,redactionDto);
        author = await this.redactionRepository.findOne(+authorId,{relations:['authorArticles']});
        return {updatedId: authorId, Redaction: author};
    }

    async removeRedaction(authorId: string){
        const author = await this.redactionRepository.findOne(+authorId);
        if(!author)
            return null;
        await this.redactionRepository.delete(+authorId);
        return {deletedId: authorId, nbRedactions: await this.redactionRepository.findAndCount.length};
    }

    async createRedaction(redactionDto: RedactionDto){        
        const author = await this.redactionRepository.save(redactionDto);
        return author;
    }
    
}
