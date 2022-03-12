
export class QueryFilter {
  private filter = new Map<string, number | string | string[]>();

  constructor() {
  }

  add(field: string, value: number | string | string[]): Map<string, number | string | string[]> {
    this.filter.set(field, value);
    return this.filter;
  }

  getFilterAsJson(): any {
    let jsonObject: {[key: string]: number | string | string[] | undefined} = {};
    this.filter.forEach((value, key) => {
      jsonObject[key] = value
    });
    return jsonObject;
  }

  getFilterAsQueryString(): String {
    let query: string = '';
    this.filter.forEach((value, key) => {
      if (query) {
        query += '&' + key + '=' + value;
      } else {
        query = key + '=' + value;
      }
    });
    return query;
  }

  getKeys(): IterableIterator<String> {
    return this.filter.keys();
  }

  getValue(key: string): string | number | string[] | undefined {
    return this.filter.get(key);
  }

  clear() {
    this.filter = new Map<string, number | string | [string]>();
  }
}
