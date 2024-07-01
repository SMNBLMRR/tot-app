import { isValid } from "date-fns";
import { FastifyReply, FastifyRequest } from "fastify";
import TotError from "../../errors/customError";
import { handleParsingDate, isValidReservation } from "./helpers";
import { ReservationService } from "./reservation.service";
import { Reservation } from "../../types/reservation";
function ReeservationController() {
  const reservationService = ReservationService();

  //'this' refers to the Fastify instance,
  //allowing us to access httpErrors from @fastify/sensible

  async function handleUserReservationList(
    req: FastifyRequest<{
      Params: { user: string };
      Querystring: {
        from?: string;
        to?: string;
        page?: number;
      };
    }>,
    res: FastifyReply
  ) {
    try {
      let { user } = req.params;
      let { from, to, page } = req.query;

      page = page ? Number(page) : 1;

      if (!user) return this.httpErrors.notFound("User not found");

      //get a reservation list by passing a pagination and delta date-time (from-to) for
      //a better reservation filtering
      let reservationList = await reservationService.getReservationList(
        user,
        from,
        to,
        page
      );

      if (!reservationList) return [];

      return reservationList;
    } catch (error) {
      console.error(error);
      return this.httpErrors.badRequest();
    }
  }

  async function handleUserReservation(
    req: FastifyRequest<{
      Body: { email: string; guest: number; date: string; time: string };
    }>,
    res: FastifyReply
  ) {
    try {
      const { email, guest, date, time } = req.body;

      //date and time handling for saving to the database in DateTime format
      const dateTimeString = `${date}T${time}:00`;

      //parsing date e.g. (2024-07-02T00:30:00.000Z)
      let dateTime = handleParsingDate(dateTimeString);

      //check if is a valid date
      if (!dateTime || !isValid(dateTime))
        return this.httpErrors.badRequest("Invalid Date");

      //retrieve reservation list from db
      let reservationList = await reservationService.rangeReservationList(
        dateTime
      );

      //check if is possible to make another reservation based on user input
      if (!isValidReservation(dateTime, reservationList, guest))
        throw new TotError("No reservation available");

      //make a reservation
      let reservation = await reservationService.createReservation(
        email,
        guest,
        dateTime
      );

      if (!reservation) return this.httpErrors.badRequest();

      res.code(201);
      return reservation;
    } catch (error) {
      console.error(error);
      if (error instanceof TotError) {
        return this.httpErrors.badRequest(error.message);
      }
      return this.httpErrors.internalServerError();
    }
  }

  return {
    handleUserReservationList,
    handleUserReservation,
  };
}

export { ReeservationController };
