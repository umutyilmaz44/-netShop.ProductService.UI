import { ApiResponse } from "./api-response";

export class ApiDataResponse<T> implements ApiResponse {
  succeeded: boolean;
  failureType?: string;
  failures?: Map<string, string[]>;
  data?: T;

  constructor(){
    this.succeeded = false;
  }
}
