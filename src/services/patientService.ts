// src/services/patientService.ts
import api from "./api";
import {
  Patient,
  PatientsResponse,
  CreatePatientData,
  UpdatePatientData,
  ApiResponse,
  ValidationError,
} from "../types/patient";

export const patientService = {
  async getPatients(
    page = 1,
    limit = 10
  ): Promise<ApiResponse<PatientsResponse>> {
    try {
      const response = await api.get(
        `/api/patients?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao buscar pacientes",
        error: error.message,
        errors: error.response?.data?.errors,
      };
    }
  },

  async getPatientById(id: string): Promise<ApiResponse<Patient>> {
    try {
      const response = await api.get(`/api/patients/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao buscar paciente",
        error: error.message,
        errors: error.response?.data?.errors,
      };
    }
  },

  async getPatientsByCase(caseId: string): Promise<ApiResponse<Patient[]>> {
    try {
      const response = await api.get(`/api/patients/case/${caseId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Erro ao buscar pacientes do caso",
        error: error.message,
        errors: error.response?.data?.errors,
      };
    }
  },

  async createPatient(
    patientData: CreatePatientData
  ): Promise<ApiResponse<Patient>> {
    try {
      const response = await api.post("/api/patients", patientData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao criar paciente",
        error: error.message,
        errors: error.response?.data?.errors,
      };
    }
  },

  async updatePatient(
    patientData: UpdatePatientData
  ): Promise<ApiResponse<Patient>> {
    try {
      const { _id, ...data } = patientData;
      const response = await api.put(`/api/patients/${_id}`, data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao atualizar paciente",
        error: error.message,
        errors: error.response?.data?.errors,
      };
    }
  },

  async deletePatient(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.delete(`/api/patients/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao deletar paciente",
        error: error.message,
        errors: error.response?.data?.errors,
      };
    }
  },
};
