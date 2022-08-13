import { Injectable, Logger } from '@nestjs/common';
import { CepRequest } from '../interfaces/cep-request.interface';
import { CepApi } from '../../../../shared/cep.api';
import { CepResponse } from '../interfaces/cep-response.interface';

@Injectable()
export class CepService {
  private logger = new Logger('CepService');
  constructor(private readonly cepApi: CepApi) {}

  async getDataByCep(cepRequest: CepRequest): Promise<CepResponse> {
    const data = await this.cepApi.get(cepRequest.cep);
    if (!data.bairro) {
      this.logger.log(`Bairro não encontrado`);
      return { message: 'Bairro não encontrado', data: data };
    } else {
      this.logger.log(`Endereço encontrado ${data.bairro}`);
      return { message: 'Endereço encontrado', data: data };
    }
  }
}
