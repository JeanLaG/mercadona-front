import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { usersGuard, adminGuard } from './users.guard';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { UserslistComponent } from './userslist/userslist.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';



export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'products/add', component: ProductCreateComponent},
    {path: 'products', component: ProductCatalogComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [usersGuard]},
    {path: 'update/:id', component: UpdateuserComponent, canActivate: [adminGuard]},
    {path: 'users', component: UserslistComponent, canActivate:[adminGuard]},
    {path: '**', component: ProductCatalogComponent},
    {path: '', redirectTo: '/products', pathMatch: 'full'},
];