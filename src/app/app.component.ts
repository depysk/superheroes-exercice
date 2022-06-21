import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Hero } from './shared/models/hero';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { HeroesWs } from './shared/ws/heroes.ws';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  selectedHero: Hero;
  dataSource: MatTableDataSource<Hero>;
  heroes: Hero[] = [];
  displayedColumns: string[] = ['image', 'id', 'name', 'slug'];
  heroesSubscription: Subscription;
  updateHeroSub: Subscription;

  @ViewChild('panel') panel: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private heroesWs: HeroesWs) {}

  ngOnInit(): void {
    this.heroesSubscription = this.heroesWs.getAllHeroes().subscribe(value => {
      this.heroes = value;
      this.dataSource = new MatTableDataSource(this.heroes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.heroesSubscription?.unsubscribe();
    this.updateHeroSub?.unsubscribe();
  }

  async openPanel(hero: Hero) {
    this.selectedHero = hero;
    if (this.panel && !this.panel.opened) {
      await this.panel.open();
    }
  }

  async closePanel() {
    if (this.panel && this.panel.opened) {
      await this.panel.close();
    }
  }

  async updateHero() {
    this.updateHeroSub = this.heroesWs.getHeroById(this.selectedHero.id).subscribe((refreshHero: Hero) => {
      this.selectedHero = refreshHero;
      const foundIndex = this.heroes.findIndex(h => h.id == refreshHero.id);
      this.heroes[foundIndex] = refreshHero;
      this.dataSource = new MatTableDataSource(this.heroes);
    });
  }
}
