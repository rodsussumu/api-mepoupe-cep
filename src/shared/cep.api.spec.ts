import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CepApi } from './cep.api';
import { of } from 'rxjs';
import { BadRequestException, HttpException } from '@nestjs/common';

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

describe('CepApi', () => {
  let cepApi: CepApi;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CepApi,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    cepApi = module.get<CepApi>(CepApi);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(cepApi).toBeDefined();
  });

  describe('get', () => {
    it('should get data by cep', async () => {
      const body = '09551-010';

      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          status: 200,
          statusText: 'OK',
          config: {},
          headers: {},
          data: resolvedValue,
        }),
      );

      const result = await cepApi.get(body);
      // Assert
      expect(result).toBeTruthy();
      expect(httpService.get).toBeCalledTimes(1);
    });

    it('should throw error when cep is invalid', async () => {
      const body = '09551-01';

      jest.spyOn(httpService, 'get').mockReturnValue(null);

      try {
        await cepApi.get(body);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
