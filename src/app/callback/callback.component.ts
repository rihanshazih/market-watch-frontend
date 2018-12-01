import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            const code = params['code'];
            return this.http.get<any>(environment.apiUrl + '/login?code=' + code)
                .subscribe((data) => {
                    localStorage.setItem(environment.tokenVersion, data.token);
                    const navigationTarget = '/dashboard';
                    this.router.navigate([navigationTarget]);
                }, (err) => {
                    console.log(err);
                    alert('Authentication failed. ' + err + ' Please try again.');
                });
        });
    }

}
