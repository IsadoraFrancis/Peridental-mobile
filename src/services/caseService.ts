// src/services/caseService.ts
import api from "./api";
import {
  Case,
  CasesResponse,
  CreateCaseData,
  AddEvidenceData,
  AddReportData,
} from "../types/case";

export const caseService = {
  // Métodos existentes
  async getCases(page = 1, limit = 10): Promise<CasesResponse> {
    const response = await api.get(`/api/cases?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getCaseById(id: string): Promise<Case> {
    const response = await api.get(`/api/cases/${id}`);
    return response.data.data;
  },

  async createCase(caseData: CreateCaseData): Promise<Case> {
    const response = await api.post("/api/cases", caseData);
    return response.data.data;
  },

  async addEvidence(evidenceData: AddEvidenceData): Promise<any> {
    try {
      console.log("Dados da evidência antes de enviar:", {
        caseId: evidenceData.caseId,
        type: evidenceData.type,
        content: evidenceData.content,
        file: evidenceData.file
          ? {
              name: evidenceData.file.name,
              type: evidenceData.file.type,
            }
          : null,
      });

      const formData = new FormData();

      // Adiciona campos básicos
      formData.append("caseId", evidenceData.caseId);
      formData.append("type", evidenceData.type);
      if (evidenceData.content)
        formData.append("content", evidenceData.content);
      if (evidenceData.annotations)
        formData.append(
          "annotations",
          JSON.stringify(evidenceData.annotations)
        );
      if (evidenceData.address)
        formData.append("address", evidenceData.address);

      // Adiciona localização se disponível
      if (evidenceData.location) {
        formData.append("latitude", evidenceData.location.latitude.toString());
        formData.append(
          "longitude",
          evidenceData.location.longitude.toString()
        );
      }

      // Adiciona arquivo se disponível
      if (evidenceData.file) {
        formData.append("files", {
          uri: evidenceData.file.uri,
          type: evidenceData.file.type,
          name: evidenceData.file.name,
        } as any);
      }

      console.log("FormData montado:", {
        caseId: formData.get("caseId"),
        type: formData.get("type"),
        content: formData.get("content"),
        hasFile: formData.has("files"),
      });

      const response = await api.post("/api/evidences", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Erro detalhado:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  async addReport(reportData: AddReportData): Promise<any> {
    const formData = new FormData();

    // Adiciona campos básicos
    formData.append("case", reportData.case);
    formData.append("title", reportData.title);
    formData.append("type", reportData.type);
    formData.append("content", reportData.content);
    if (reportData.status) formData.append("status", reportData.status);

    // Adiciona arquivo se disponível
    if (reportData.file) {
      formData.append("file", {
        uri: reportData.file.uri,
        type: reportData.file.type,
        name: reportData.file.name,
      } as any);
    }

    const response = await api.post("/api/reports", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async updateCaseStatus(
    id: string,
    status: "em_andamento" | "finalizado" | "arquivado"
  ): Promise<Case> {
    const response = await api.put(`/api/cases/${id}/status`, { status });
    return response.data.data;
  },

  async deleteCase(id: string): Promise<void> {
    await api.delete(`/api/cases/${id}`);
  },
};
