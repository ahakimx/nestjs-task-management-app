import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;

        const query = this.createQueryBuilder('task');

        if(status) {
            query.andWhere('task.status = :status', { status })
        }

        if(search){
            query.andWhere(
                'LOWER (task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                { search: `%${search}%` },
            );
        }

        const tasks = await query.getMany();
        return tasks;
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