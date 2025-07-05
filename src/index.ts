import { McpServer, ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { TodoistApi } from '@doist/todoist-api-typescript'
import { TaskDB } from "./lib/TasksDB";
import z from "zod";

const GetProjectIDToolSchema = z.object({
  name: z.string().describe("The name of the project")
})

const AddTaskToolSchema = z.object({
  project_id: z.string().optional().describe("Project Id where the task needs to be added."),
  content: z.string().describe("Content for the task")
})

const server = new McpServer({
  name: "todoist",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});
const api = new TodoistApi(process.env.TODOIST_API_TOKEN!);
const tasksDB = new TaskDB(api)

server.tool(
  "get-tasks",
  "Get all the tasks from Todoist",
  {},
  tasksDB.getTasks
)

server.tool(
  "get-projects",
  "Get all the projects from Todoist",
  {},
  tasksDB.getProjects
)

server.tool(
  "get-project-id",
  "Get the id of the project from Todoist",
  GetProjectIDToolSchema.shape,
  tasksDB.getProjectId
)

server.tool(
  "add-task-to-project",
  "Add task to a specific Project in Todoist",
  AddTaskToolSchema.shape,
  tasksDB.addTaskToProject
)

server.tool(
  "add-task-to-any-project",
  "Add task to a any Project in Todoist",
  AddTaskToolSchema.shape,
  tasksDB.addTask
)



async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});