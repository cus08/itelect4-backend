import { Router, type Request, type Response } from "express";
import { Booking } from "../models/Booking";
import { requireAuth } from "../middleware/auth";
import type { NewBookingBody } from "../types/index";

export const bookingRouter = Router();

bookingRouter.use(requireAuth);

interface IdParam {
  id: string;
}

bookingRouter.get("/", async (req: Request, res: Response) => {
  const bookings = await Booking.find({
    tuteeId: req.userId,
  }).sort({ requestedAt: -1 });
  res.json(bookings);
});

bookingRouter.get(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const booking = await Booking.findOne({
      _id: req.params.id,
      tuteeId: req.userId,
    });

    if (!booking) {
      res.status(404).json({ message: "No booking with that id" });
      return;
    }

    res.json(booking);
  },
);

bookingRouter.post(
  "/",
  async (
    req: Request<unknown, unknown, NewBookingBody>,
    res: Response,
  ) => {
    const booking = await Booking.create({
      ...req.body,
      tuteeId: req.userId,
    });

    res.status(201).json(booking);
  },
);

bookingRouter.patch(
  "/:id",
  async (
    req: Request<IdParam, unknown, Partial<NewBookingBody>>,
    res: Response,
  ) => {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, tuteeId: req.userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!booking) {
      res.status(404).json({ message: "No booking with that id" });
      return;
    }

    res.json(booking);
  },
);

bookingRouter.delete(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,
      tuteeId: req.userId,
    });

    if (!booking) {
      res.status(404).json({ message: "No booking with that id" });
      return;
    }

    res.status(204).send();
  },
);
