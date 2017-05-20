import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../shared.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styles: []
})
export class MovieComponent implements OnInit {
  id_movie: string = "";
  mv_Title: string = "";
  mv_Rated: string = "";
  mv_Released: string = "";
  mv_Director: string = "";
  mv_Actors: string = "";
  mv_Plot: string = "";
  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
  }

  callMovieService() {
    this._sharedService.findMovie(this.id_movie)
      .subscribe(
        lstresult => {
          this.mv_Title = lstresult["Title"];
          this.mv_Rated = lstresult["Rated"];

          this.mv_Released = lstresult["Released"];
          this.mv_Director = lstresult["Director"];
          this.mv_Actors = lstresult["Actors"];
          this.mv_Plot = lstresult["Plot"];
        },
        error => {
          console.log("Error. The findMovie result JSON value is as follows:");
          console.log(error);
        }
      );
  }
}
