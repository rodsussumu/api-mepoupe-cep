import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cep: string;

  @IsNotEmpty()
  @IsString()
  logradouro: string;

  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsString()
  complemento: string;

  @IsNotEmpty()
  @IsString()
  cidade: string;

  @IsNotEmpty()
  @IsString()
  estado: string;
}
