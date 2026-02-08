
export interface OmniGrowData {
  name: string;
  description: string;
  unified_dimension_focus?: string;
  original_app_feature?: string;
  children?: OmniGrowData[];
}

export interface D3Node {
  id: string;
  name: string;
  description: string;
  unified_dimension_focus?: string;
  original_app_feature?: string;
  depth: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface D3Link {
  source: string | D3Node;
  target: string | D3Node;
}
