import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {environment} from '../environments/environment';
import {Util} from './util';

@Injectable()
export class StructureService {
    constructor(private http: HttpClient) {
    }

    getAvailable(typeahead: string): Observable<Object[]> {
        if (typeahead.length < 4) {
            return Observable.of([]);
        }
        return this.http.get<any[]>(environment.apiUrl + '/search-structure/?term=' + typeahead, Util.getAuth());
    }

    getStructureId(structureName: string): Observable<number> {
        return this.http.get<number>(environment.apiUrl + '/structure/id/?term=' + structureName, Util.getAuth());
    }
}
