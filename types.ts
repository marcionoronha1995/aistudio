
export interface PythonFile {
  name: string;
  content: string;
  description: string;
}

export interface ProjectData {
  files: PythonFile[];
  documentation: string;
  mentalMap: {
    nodes: Array<{ id: string; label: string; type: string }>;
    links: Array<{ source: string; target: string }>;
  };
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  READY = 'READY',
  ERROR = 'ERROR'
}
