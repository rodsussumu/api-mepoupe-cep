import { Test, TestingModule } from '@nestjs/testing';
import { CepApi } from '../../../../shared/cep.api';
import { CepService } from './cep.service';

const resolvedValue = {
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
};

const resolvedValueDistrictNotFound = {
  cep: '18150-000',
  logradouro: '',
  complemento: '',
  bairro: '',
  localidade: 'Ibiúna',
  uf: 'SP',
  ibge: '3519709',
  gia: '3451',
  ddd: '15',
  siafi: '6495',
};

describe('CepService', () => {
  let service: CepService;
  let cepApi: CepApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CepService,
        {
          provide: CepApi,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CepService>(CepService);
    cepApi = module.get<CepApi>(CepApi);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cepApi).toBeDefined();
  });

  it('should be return data when district is found', async () => {
    const body = {
      cep: '09551010',
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

    jest.spyOn(cepApi, 'get').mockResolvedValue(resolvedValue);
    const result = await service.getDataByCep(body);
    expect(result).toEqual(expectedValue);
    expect(result.message).toBe('Endereço encontrado');
  });

  it('should be return data without when district not found', async () => {
    const body = {
      cep: '18150000',
    };

    const expectedValue = {
      message: 'Bairro não encontrado',
      data: {
        cep: '18150-000',
        logradouro: '',
        complemento: '',
        bairro: '',
        localidade: 'Ibiúna',
        uf: 'SP',
        ibge: '3519709',
        gia: '3451',
        ddd: '15',
        siafi: '6495',
      },
    };

    jest.spyOn(cepApi, 'get').mockResolvedValue(resolvedValueDistrictNotFound);
    const result = await service.getDataByCep(body);
    expect(result).toEqual(expectedValue);
    expect(result.message).toBe('Bairro não encontrado');
  });
});
