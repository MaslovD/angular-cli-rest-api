import { Routes, RouterModule } from '@angular/router';
import { CurrencyComponent } from "./currency/currency.component";
import { WeatherComponent } from "./weather/weather.component";
import { MovieComponent } from "./movie/movie.component";
import {LoginComponent} from "./login/login.component";
const MAINMENU_ROUTES: Routes = [
  //full : makes sure the path is absolute path
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  { path: 'weather', component: WeatherComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'currency', component: CurrencyComponent },
  { path: 'login', component: LoginComponent }

];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);
