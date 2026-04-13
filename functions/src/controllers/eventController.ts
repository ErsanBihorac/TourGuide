import express from "express";
import {
  createEventService,
  getEventsByIdService,
  updateEventService,
  getAllEventsService,
  getEventByIdService,
} from "../services/eventService";

export const getEvents = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const result = await getAllEventsService();
    if (!result) throw new Error("Error while getting all Events");

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: "Error while getting all Events " });
  }
};

export const getEventsByUserId = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const userId = req.params.userId as string;
    if (!userId) {
      return res.status(400).json({ error: "user id missing" });
    }

    const result = await getEventsByIdService(userId);

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Error while getting outfits by user id" });
  }
};

export const getSingleEventById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const eventId = req.params.eventId as string;
    if (!eventId) {
      return res.status(400).json({ error: "eventId id missing" });
    }

    const result = await getEventByIdService(eventId);

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Error while getting outfits by user id" });
  }
};

export const createEvent = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const {
      userId,
      title,
      description,
      date,
      location,
      bookingStatus,
      guideId,
    } = req.body ?? {};

    if (!userId || !title || !description || !date || !location) {
      return res.status(400).json({ error: "missing event payload" });
    }

    const result = await createEventService({
      userId,
      title,
      description,
      date,
      location,
      bookingStatus,
      guideId,
    });

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Error while getting outfits by user id" });
  }
};

export const updateEventById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const eventId = req.params.eventId as string;
    if (!eventId) {
      return res.status(400).json({ error: "event id missing" });
    }

    const { title, description, date, location, bookingStatus, guideId } =
      req.body ?? {};

    const result = await updateEventService(eventId, {
      title,
      description,
      date,
      location,
      bookingStatus,
      guideId,
    });
    if (!result.updated) throw new Error("Error while update event");

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: "Error while updating event" });
  }
};
