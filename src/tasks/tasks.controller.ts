import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTask(@Query() filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTaskWithFilters(filterDto);
        } else {
            return this.taskService.getAllTasks();

        }
        
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ): Task {
        return this.taskService.updateTaskStatus(id, status);


    }
}
