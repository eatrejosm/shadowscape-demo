import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService){}

  @Get('id')
  async findOneById(@Query() param:{id: number}){
    return this.taskService.findById(param.id)
  }
  
  @Get()
  async findAllByCreator(@Req() request){
    const userId = request.user.sub;
    return await this.taskService.findByUserId(userId)
  }

  @Post()
  async createTask(@Req() req, @Body() body: TaskDto){
    const userId = req.user.sub;
    return await this.taskService.createTask(body.title, body.description, body.duedate, userId);
  }

  @Put()
  async updateTask(@Req() req, @Body() body: TaskDto){
    const userId = req.user.sub;
    return await this.taskService.updateTask(body.id, body.title, body.description, body.duedate, userId)
  }

  @Delete()
  async deleteTask(@Req() req, @Query() param:{id: number}){
    const userId = req.user.sub;
    return await this.taskService.deleteTask(param.id, userId)
  }

}
