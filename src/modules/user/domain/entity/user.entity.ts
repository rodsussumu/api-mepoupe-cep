import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ width: 8 })
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  cidade: string;

  @Column({ width: 2 })
  estado: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
