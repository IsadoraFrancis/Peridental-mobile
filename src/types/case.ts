// src/types/case.ts
export interface Case {
  _id: string;
  title: string;
  description: string;
  type: "acidente" | "identificacao" | "criminal";
  status: "em_andamento" | "finalizado" | "arquivado";
  responsible: {
    _id: string;
    name: string;
    email: string;
  };
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  patients: Array<{
    _id: string;
    nome: string;
    nic: string;
  }>;
  data: string;
  historico?: string;
  analises?: string;
  evidences: Array<Evidence>;
  reports: Array<Report>;
  createdAt: string;
  updatedAt: string;
}

export interface CasesResponse {
  message: string;
  data: {
    cases: Case[];
    pagination: {
      total: number;
      pages: number;
      currentPage: number;
      limit: number;
    };
  };
}

export interface Evidence {
  _id: string;
  caseId: string;
  type: "imagem" | "texto";
  filePaths: string[];
  content: string;
  annotations: string[];
  uploadedBy: {
    _id: string;
    name: string;
    email: string;
  };
  location?: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  _id: string;
  case: string;
  title: string;
  type: "laudo_pericial" | "relatorio_tecnico" | "parecer_odontologico";
  content: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  status: "rascunho" | "finalizado" | "arquivado";
  attachments: Array<{
    filename: string;
    path: string;
    uploadedAt: string;
  }>;
  pdfPath?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCaseData {
  title: string;
  description: string;
  type: "acidente" | "identificacao" | "criminal";
  status?: "em_andamento" | "finalizado" | "arquivado";
  data: Date;
  historico?: string;
  analises?: string;
}

export interface AddEvidenceData {
  caseId: string;
  type: "imagem" | "texto";
  content?: string;
  annotations?: string[];
  file?: {
    uri: string;
    type: string;
    name: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  address?: string;
}

export interface AddReportData {
  case: string;
  title: string;
  type: "laudo_pericial" | "relatorio_tecnico" | "parecer_odontologico";
  content: string;
  status?: "rascunho" | "finalizado" | "arquivado";
  file?: {
    uri: string;
    type: string;
    name: string;
  };
}
