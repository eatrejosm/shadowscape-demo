import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task{
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '', nullable: false })
  title: string;

  @Column()
  description: string;

  @Column()
  duedate: Date;

  @Column({ nullable: false })
  creatorId: number;

}