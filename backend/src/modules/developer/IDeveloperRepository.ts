import { IDeveloperModel } from "./DeveloperModel";

export interface IDeveloperRepository {
  findAll(): Promise<IDeveloperModel[]>;
  findById(id: string): Promise<IDeveloperModel | null>;
  findByEmail(email: string): Promise<IDeveloperModel | null>;
  create(developerData: Partial<IDeveloperModel>): Promise<IDeveloperModel>;
  update(
    id: string,
    developerData: Partial<IDeveloperModel>
  ): Promise<IDeveloperModel | null>;
  delete(id: string): Promise<boolean>;
}
