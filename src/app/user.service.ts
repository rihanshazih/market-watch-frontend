import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/of';
import {environment} from '../environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {
    }

    deleteAccount() {
        const token = localStorage.getItem(environment.tokenVersion);
        return this.http.delete<any>(environment.apiUrl + '/user/?token=' + token);
    }
}
