import { Component, computed, inject, model, signal } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PeliculasService } from '../../services/peliculas.service';
import { GenerosI, PeliculasI } from '../../interfaces/peliculas.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.scss',
})
export class RecomendacionesComponent {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public searchForm: FormGroup;
  public peliculas: PeliculasI[] = [];
  public generos: GenerosI[] = [];
  public inputChip: FormControl = new FormControl('');
  readonly generoActual = model('');
  readonly generosSelected = signal<GenerosI[]>(
    localStorage.getItem('filterRecomended')
      ? (JSON.parse(localStorage.getItem('filterRecomended')!) as GenerosI[])
      : []
  );
  // readonly generosSelected = signal<GenerosI[]>([]);
  readonly filtradoGeneros = computed(() => {
    const generoActual = this.generoActual().toLowerCase();
    return generoActual
      ? this.generos.filter((value) =>
          value.name.toLowerCase().includes(generoActual)
        )
      : this.generos.slice();
  });

  readonly announcer = inject(LiveAnnouncer);

  /**
   *
   */
  constructor(
    private _fb: FormBuilder,
    private _peliculasService: PeliculasService,
    private _toastr: ToastrService
  ) {
    this.searchForm = this.createSearchMovieForm();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.searchGenres();
    this.searchMovies();
    this.onChangeSearchForm();
  }

  onChangeSearchForm() {
    this.searchForm.valueChanges.subscribe((res) => {
      this.searchMovies();
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const genero: GenerosI = event.option.value
    if(!this.generosSelected().some((value) => value.id == genero.id)){
      this.generosSelected.update((generos) => [...generos, event.option.value]);
      this.addFavoriteLocalStorage();
    } else {
      this._toastr.info('Ya encuentra seleccionado este genero')
    }
    this.generoActual.set('');
    event.option.deselect();
  }

  addFavoriteLocalStorage() {
    const generesFilter = this.generosSelected()
      .map((genero) => genero.id)
      .join(',');
    localStorage.setItem(
      'filterRecomended',
      JSON.stringify(this.generosSelected())
    );
    localStorage.setItem('generesFilter', generesFilter);
    this.searchForm.get('with_genres')?.setValue(generesFilter);
  }

  add(event: MatChipInputEvent): void {
    const value = event.value as any as GenerosI;

    // Add our fruit
    if (value) {
      this.generosSelected.update((fruits) => [...fruits, value]);
    }

    // Clear the input value

    this.generoActual.set('');
  }

  remove(generoRemover: GenerosI): void {
    this.generosSelected.update((genero) => {
      const index = genero.indexOf(generoRemover);
      if (index < 0) {
        return genero;
      }

      genero.splice(index, 1);
      this.announcer.announce(`Removed ${generoRemover.name}`);
      return [...genero];
    });
    this.addFavoriteLocalStorage();
  }

  createSearchMovieForm() {
    return this._fb.group({
      with_genres: [localStorage.getItem('generesFilter') ?? ''],
      language: ['es-ES'],
    });
  }

  searchGenres() {
    this._peliculasService.getGenresTMDB().subscribe({
      next: (res) => {
        this.generos = res.genres;
      },
    });
  }

  searchMovies() {
    this._peliculasService.getMovies(this.searchForm.value).subscribe({
      next: (res) => {
        this.peliculas = res.results;
      },
    });
  }
}
