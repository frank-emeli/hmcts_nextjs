export class Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    status: string,
    dueDate: Date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.dueDate = dueDate;
  }

  static fromJson(json: any): Task {
    return new Task(
      json.id,
      json.title,
      json.description,
      json.status,
      new Date(json.dueDate)
    );
  }

  toJson(): any {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      dueDate: this.dueDate.toISOString(),
    };
  }

  static fromJsonArray(jsonArray: any[]): Task[] {
    return jsonArray.map((json) => Task.fromJson(json));
  }

  toJsonArray(tasks: Task[]): any[] {
    return tasks.map((task) => task.toJson());
  }
}
