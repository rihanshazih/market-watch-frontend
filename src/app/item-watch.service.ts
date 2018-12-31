import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {environment} from '../environments/environment';
import {Util} from './util';

@Injectable()
export class ItemWatchService {
    constructor(private http: HttpClient) {
    }

    get(structureId: number) {
        return this.http.get<any[]>(environment.apiUrl + '/itemwatch/?structureId=' + structureId, Util.getAuth());
    }

    getAvailable(typeahead: string): Observable<Object[]> {
        if (typeahead.length < 3 || typeahead.includes('evepraisal')) {
            return Observable.of([]);
        }
        return this.http.get<any[]>(environment.apiUrl + '/search/?term=' + typeahead, Util.getAuth());
    }

    put(itemWatch: any) {
        return this.http.put<any>(environment.apiUrl + '/itemwatch/', JSON.stringify(itemWatch), Util.getAuth());
    }

    delete(id: string) {
        return this.http.delete(environment.apiUrl + '/itemwatch/' + id, Util.getAuth());
    }

    deleteAll() {
        return this.http.delete(environment.apiUrl + '/itemwatch/', Util.getAuth());
    }
}
