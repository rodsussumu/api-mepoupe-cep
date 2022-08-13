import { CepDto } from './cep.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('CepDto', () => {
  it('should create correctly dto', () => {
    const expectedDto = { cep: '09551010' };
    const cepDto = new CepDto();
    cepDto.cep = '09551010';
    expect(cepDto).toEqual(expectedDto);
  });

  it('should throw when parameter is empty', async () => {
    const dtoToCreate = { cep: '' };
    const cepDto = plainToInstance(CepDto, dtoToCreate);
    const errors = await validate(cepDto);
    expect(errors.length).not.toBe(0);
    expect(errors[0].constraints.isNotEmpty).toEqual('cep should not be empty');
  });
});
