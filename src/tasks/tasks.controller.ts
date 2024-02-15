import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    // @Get()
    // getTask(@Query() filterDto: GetTaskFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.taskService.getTaskWithFilters(filterDto);
    //     } else {
    //         return this.taskService.getAllTasks();

    //     }
        
    // }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.taskService.getTaskById(id);
    // }

    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.taskService.createTask(createTaskDto)
    // }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void {
    //     return this.taskService.deleteTask(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    // ): Task {
    //     const { status } = updateTaskStatusDto;
    //     return this.taskService.updateTaskStatus(id, status);
    // }
}
