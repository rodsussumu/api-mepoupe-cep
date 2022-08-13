import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Injectable()
export class CepApi {
  constructor(private readonly httpService: HttpService) {}
  async get(cep: string): Promise<CepResponse> {
    cep = cep.replace(/\D/g, '');
    const validaCep = /^[0-9]{8}$/;
    if (!validaCep.test(cep))
      throw new HttpException('CEP invalido', HttpStatus.BAD_REQUEST);
    const url = `https://viacep.com.br/ws/${cep}/json`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
