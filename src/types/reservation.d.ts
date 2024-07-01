import { Reservation as ReservationModel } from "@prisma/client";
export type Reservation = Omit<ReservationModel, "id">;
