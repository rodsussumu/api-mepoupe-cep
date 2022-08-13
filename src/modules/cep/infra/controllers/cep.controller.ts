import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CepService } from '../../domain/services/cep.service';
import { CepDto } from '../dto/cep.dto';

@Controller('cep')
export class CepController {
  private logger = new Logger('CepController');
  constructor(private readonly cepService: CepService) {}

  @Post()
  async post(@Body() cepDto: CepDto) {
    this.logger.verbose(`Buscando cep ${cepDto.cep}`);
    return this.cepService.getDataByCep(cepDto);
  }
}
