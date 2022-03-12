import { SortType } from 'src/core/components/paginator/PageModel';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseDto } from '../dto/base';
import { ApiDataResponse } from '../model/api-data-response';
import { ApiPagedResponse } from '../model/api-paged-response';
import { ApiResponse } from '../model/api-response';
import { BaseQuery } from '../model/base-query';

export abstract class BaseService<T extends BaseDto<T>> {

  constructor(
    private httpClient: HttpClient,
    private tConstructor: { new (m: Partial<T>, ...args: unknown[]): T },
    protected pathUrl: string
  ) {}

  public create(resource: Partial<T> & { toJson: () => T }): Observable<ApiDataResponse<T>>  {
    return this.httpClient
      .post<ApiDataResponse<T>>(`${environment.apiUrl}/${this.pathUrl}`, resource.toJson())
      .pipe(
        map((result) => {
          if(result && result.data){
            result.data = new this.tConstructor(result.data);
          }
          return result;
        })
      );
  }

  public find(size:any, page:any, sortField:any, sortType: SortType, query?: BaseQuery): Observable<ApiPagedResponse<T[]>>{
    return this.httpClient
      .post<ApiPagedResponse<T[]>>(`${environment.apiUrl}/${this.pathUrl}/find?size=${size}&page=${page}&sort=${sortField} ${sortType}`, query)
      .pipe(
        map((result) => {
          if(result && result.data){
            result.data = result.data.map((i) => new this.tConstructor(i));
          }
          return result;
        })
      );
  }

  public getById(id: string): Observable<ApiDataResponse<T>> {
    return this.httpClient
      .get<ApiDataResponse<T>>(`${environment.apiUrl}/${this.pathUrl}/${id}`)
      .pipe(
        map((result) => {
          if(result && result.data){
            result.data = new this.tConstructor(result.data);
          }
          return result;
        })
      );
  }

  public update(resource: Partial<T> & { toJson: () => T }): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(`${environment.apiUrl}/${this.pathUrl}/${resource.id}`, resource.toJson());
  }

  public delete(id: string): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(`${environment.apiUrl}/${this.pathUrl}/${id}`);
  }
}
