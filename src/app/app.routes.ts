import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ListsComponent } from './pages/lists/lists.component';
import { RegisterComponent } from './auth/register/register.component';
import { GroupGeneratorComponent  } from '../app/pages/groups/group.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lists', component: ListsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'group', component: GroupGeneratorComponent  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
