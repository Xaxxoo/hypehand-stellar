import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Gift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  creatorId: string;

  @Column()
  amount: string; // store as string or numeric depending on precision needs

  @Column({ nullable: true })
  memo: string;

  @CreateDateColumn()
  createdAt: Date;
}
