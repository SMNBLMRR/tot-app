import { endOfDay } from "date-fns";
import { prisma } from "../../plugins/db";
import { Reservation } from "../../types/reservation";
import { UserService } from "../user/user.service";
import TotError from "../../errors/customError";

export interface ReservationServiceInterface {
  getReservationList: (
    email: string,
    from?: string,
    to?: string,
    page?: number
  ) => Promise<Reservation[] | [] | null>;
  createReservation: (
    email: string,
    person: number,
    date: Date
  ) => Promise<Reservation>;
  rangeReservationList: (
    date: Date
  ) => Promise<{ date: Date; guest: number }[] | []>;
}

//handle reservation list, we shoul be able to do a pagination and
//fetch the existing reservation given a date range
function ReservationService(): ReservationServiceInterface {
  const userService = UserService();

  const NUM_PER_PAGE = 10;

  async function getReservationList(
    email: string,
    from?: string,
    to?: string,
    page?: number
  ) {
    let fromDate = from ? new Date(from) : undefined;

    let toDate = to ? endOfDay(new Date(to)) : undefined;

    let skip = 0;

    if (page && page > 1) skip = (page - 1) * NUM_PER_PAGE;

    return await prisma.reservation.findMany({
      where: {
        user: {
          email,
        },
        date: {
          lte: toDate,
          gte: fromDate,
        },
      },
      take: NUM_PER_PAGE,
      skip,
    });
  }

  //make a reservation
  async function createReservation(email: string, guest: number, date: Date) {
    let user = await userService.findUser(email);
    if (!user) throw new TotError("User doesn't exist");
    return await prisma.reservation.create({
      data: {
        date,
        guest,
        user: {
          connect: {
            email,
          },
        },
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  //retrieve all reservations made within a specific time range
  //to avoid overlapping reservations, the reservation duration is one hour
  //therefore, retrieve all reservations that are within 1 hour before and 1 hour after the current reservation time
  async function rangeReservationList(
    date: Date
  ): Promise<{ date: Date; guest: number }[] | []> {
    let startDate = new Date(date);
    startDate.setHours(startDate.getHours() - 1);

    let endDate = new Date(date);
    endDate.setHours(endDate.getHours() + 1);

    try {
      return await prisma.reservation.findMany({
        where: {
          date: {
            lt: endDate,
            gt: startDate,
          },
        },
        select: {
          date: true,
          guest: true,
        },
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  return {
    getReservationList,
    createReservation,
    rangeReservationList,
  };
}

export { ReservationService };
