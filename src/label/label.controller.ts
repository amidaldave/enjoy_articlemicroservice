import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { LabelService } from './label.service';
import { MessagePattern } from '@nestjs/microservices';
import { LabelDto } from '../dtos/label.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { LabelEntity } from '../entities/label.entity';

@Controller('label')
export class LabelController {

    constructor(
        private readonly labelService: LabelService,
    ){}

    @MessagePattern({cmd :'getLabel'})    
    findAllLabel(data: any[]){
        return this.labelService.findAllLabel(data[0], data[1]);
    }

    @MessagePattern({cmd :'addLabel'})
     @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: LabelEntity,
      }) 
    async createLabel(labelDto: LabelDto){
        const label = await this.labelService.createLabel(labelDto);
        if(label)
            return label;
        throw new HttpException('Label not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({cmd :'getLabelById'})
    async findOneLabel(labelId: string){
        Logger.log('Le label dont l"id est '+labelId,'LabelController');
        const label = await this.labelService.findOneLabel(labelId);
        if(label)
            return label;
        throw new HttpException('Label not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({cmd :'updateLabel'})
    async updateLabel(labelId: string, labelDto: LabelDto){
        const label = await this.labelService.findOneLabel(labelId);
        if(label)
            return await this.labelService.updateLabel(labelId,labelDto);
        throw new HttpException('Label not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({cmd :'deleteLabel'})
    async removeLabel(labelId: string){
        const label = await this.labelService.findOneLabel(labelId);
        if(label)
            return await this.labelService.removeLabel(labelId);
         throw new HttpException('Label not modified',HttpStatus.NOT_FOUND);
    }
}
