import { Component, OnInit } from '@angular/core';
import { Product, Producto } from '../product';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.html',
  styleUrl: './products-list.css'
})
export class ProductsList implements OnInit {
  productos$!: Observable<Producto[]>;

  constructor(private productService: Product, private router: Router) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productos$ = this.productService.getProductos();
  }

  eliminarProducto(producto: Producto) {
    if (producto._id) {
      this.productService.eliminarProducto(producto._id).subscribe(() => {
        this.obtenerProductos();
      });
    } else {
      alert('Producto no tiene ID para eliminar');
    }
  }

  editarProducto(producto: Producto) {
    if (producto._id) {
      this.router.navigate(['/editar', producto._id]);
    }
  }
}
