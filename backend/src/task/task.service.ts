import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>
  ){}

  async findById(id){
    return await this.taskRepo.findOneBy({id:id})
  }

  async findByUserId(userId){
    return await this.taskRepo.findBy({creatorId: userId})
  }

  async createTask(title: string, description: string, duedate: Date, userId: number){
    const newTask = this.taskRepo.create({
      title, description, duedate, creatorId: userId
    })

    return await this.taskRepo.save(newTask)
  }

  async updateTask(id: number, title: string, description: string, duedate: Date, userId: number){
    const oldTask = await this.taskRepo.findOneBy({id})
    if(!oldTask) throw new NotFoundException('Not existing');
    if(oldTask.creatorId !== userId) throw new ForbiddenException('Not owner');
    return await this.taskRepo.update({id}, { title, description, duedate })
  }

  async deleteTask(id: number, userId: number){
    const oldTask = await this.taskRepo.findOneBy({id})
    if(!oldTask) throw new NotFoundException('Not existing');
    if(oldTask.creatorId !== userId) throw new ForbiddenException('Not owner');
    return await this.taskRepo.delete({id: id})
  }
}
