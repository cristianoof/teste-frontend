import { IDeveloperModel } from "./DeveloperModel";

export interface IDeveloperService {
  getAllDevelopers(): Promise<IDeveloperModel[]>;
  getDeveloperById(id: string): Promise<IDeveloperModel>;
  createDeveloper(
    developerData: Partial<IDeveloperModel>
  ): Promise<IDeveloperModel>;
  updateDeveloper(
    id: string,
    developerData: Partial<IDeveloperModel>
  ): Promise<IDeveloperModel>;
  deleteDeveloper(id: string): Promise<void>;
}
