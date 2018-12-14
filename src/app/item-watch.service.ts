import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {environment} from '../environments/environment';

@Injectable()
export class ItemWatchService {
    constructor(private http: HttpClient) {
    }

    get(structureId: number) {
        const token = localStorage.getItem(environment.tokenVersion);
        return this.http.get<any[]>(environment.apiUrl + '/itemwatch/?token=' + token
            + '&structureId=' + structureId);
    }

    getAvailable(typeahead: string): Observable<Object[]> {
        if (typeahead.length < 3 || typeahead.includes('evepraisal')) {
            return Observable.of([]);
        }
        return this.http.get<any[]>(environment.apiUrl + '/search/?term=' + typeahead);
    }

    put(itemWatch: any) {
        const token = localStorage.getItem(environment.tokenVersion);
        return this.http.put<any>(environment.apiUrl + '/itemwatch/?token=' + token,
            JSON.stringify(itemWatch));
    }

    delete(id: string) {
        const token = localStorage.getItem(environment.tokenVersion);
        return this.http.delete(environment.apiUrl + '/itemwatch/' + id + '?token=' + token);
    }

    deleteAll() {
        const token = localStorage.getItem(environment.tokenVersion);
        return this.http.delete(environment.apiUrl + '/itemwatch/?token=' + token);
    }
}
