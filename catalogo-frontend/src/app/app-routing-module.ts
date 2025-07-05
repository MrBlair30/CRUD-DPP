import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsList } from './products-list/products-list';
import { ProductForm } from './product-form/product-form';

const routes: Routes = [
  { path: 'productos', component: ProductsList },
  { path: 'nuevo', component: ProductForm },
  { path: 'editar/:id', component: ProductForm },
  { path: '', redirectTo: '/productos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
