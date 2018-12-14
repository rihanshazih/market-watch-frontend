import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {environment} from '../environments/environment';

@Injectable()
export class MarketService {
    constructor(private http: HttpClient) {
    }

    getMyActiveMarkets(): Observable<Object[]> {
        const token = localStorage.getItem(environment.tokenVersion);
        return this.http.get<any[]>(environment.apiUrl + '/markets/?token=' + token);
    }
}
