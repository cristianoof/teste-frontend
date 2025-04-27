import { Request, Response } from "express";
import { HttpStatusEnum } from "../../shared/enums/HttpStatusEnum";
import { asyncHandler } from "../../shared/utils/async-handler";
import { DeveloperService } from "./DeveloperService";
import { IDeveloperService } from "./IDeveloperService";

class _DeveloperController {
  constructor(readonly developerService: IDeveloperService) {}

  getAllDevelopers = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const developers = await this.developerService.getAllDevelopers();

      return res
        .status(HttpStatusEnum.OK)
        .json({ status: "success", message: "Success", data: developers });
    }
  );

  getDeveloperById = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params;

      const developer = await this.developerService.getDeveloperById(id);

      return res
        .status(HttpStatusEnum.OK)
        .json({ status: "success", message: "Success", data: developer });
    }
  );

  createDeveloper = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const developerData = req.body;

      const newDeveloper = await this.developerService.createDeveloper(
        developerData
      );

      return res.status(HttpStatusEnum.CREATED).json({
        status: "success",
        message: "Desenvolvedor criado com sucesso.",
        data: newDeveloper,
      });
    }
  );

  updateDeveloper = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params;
      const developerData = req.body;

      const updatedDeveloper = await this.developerService.updateDeveloper(
        id,
        developerData
      );

      return res.status(HttpStatusEnum.OK).json({
        status: "success",
        message: "Desenvolvedor alterado com sucesso.",
        data: updatedDeveloper,
      });
    }
  );

  deleteDeveloper = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params;

      await this.developerService.deleteDeveloper(id);

      return res.status(HttpStatusEnum.OK).json({
        status: "success",
        message: `Desenvolvedor com Id: ${id} deletado com sucesso.`,
      });
    }
  );
}

export const DeveloperController = new _DeveloperController(DeveloperService);
