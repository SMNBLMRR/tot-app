import { FastifyInstance } from "fastify";
import {
  userReservation,
  userReservationBody,
  userReservationList,
  userReservationParams,
  userReservationQueryString,
} from "../../schemas/reservation";
import { ReeservationController } from "./reservation.controller";

async function ReservationRoute(fastify: FastifyInstance, options: any) {
  const { handleUserReservationList, handleUserReservation } =
    ReeservationController();
  fastify.route({
    method: "GET",
    url: ":user/reservations",
    schema: {
      querystring: userReservationQueryString,
      params: userReservationParams,
      response: {
        200: userReservationList,
      },
    },
    handler: handleUserReservationList,
  });

  fastify.route({
    method: "POST",
    url: "reservation",
    schema: {
      body: userReservationBody,
      response: {
        201: userReservation,
      },
    },
    handler: handleUserReservation,
  });
}
export default ReservationRoute;
