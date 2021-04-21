import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ResponseModel } from '../model/rest/response/response.model';

export class ServiceBase {

    constructor(public uri: string,
                public httpService: HttpService) {
    }

    public save(entity: any): Observable<ResponseModel> {
        return this.httpService.post(this.uri, entity);
    }

    public listAll(): Observable<ResponseModel> {
        return this.httpService.get(this.uri);
    }

    public findById(id: any): Observable<ResponseModel> {
        return this.httpService.get(this.uri + '/' + id);
    }

    public delete(entity: any): Observable<ResponseModel> {
        return this.httpService.delete(this.uri, entity);
    }

}