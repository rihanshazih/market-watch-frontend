import {HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

export class Util {

    static getAuth() {
        return {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem(environment.tokenVersion)
            })
        };
    }
}
