import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CepDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cep: string;
}
