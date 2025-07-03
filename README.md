# TODOIST - MCP

> The MCP Server, for handling projects & tasks with Todoist API.

## Installation

The server requires the following environment variable:

- **TODOIST_API_TOKEN (required)**: Your Todoist API Key.

> To get your API_TOKEN you can folow [here](https://www.todoist.com/help/articles/find-your-api-token-Jpzx9IIlB)

Install the package globally with npm

```bash
npm install -g mcp-todoist
```

## Claude Desktop Configuration

To use this MCP server with Claude desktop:

1. Create the MCP config file **claude_desktop_config.json**:
> For MacOS: Use ~/Library/Application Support/Claude/claude_desktop_config.json

> For Windows: Use %APPDATA%/Claude/claude_desktop_config.json

Example `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "todoist": {
      "command": "mcp-todoist",
      "env": {
        "TODOIST_API_TOKEN": "***"
      }
    }
  }
}
```
For more information regarding adding to Claude Desktop, you can look [here](https://modelcontextprotocol.io/quickstart/user)

## Featues

### ***get-tasks*** tool

This server provides ***get-tasks*** tool to search all the tasks from all your Todoist projects.

## Project Plan

- [x] Base MCP Server
- [x] Wrapper for getting tasks
- [x] Add MCP inspector
- [x] Publish npm package
- [x] Add github action for npm registry publish automation
- [x] Add Server to claude
- [ ] Wrapper for getting projects
- [ ] Wrapper for adding tasks to predefiend projects
- [ ] Wrapper for adding tasks to any project
- [ ] Wrapper for marking a task complete
