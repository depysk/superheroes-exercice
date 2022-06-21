import { WsClient } from '../utils/ws-client';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroesWs {
  constructor(private wsClient: WsClient) {}

  private readonly ALL = '/all.json';
  private readonly BY_ID = '/id/{id}.json';

  getAllHeroes(): Observable<Hero[]> {
    return this.wsClient.get(this.ALL);
  }

  getHeroById(id: number): Observable<Hero> {
    return this.wsClient.get(this.BY_ID, { id });
  }
}
