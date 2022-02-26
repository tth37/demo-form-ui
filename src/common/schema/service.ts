export class ErrorsType {
  [type: string]: string[] | undefined;
}

export class ServiceResponse {
  status: "resolved" | "rejected" | "unknownerror" | "unauthorized";
}
