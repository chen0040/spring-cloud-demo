import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {


  constructor(private _http : Http) {

    }


    greet(): Observable<{ [key:string]:string; }> {

        return this._http.get('/greetings')
            .map((response: Response) => <{ [key:string]:string; }> response.json())
            .do( data => {
                console.log('Get greetings: ' + JSON.stringify(data));
            })
            .catch(this.handleError);
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
