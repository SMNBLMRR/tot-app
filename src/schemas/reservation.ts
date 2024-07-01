import S from "fluent-json-schema";

//this file will give a validation schema and openAPI documentation
export const userReservation = S.object()
  .prop(
    "date",
    S.string()
      .format("date")
      .description(
        "The date for fetching reservations (e.g., 2024-06-29)"
      )
  )
  .prop("user", S.object()
  .prop("email", S.string()))

export const userReservationList = S.array().items(userReservation);

export const userReservationBody = S.object()
  .additionalProperties(false)
  .description("Make a Reservation")
  .prop("email", S.string().format("email").required())
  .prop("date", S.raw({ type: "string", format: "date" }))
  .description("The date entered in the following format (e.g., 2024-06-29)")
  .prop("time", S.raw({ type: "string" }))
  .default("19:00")
  .description(
    "The time should be entered in the following format (e.g., 19:00)"
  )
  .prop("guest", S.integer().minimum(1).maximum(20).required());

export const userReservationQueryString = S.object()
  .prop(
    "from",
    S.string()
      .format("date")
      .description(
        "The start date for fetching reservations in format (e.g., 2024-06-29)"
      )
  )
  .prop(
    "to",
    S.string()
      .format("date")
      .description(
        "The end date for fetching reservations in format (e.g., 2024-06-30)"
      )
  )
  .prop(
    "page",
    S.number()
      .default(1)
      .minimum(1)
      .description(
        "The page number for pagination. Each page contains 10 reservations."
      )
  );

export const userReservationParams = S.object().prop(
  "user",
  S.string().description(
    "This should be the user email (e.g., user@example.it)"
  ).title("email").required()
);
