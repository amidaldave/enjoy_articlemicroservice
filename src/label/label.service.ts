import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabelEntity } from '../entities/label.entity';
import { Repository } from 'typeorm';
import { LabelDto } from '../dtos/label.dto';

@Injectable()
export class LabelService {

    constructor(
        @InjectRepository(LabelEntity)
        private readonly labelRepository: Repository<LabelEntity>,
    ){}

    findAllLabel(limit:number, offset: number){
        return this.labelRepository.find(
            {
                skip: offset,
                take: limit,
                relations:['articleLabels']
            });
    }

    async findOneLabel(labelId: string){
        const label = await this.labelRepository.findOne(+labelId,{relations:['articleLabels']});
        if(!label)
            return null;
        return label;
    }

    async updateLabel(labelId: string, labelDto: LabelDto){
        let label = await this.labelRepository.findOne(+labelId,{relations:['articleLabels']});
        if(!label)
            return null;
        await this.labelRepository.update(labelId,labelDto);
        label = await this.labelRepository.findOne(+labelId,{relations:['articleLabels']});
        return {updatedId: labelId, Label: label};
    }

    async removeLabel(labelId: string){
        const label = await this.labelRepository.findOne(+labelId);
        if(!label)
            return null;
        await this.labelRepository.delete(+labelId);
        return {deletedId: labelId, nbLabels: await this.labelRepository.findAndCount.length};
    }

    async createLabel(labelDto: LabelDto){        
        const label = await this.labelRepository.save(labelDto);
        return label;
    }

}
