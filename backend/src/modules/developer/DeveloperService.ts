import { HttpStatusEnum } from "../../shared/enums/HttpStatusEnum";
import { HttpError } from "../../shared/errors/HttpError";
import { IDeveloperModel } from "./DeveloperModel";
import { DeveloperRepository } from "./DeveloperRepository";
import { IDeveloperRepository } from "./IDeveloperRepository";
import { IDeveloperService } from "./IDeveloperService";

class _DeveloperService implements IDeveloperService {
  constructor(readonly developerRepository: IDeveloperRepository) {}

  async getAllDevelopers(): Promise<IDeveloperModel[]> {
    return await this.developerRepository.findAll();
  }

  async getDeveloperById(id: string): Promise<IDeveloperModel> {
    const developer = await this.developerRepository.findById(id);

    if (!developer) {
      throw new HttpError(
        "Desenvolvedor não encontrado.",
        HttpStatusEnum.NOT_FOUND
      );
    }

    return developer;
  }

  async createDeveloper(
    developerData: Partial<IDeveloperModel>
  ): Promise<IDeveloperModel> {
    if (developerData.email) {
      const existingDeveloper = await this.developerRepository.findByEmail(
        developerData.email
      );

      if (existingDeveloper) {
        throw new HttpError("Email já está em uso.", HttpStatusEnum.CONFLICT);
      }
    }

    return await this.developerRepository.create(developerData);
  }

  async updateDeveloper(
    id: string,
    developerData: Partial<IDeveloperModel>
  ): Promise<IDeveloperModel> {
    const developer = await this.developerRepository.findById(id);
    if (!developer) {
      throw new HttpError(
        "Desenvolvedor não encontrado.",
        HttpStatusEnum.NOT_FOUND
      );
    }

    if (developerData.email && developerData.email !== developer.email) {
      const existingDeveloper = await this.developerRepository.findByEmail(
        developerData.email
      );

      if (existingDeveloper && existingDeveloper.id !== id) {
        throw new HttpError("Email já está em uso.", HttpStatusEnum.CONFLICT);
      }
    }

    const updatedDeveloper = await this.developerRepository.update(
      id,
      developerData
    );
    if (!updatedDeveloper) {
      throw new HttpError(
        "Falha ao atualizar desenvolvedor.",
        HttpStatusEnum.INTERNAL_SERVER_ERROR
      );
    }

    return updatedDeveloper;
  }

  async deleteDeveloper(id: string): Promise<void> {
    const deleted = await this.developerRepository.delete(id);
    if (!deleted) {
      throw new HttpError(
        "Desenvolvedor não encontrado ou já foi deletado.",
        HttpStatusEnum.NOT_FOUND
      );
    }
  }
}

export const DeveloperService = new _DeveloperService(DeveloperRepository);
