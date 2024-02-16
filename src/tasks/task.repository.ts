import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async createTask(this: Repository<Task>, createTaskDto: CreateTaskDto) {
        const { title, description } = createTaskDto;
        const task = this.create({
          title,
          description,
          status: TaskStatus.OPEN,
        });
    
        await this.save(task);
        return task;
      }

}