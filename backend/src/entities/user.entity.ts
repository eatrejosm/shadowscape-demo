import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '', nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

}