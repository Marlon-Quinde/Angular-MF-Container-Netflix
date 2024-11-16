import { Component } from '@angular/core';
import { PeliculasI } from '../../interfaces/peliculas.interface';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrl: './lista-peliculas.component.scss'
})
export class ListaPeliculasComponent {

  public listMovies: PeliculasI[] = [
    {
      nombre: 'Moana',
      descripcion: 'Pelicula de niños'
    },
    {
      nombre: 'Moana',
      descripcion: 'Pelicula de niños'
    },
    {
      nombre: 'Moana',
      descripcion: 'Pelicula de niños'
    },
    {
      nombre: 'Moana',
      descripcion: 'Pelicula de niños'
    },
    {
      nombre: 'Moana',
      descripcion: 'Pelicula de niños'
    },
  ]

  /**
   *
   */
  constructor(private _peliculaService: PeliculasService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._peliculaService.getMoviesPopular().subscribe({
      next: (res) => {
        console.log(res)
      }
    })

  }

}
