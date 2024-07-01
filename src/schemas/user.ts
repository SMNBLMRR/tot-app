//this file will give a validation schema and openAPI documentation

import S from "fluent-json-schema";
export const userRegisterBody = S.object()
  .additionalProperties(false)
  .prop("email", S.string().format("email").required())
  .prop("username", S.string().required());

export const userRegisterResponse = S.object()
  .prop("email", S.string())
  .prop("username", S.string());
