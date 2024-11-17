import { Component } from '@angular/core';
import { GenerosI, PeliculasI } from '../../interfaces/peliculas.interface';
import { PeliculasService } from '../../services/peliculas.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrl: './lista-peliculas.component.scss',
})
export class ListaPeliculasComponent {
  public listMovies: PeliculasI[] = [];
  public searchMovieForm: FormGroup;
  public listGenres: GenerosI[] = []

  /**
   *
   */
  constructor(
    private _peliculaService: PeliculasService,
    private _fb: FormBuilder
  ) {
    this.searchMovieForm = this.createSearchMovieForm();
  }

  ngOnInit(): void {
    this.searchMovies(this.searchMovieForm.value);
    this.searchGenres();

    this.onChangesSearchForm();
  }

  onChangesSearchForm(){
    this.searchMovieForm.valueChanges.subscribe((res) => {
      this._peliculaService.getMovies(res).subscribe({
        next: (res) => {
          this.listMovies = res.results;
        },
      });
    });
  }

  createSearchMovieForm() {
    return this._fb.group({
      with_genres: [''],
      language: ['es-ES'],
    });
  }

  searchMovies(params?: any) {
    this._peliculaService.getMovies(params).subscribe({
      next: (res) => {
        this.listMovies = res.results;
      },
    });
  }
  searchGenres() {
    this._peliculaService.getGenresTMDB().subscribe({
      next: (res) => {
        this.listGenres = res.genres;
      },
    });
  }
}
