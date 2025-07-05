import { TodoistApi } from "@doist/todoist-api-typescript";
import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp";
import z from "zod";

const GetProjectIDToolSchema = z.object({
  name: z.string().describe("The name of the project")
})

const AddTaskToolSchema = z.object({
  project_id: z.string().optional().describe("Project Id where the task needs to be added."),
  content: z.string().describe("Content for the task")
})

export class TaskDB {


  public constructor(private api: TodoistApi) { }

  public getTasks: ToolCallback<{}> = async () => {
    const { results } = await this.api.getTasks()
    const tasks = results.map(result => result.content)
    return {
      content: [
        {
          type: "text",
          text: tasks.join(", "),
        },
      ],
    };
  }

  public getProjects: ToolCallback<{}> = async () => {
    const { results } = await this.api.getProjects()
    const projects = results.map(result => result.name)
    return {
      content: [
        {
          type: "text",
          text: projects.join(", "),
        },
      ],
    };
  }

  public getProjectId: ToolCallback<typeof GetProjectIDToolSchema.shape> = async ({ name }) => {
    const { results } = await this.api.getProjects()
    const project = results.filter(result => result.name === name)
    return {
      content: [
        {
          type: "text",
          text: project[0].id,
        },
      ],
    };
  }

  public addTask: ToolCallback<typeof AddTaskToolSchema.shape> = async ({ content }) => {
    await this.api.addTask({
      content: content,
    })
    return {
      content: [
        {
          type: "text",
          text: "Task added successfully...",
        },
      ],
    };
  }

  public addTaskToProject: ToolCallback<typeof AddTaskToolSchema.shape> = async ({ project_id, content }) => {
    await this.api.addTask({
      content: content,
      projectId: project_id
    })
    return {
      content: [
        {
          type: "text",
          text: "Task added successfully...",
        },
      ],
    };
  }
  
}