import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CepService } from '../../domain/services/cep.service';
import { CepController } from './cep.controller';

const resolvedValue = {
  message: 'Endereço encontrado',
  data: {
    cep: '09551-010',
    logradouro: 'Rua Oriente',
    complemento: '',
    bairro: 'Barcelona',
    localidade: 'São Caetano do Sul',
    uf: 'SP',
    ibge: '3548807',
    gia: '6361',
    ddd: '11',
    siafi: '7077',
  },
};

describe('CepController', () => {
  let controller: CepController;
  let service: CepService;

  beforeEach(async () => {
    Logger.prototype.log = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CepController],
      providers: [
        {
          provide: CepService,
          useValue: {
            getDataByCep: jest.fn().mockResolvedValue(resolvedValue),
          },
        },
      ],
    }).compile();

    controller = module.get<CepController>(CepController);
    service = module.get<CepService>(CepService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be return correct data when parameters are valid', async () => {
    const body = {
      cep: '09551-010',
    };

    const expectedValue = {
      message: 'Endereço encontrado',
      data: {
        cep: '09551-010',
        logradouro: 'Rua Oriente',
        complemento: '',
        bairro: 'Barcelona',
        localidade: 'São Caetano do Sul',
        uf: 'SP',
        ibge: '3548807',
        gia: '6361',
        ddd: '11',
        siafi: '7077',
      },
    };
    const result = await controller.post(body);
    expect(Logger.prototype.log).toHaveBeenCalled();
    expect(result).toEqual(expectedValue);
  });
});
