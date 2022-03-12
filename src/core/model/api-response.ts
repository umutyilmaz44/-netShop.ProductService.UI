export interface ApiResponse {
  succeeded: boolean;
  failureType?: string;
  failures?: Map<string, string[]>;
}
