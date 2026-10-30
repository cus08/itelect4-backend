import { Router, type Request, type Response } from "express";
import { Session } from "../models/Session";

export const sessionRouter = Router();

// GET /api/sessions — public, no auth required
sessionRouter.get("/", async (_req: Request, res: Response) => {
  const sessions = await Session.find().sort({ courseCode: 1 });
  res.json(sessions);
});

interface IdParam {
  id: string;
}

// GET /api/sessions/:id
sessionRouter.get(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const session = await Session.findById(req.params.id);

    if (!session) {
      res.status(404).json({ message: "No session with that id" });
      return;
    }

    res.json(session);
  },
);
