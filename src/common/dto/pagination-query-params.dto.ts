import { IsBooleanString, IsIn, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryParams {
  @ApiProperty({ required: false, default: process.env.PAGE_NUMBER, minimum: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  page_number: number;

  @ApiProperty({ required: false, default: process.env.PAGE_SIZE, minimum: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  page_size: number;

  @ApiProperty({
    required: false,
    enum: [ 'active','inactive','all'],
  })
  @IsIn([ 'active','inactive','all'])
  @IsOptional()
  state:  string;

  // @ApiProperty({
  //   required: false,
  //   enum: [ ],
  // })
  // @IsIn([ ])
  // @IsOptional()
  // order:  string;

}
