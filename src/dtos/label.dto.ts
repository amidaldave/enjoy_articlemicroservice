import { ApiProperty } from "@nestjs/swagger";

export class LabelDto {
      
    @ApiProperty()
    labeltitle: string;
   
    @ApiProperty()
    labelDescription: string;

}