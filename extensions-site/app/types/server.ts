export interface MCPServer {
  id: string;
  name: string;
  description: string;
  command: string;
  link: string;
  installation_notes: string;
  is_extension: boolean;
  endorsed: boolean
  githubStars: number;
  environmentVariables: {
    name: string;
    description: string;
    required: boolean;
  }[];
}