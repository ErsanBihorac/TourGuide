import { FieldValue } from "firebase-admin/firestore";
import { admin } from "../db/firebase";

const db = admin.firestore();

export const getAllEventsService = async () => {
  const snap = await db.collection("events").get();
  if (!snap) throw new Error("Documents not found");

  const events = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return events;
};

export const getEventsByIdService = async (userId: string) => {
  const snap = db.collection("events").where("userId", "==", userId).get();

  const events = (await snap).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return events;
};

export const getEventByIdService = async (eventId: string) => {
  const snap = db.collection("events").where("eventId", "==", eventId).get();

  const events = (await snap).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return events;
};

export type CreateEventPayload = {
  userId: string;
  title: string;
  description: string;
  date: string;
  location: string;
  bookingStatus?: string;
  guideId?: string;
};

export const createEventService = async (payload: CreateEventPayload) => {
  const docRef = await db.collection("events").add({
    ...payload,
    bookingStatus: payload.bookingStatus ?? "open",
    guideId: payload.guideId ?? "",
    createdAt: FieldValue.serverTimestamp(),
  });

  return {
    success: true,
    id: docRef.id,
  };
};

export type UpdateEventPayload = {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  bookingStatus?: string;
  guideId?: string;
};

export const updateEventService = async (
  eventId: string,
  payload: UpdateEventPayload,
) => {
  const docRef = db.collection("events").doc(eventId);
  const snap = await docRef.get();
  if (!snap.exists) throw new Error("Event not found");

  const updateData = {
    ...payload,
    updatedAt: FieldValue.serverTimestamp(),
  };

  const result = await docRef.update(updateData);

  return { updated: true, result };
};
