import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, Producto } from '../product';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductForm implements OnInit {
  producto$!: Observable<Producto>;
  esEdicion = false;
  idProducto!: string;

  constructor(
    private productService: Product,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.producto$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.esEdicion = true;
          this.idProducto = id;
          return this.productService.getProductoPorId(id);
        } else {
          this.esEdicion = false;
          return of({ nombre: '', precio: 0, descripcion: '' });
        }
      })
    );
  }

  guardarProducto(producto: Producto) {
    if (this.esEdicion) {
      this.productService.actualizarProducto(this.idProducto, producto)
        .subscribe(() => this.router.navigate(['/productos']));
    } else {
      this.productService.agregarProducto(producto)
        .subscribe(() => this.router.navigate(['/productos']));
    }
  }
}
