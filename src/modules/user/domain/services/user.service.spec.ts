import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../infra/dtos/create-user.dto';
import { UpdateUserDto } from '../../infra/dtos/update-user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserService } from './user.service';

const userList: UserEntity[] = [
  {
    id: '844371ff-262d-43d9-8764-ef8ff42acceb',
    nome: 'Rodrigo',
    cep: '09551-010',
    logradouro: 'Rua teste',
    numero: '121',
    complemento: 'Casa 2',
    cidade: 'São Caetano do Sul',
    estado: 'SP',
    created_at: '2022-08-13T09:04:30.598Z',
    updated_at: '2022-08-13T09:06:13.000Z',
  },
  {
    id: '89a65dbc-b29b-4c53-8459-406f3c15ca9e',
    nome: 'Rodrigo',
    cep: '09551-010',
    logradouro: 'Rua teste',
    numero: '121',
    complemento: 'Casa 2',
    cidade: 'São Caetano do Sul',
    estado: 'SP',
    created_at: '2022-08-13T09:14:19.747Z',
    updated_at: '2022-08-13T09:14:19.747Z',
  },
];

const updatedUser = {
  id: '844371ff-262d-43d9-8764-ef8ff42acceb',
  nome: 'Rodrigo teste',
  cep: '09551-010',
  logradouro: 'Rua teste',
  numero: '121',
  complemento: 'Casa 2',
  cidade: 'São Caetano do Sul',
  estado: 'SP',
  created_at: '2022-08-13T09:04:30.598Z',
  updated_at: '2022-08-13T09:06:13.000Z',
};

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(userList),
            findOneOrFail: jest.fn().mockResolvedValue(userList[0]),
            create: jest.fn().mockReturnValue(userList[0]),
            merge: jest.fn().mockReturnValue(updatedUser),
            save: jest.fn().mockResolvedValue(userList[0]),
            delete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a user list', async () => {
      const result = await service.findAll();

      expect(result).toEqual(userList);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());
      expect(service.findAll()).rejects.toThrowError();
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const result = await service.findById(
        '844371ff-262d-43d9-8764-ef8ff42acceb',
      );

      expect(result).toEqual(userList[0]);
      expect(repository.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(
        service.findById('844371ff-262d-43d9-8764-ef8ff42acceb'),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const data: CreateUserDto = {
        nome: 'Rodrigo',
        cep: '09551-010',
        logradouro: 'Rua teste',
        numero: '121',
        complemento: 'Casa 2',
        cidade: 'São Caetano do Sul',
        estado: 'SP',
      };

      const result = await service.create(data);

      expect(result).toEqual(userList[0]);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      const data: CreateUserDto = {
        nome: 'Rodrigo',
        cep: '09551-010',
        logradouro: 'Rua teste',
        numero: '121',
        complemento: 'Casa 2',
        cidade: 'São Caetano do Sul',
        estado: 'SP',
      };

      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      expect(service.create(data)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const data: UpdateUserDto = {
        nome: 'Rodrigo update',
        cep: '09551-010',
        logradouro: 'Rua teste',
        numero: '121',
        complemento: 'Casa 2',
        cidade: 'São Caetano do Sul',
        estado: 'SP',
      };

      jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedUser);

      const result = await service.update(
        '844371ff-262d-43d9-8764-ef8ff42acceb',
        data,
      );

      expect(result).toEqual(updatedUser);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      const data: UpdateUserDto = {
        nome: 'Rodrigo update',
        cep: '09551-010',
        logradouro: 'Rua teste',
        numero: '121',
        complemento: 'Casa 2',
        cidade: 'São Caetano do Sul',
        estado: 'SP',
      };

      expect(
        service.update('844371ff-262d-43d9-8764-ef8ff42acceb', data),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      const data: UpdateUserDto = {
        nome: 'Rodrigo update',
        cep: '09551-010',
        logradouro: 'Rua teste',
        numero: '121',
        complemento: 'Casa 2',
        cidade: 'São Caetano do Sul',
        estado: 'SP',
      };

      expect(
        service.update('844371ff-262d-43d9-8764-ef8ff42acceb', data),
      ).rejects.toThrowError();
    });
  });

  describe('deleteById', () => {
    it('should delete a user', async () => {
      const result = await service.delete(
        '844371ff-262d-43d9-8764-ef8ff42acceb',
      );

      expect(result).toBeUndefined();
      expect(repository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(
        service.delete('844371ff-262d-43d9-8764-ef8ff42acceb'),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'delete').mockRejectedValueOnce(new Error());

      expect(
        service.delete('844371ff-262d-43d9-8764-ef8ff42acceb'),
      ).rejects.toThrowError();
    });
  });
});
