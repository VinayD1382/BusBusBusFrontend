import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { BusSearchComponent } from './bus-search/bus-search';
import { BookingComponent } from './booking/booking';
import { BookingAdminComponent } from './booking-admin/booking-admin';
import { UserComponent } from './user/user';
import { LoginComponent } from './login/login';
import { UserdbComponent } from './userdb/userdb';
import { AdminViewComponent } from './admin/admin';
import { Admindb } from './admindb/admindb';
import { AdminBusComponent } from './adminbus/adminbus';
import { BlogComponent } from './blog/blog';
import { HelpCenterComponent } from './help-center/help-center';
import { UserQueryComponent } from './userquery/userquery';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: BusSearchComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'booking/:busId', component: BookingComponent },
  { path: 'admin/bookings', component: BookingAdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userdb', component: UserdbComponent },
  { path: 'adminview', component: AdminViewComponent },
  { path: 'admindb', component: Admindb },
  { path: 'admin-bus', component: AdminBusComponent }, 
  {path: 'blog', component: BlogComponent},
 {path: 'help', component: HelpCenterComponent},
  {path: 'uquery', component: UserQueryComponent},

  { path: '**', redirectTo: '' }
];
