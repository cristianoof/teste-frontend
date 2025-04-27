import DeveloperModel, { IDeveloperModel } from "./DeveloperModel";
import { IDeveloperRepository } from "./IDeveloperRepository";

class _DeveloperRepository implements IDeveloperRepository {
  async findAll(): Promise<IDeveloperModel[]> {
    return await DeveloperModel.find();
  }

  async findById(id: string): Promise<IDeveloperModel | null> {
    return await DeveloperModel.findById(id);
  }

  async findByEmail(email: string): Promise<IDeveloperModel | null> {
    return await DeveloperModel.findOne({ email });
  }

  async create(
    developerData: Partial<IDeveloperModel>
  ): Promise<IDeveloperModel> {
    const developer = new DeveloperModel(developerData);
    return await developer.save();
  }

  async update(
    id: string,
    developerData: Partial<IDeveloperModel>
  ): Promise<IDeveloperModel | null> {
    return await DeveloperModel.findByIdAndUpdate(
      id,
      { ...developerData },
      { new: true, runValidators: true }
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await DeveloperModel.findByIdAndDelete(id);
    return !!result;
  }
}

export const DeveloperRepository = new _DeveloperRepository();
