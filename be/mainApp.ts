import { Application, Request, Response } from "express";

export const mainApp = async (app: Application) => {
  try {
    app.get("/", (req: Request, res: Response): any => {
      try {
        return res.status(200).json({
          message: "Welcome to meejays feets",
          status: 200,
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error ",
        });
      }
    });
  } catch (error) {
    return error;
  }
};
