import { IsString, IsNotEmpty } from 'class-validator';

export class CepDto {
  @IsNotEmpty()
  @IsString()
  cep: string;
}
