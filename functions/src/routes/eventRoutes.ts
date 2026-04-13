import express from "express";
import {
  createEvent,
  getEventsByUserId,
  getEvents,
  updateEventById,
  getSingleEventById,
} from "../controllers/eventController";

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/events", getEvents);
router.get("/events/:userId", getEventsByUserId);

router.get("/event/:eventId", getSingleEventById);

router.post("/events", createEvent);
router.put("/events/:eventId", updateEventById);

export default router;
