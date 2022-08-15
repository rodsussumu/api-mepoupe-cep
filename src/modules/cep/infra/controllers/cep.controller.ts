import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CepService } from '../../domain/services/cep.service';
import { CepDto } from '../dto/cep.dto';

@Controller('cep')
export class CepController {
  private logger = new Logger('CepController');
  constructor(private readonly cepService: CepService) {}

  @Post()
  @ApiOperation({ summary: 'Buscar informações no ViaCEP' })
  @ApiResponse({ status: 201, description: 'Busca feita com sucesso' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async post(@Body() cepDto: CepDto) {
    this.logger.verbose(`Buscando cep ${cepDto.cep}`);
    return this.cepService.getDataByCep(cepDto);
  }
}
