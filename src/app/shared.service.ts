import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class SharedService {
  weatherURL1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22";
  weatherURL2 = "%2C%20";
  weatherURL3 = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  findMovieURL1 = "http://www.omdbapi.com/?t=";
  findMovieURL2 = "&y=&plot=short&r=json";
  currencyURL = "http://api.fixer.io/latest?symbols=";
  loginURL="http://127.0.0.1:8080/auth"
  public token: string;

  totReqsMade: number = 0;
  constructor(private http: Http) {

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

  }

  findWeather(city, state) {
    this.totReqsMade = this.totReqsMade + 1;
    return this.http.get(this.weatherURL1 + city + this.weatherURL2+ state + this.weatherURL3)
      .map(response => {
        { return response.json() };
      })
      .catch(error => Observable.throw(error.json()));
  }

  findMovie(movie) {
    this.totReqsMade = this.totReqsMade + 1;
    return this.http.get(this.findMovieURL1 + movie + this.findMovieURL2)
      .map(response => {
        { return response.json() };
      })
      .catch(error => Observable.throw(error.json().error));
  }

  getCurrencyExchRate(currency) {
    this.totReqsMade = this.totReqsMade + 1;
    return this.http.get(this.currencyURL + currency)
      .map(response => {
        { return response.json() };
      })
      .catch(error => Observable.throw(error.json()));
  }

  //"{'username': 'admin', 'password': 'admin'}"


  userLogin(username:string, password:string): Observable<boolean>  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    return this.http.post(this.loginURL, JSON.stringify({ username: username, password: password }) ,options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }

      })
      .catch(error => Observable.throw(error.json()));
  }

}
