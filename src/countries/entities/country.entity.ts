import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  alpha3Code!: string;

  @Column()
  name!: string;

  @Column()
  region!: string;

  @Column()
  capital!: string;

  @Column('bigint')
  population!: number;

  @Column()
  flagUrl!: string;
}