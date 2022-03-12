import { PageModel } from '../components/paginator/PageModel';
export class ApiPagedResponse<T> extends PageModel {
  succeeded: boolean;
  failureType?: string;
  failures?: Map<string, string[]>;
  data?: T;

  constructor() {
    super();

    this.currentPage = 1;
    this.pageSize = 20;
    this.totalPages = 1;
    this.totalCount = 0;
    this.succeeded = false;
  }
}
