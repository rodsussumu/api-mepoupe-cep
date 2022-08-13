import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../../domain/entity/user.entity';
import { UserService } from '../../domain/services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserController } from './user.controller';

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

const newUser = {
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
};

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

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userList),
            create: jest.fn().mockResolvedValue(newUser),
            findById: jest.fn().mockResolvedValue(userList[0]),
            update: jest.fn().mockResolvedValue(updatedUser),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('index', () => {
    it('should return a todo list entity successfully', async () => {
      // Act
      const result = await controller.index();

      // Assert
      expect(result).toEqual(userList);
      expect(typeof result).toEqual('object');
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.index()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new todo item successfully', async () => {
      // Arrange
      const body: CreateUserDto = {
        nome: 'Rodrigo',
        cep: '09551-010',
        logradouro: 'Rua teste',
        numero: '121',
        complemento: 'Casa 2',
        cidade: 'São Caetano do Sul',
        estado: 'SP',
      };

      // Act
      const result = await controller.create(body);

      // Assert
      expect(result).toEqual(newUser);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: CreateUserDto = {
        nome: 'Rodrigo',
        cep: '09551-010',
        logradouro: 'Rua teste',
        numero: '121',
        complemento: 'Casa 2',
        cidade: 'São Caetano do Sul',
        estado: 'SP',
      };

      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.create(body)).rejects.toThrowError();
    });
  });

  describe('show', () => {
    it('should get a todo item successfully', async () => {
      // Act
      const result = await controller.show(
        '844371ff-262d-43d9-8764-ef8ff42acceb',
      );

      // Assert
      expect(result).toEqual(userList[0]);
      expect(service.findById).toHaveBeenCalledTimes(1);
      expect(service.findById).toHaveBeenCalledWith(
        '844371ff-262d-43d9-8764-ef8ff42acceb',
      );
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(service, 'findById').mockRejectedValueOnce(new Error());

      // Assert
      expect(
        controller.show('844371ff-262d-43d9-8764-ef8ff42acceb'),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a todo item successfully', async () => {
      // Arrange
      const body: UpdateUserDto = {
        nome: 'Rodrigo update',
        cep: '09551-010',
        logradouro: 'Rua teste',
        numero: '121',
        complemento: 'Casa 2',
        cidade: 'São Caetano do Sul',
        estado: 'SP',
      };

      // Act
      const result = await controller.update(
        '844371ff-262d-43d9-8764-ef8ff42acceb',
        body,
      );

      // Assert
      expect(result).toEqual(updatedUser);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(
        '844371ff-262d-43d9-8764-ef8ff42acceb',
        body,
      );
    });

    it('should throw an exception', () => {
      // Arrange
      const body: UpdateUserDto = {
        nome: 'Rodrigo update',
        cep: '09551-010',
        logradouro: 'Rua teste',
        numero: '121',
        complemento: 'Casa 2',
        cidade: 'São Caetano do Sul',
        estado: 'SP',
      };

      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(
        controller.update('844371ff-262d-43d9-8764-ef8ff42acceb', body),
      ).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should remove a todo item successfully', async () => {
      // Act
      const result = await controller.delete(
        '844371ff-262d-43d9-8764-ef8ff42acceb',
      );

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(service, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(
        controller.delete('844371ff-262d-43d9-8764-ef8ff42acceb'),
      ).rejects.toThrowError();
    });
  });
});
