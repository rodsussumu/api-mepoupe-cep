import { Module } from '@nestjs/common';
import { CepService } from './domain/services/cep.service';
import { CepController } from './infra/controllers/cep.controller';
import { HttpModule } from '@nestjs/axios';
import { CepApi } from '../../shared/cep.api';

@Module({
  imports: [HttpModule],
  controllers: [CepController],
  providers: [CepService, CepApi],
})
export class CepModule {}
