import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cep: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  logradouro: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numero: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  complemento: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cidade: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  estado: string;
}
