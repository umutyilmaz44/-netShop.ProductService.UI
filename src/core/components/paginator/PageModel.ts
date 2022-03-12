export enum SortType {
  ASC = "ASC",
  DESC = "DESC"
}

export class PageModel {
  currentPage: number = 0;
  totalCount: number = 0;
  showTotalCount: boolean = true;
  totalPages: number = 0;
  pageScale: number = 5;
  pageSize: number = 10;
  sortField: String = 'ID';
  sortType: SortType = SortType.ASC;

  constructor(pm?: Partial<PageModel>) {
    if (pm) {
      Object.assign(this, pm);
    }
  }

  bindData(obj: any): void {
    if (obj == null) {
      return;
    }
    if (obj.pageSize) {
      this.pageSize = obj.pageSize;
    }

    if (obj.sortField) {
      this.sortField = obj.sortField;
    }

    if (obj.sortType) {
      this.sortType = obj.sortType;
    }

    if (obj.currentPage) {
      this.currentPage = obj.currentPage;
    }
    if (obj.totalCount) {
      this.totalCount = obj.totalCount;
    }
    if (obj.totalPages) {
      this.totalPages = obj.totalPages;
    }
    if (obj.pageScale) {
      this.pageScale = obj.pageScale;
    }
    if (obj.showTotalCount) {
      this.showTotalCount = obj.showTotalCount;
    }
  }
}
