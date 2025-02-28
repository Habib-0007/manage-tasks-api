export interface TaskDTO {
  id?: number;
  title: string;
  description?: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}
