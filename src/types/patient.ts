// src/types/patient.ts
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: ValidationError[];
  error?: string;
}

export type ApiResponse<T> =
  | { success: true; data: T; message: string }
  | ApiError;

export interface Patient {
  _id: string;
  nic: string;
  nome: string;
  genero: "Masculino" | "Feminino" | "Outro";
  idade: number;
  documento?: string;
  endereco?: string;
  corEtnia?: string;
  odontograma?: Record<string, any>;
  anotacoesAnatomicas?: string;
  case: {
    _id: string;
    title: string;
  };
  createdBy: {
    _id: string;
    name: string;
  };
  updatedBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PatientsResponse {
  success: boolean;
  data: {
    patients: Patient[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      limit: number;
    };
  };
}

export interface CreatePatientData {
  nic: string;
  nome: string;
  genero: "Masculino" | "Feminino" | "Outro";
  idade: number;
  documento?: string;
  endereco?: string;
  corEtnia?: string;
  odontograma?: Record<string, any>;
  anotacoesAnatomicas?: string;
  caseId: string;
}

export interface UpdatePatientData extends Partial<CreatePatientData> {
  _id: string;
}

export interface FormErrors {
  [key: string]: string;
}
