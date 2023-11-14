import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>
  ){}

  async findOne(username: string) {
    return await this.usersRepo.findOneBy({ username });
  }

  async createUser(data:{username:string, password:string}){
    const user = await this.usersRepo.findOneBy({username:data.username})
    if(user) throw new ConflictException('The username is already exists')

    const newUser = await this.usersRepo.create({
      ...data
    })

    return await this.usersRepo.save(newUser)
  }


}