import type { ComponentType } from 'react';

export type ToolCategory = 'Encode' | 'Generate' | 'Text' | 'Data';

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  keywords: string[];
  icon: string;
  component: ComponentType;
}
