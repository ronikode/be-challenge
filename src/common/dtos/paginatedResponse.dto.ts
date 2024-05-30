import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './paginationDto.dto';

export class PaginatedResponseDto<T> {
  @ApiProperty({
    name: 'paging',
    type: PaginationDto,
    nullable: false,
  })
  paging: PaginationDto;

  @ApiProperty({
    name: 'items',
    isArray: true,
  })
  items: Array<T>;
}
