import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/of';
import {environment} from '../environments/environment';
import {Util} from './util';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {
    }

    deleteAccount() {
        return this.http.delete<any>(environment.apiUrl + '/user/', Util.getAuth());
    }
}
