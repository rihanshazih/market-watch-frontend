import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {environment} from '../environments/environment';
import {Util} from './util';

@Injectable()
export class MarketService {
    constructor(private http: HttpClient) {
    }

    getMyActiveMarkets(): Observable<Object[]> {
        return this.http.get<any[]>(environment.apiUrl + '/markets/', Util.getAuth());
    }
}
