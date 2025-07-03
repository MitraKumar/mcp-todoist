import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { TodoistApi } from '@doist/todoist-api-typescript'

const server = new McpServer({
  name: "todoist",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});
const api = new TodoistApi(process.env.TODOIST_API_TOKEN!);

server.tool(
  "get-tasks",
  "Get all the tasks from Todoist",
  {},
  async () => {
    const { results } = await api.getTasks();
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
)

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});