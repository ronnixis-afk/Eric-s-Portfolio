/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  strategy: string;
  process: ProcessStep[];
  description: string;
}

export interface ProcessStep {
  phase: string;
  details: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  PROJECTS = 'projects',
  PROCESS = 'process',
  ABOUT = 'about',
}
