import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WsClient } from './shared/utils/ws-client';
import { UriBuilder } from './shared/utils/uri-builder';
import { ENV_CONFIG } from './shared/config/env.config';
import { HeroPreviewComponent } from './hero-preview/hero-preview.component';
import { MaterialsModules } from './shared/materials.module';
import { HeroesWs } from './shared/ws/heroes.ws';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeEnvironment, heroes } from '../mocks';
import { of } from 'rxjs';
import { createMock } from '@testing-library/angular/jest-utils';
import userEvent from '@testing-library/user-event';

describe('AppComponent', () => {
  it('should get the right title', async () => {
    await render(AppComponent, {
      declarations: [HeroPreviewComponent],
      imports: [NoopAnimationsModule, HttpClientTestingModule, RouterTestingModule, MaterialsModules],
      providers: [HeroesWs, WsClient, UriBuilder, { provide: ENV_CONFIG, useValue: fakeEnvironment }],
    });
    expect(screen.getByText(/Heroes/)).toBeInTheDocument();
  });

  it('should present heroes list on main page', async () => {
    const heroesWsMock = createMock(HeroesWs);
    heroesWsMock.getAllHeroes = jest.fn(() => of(heroes));

    await render(AppComponent, {
      declarations: [HeroPreviewComponent],
      imports: [NoopAnimationsModule, HttpClientTestingModule, RouterTestingModule, MaterialsModules],
      providers: [WsClient, UriBuilder, { provide: ENV_CONFIG, useValue: fakeEnvironment }],
      componentProviders: [{ provide: HeroesWs, useValue: heroesWsMock }],
    });

    const rows = screen.getAllByRole('hero-row');
    expect(rows).toHaveLength(3);
  });

  it('should present and close hero sidebar tab', async () => {
    const heroesWsMock = createMock(HeroesWs);
    heroesWsMock.getAllHeroes = jest.fn(() => of(heroes));

    await render(AppComponent, {
      declarations: [HeroPreviewComponent],
      imports: [NoopAnimationsModule, HttpClientTestingModule, RouterTestingModule, MaterialsModules],
      providers: [WsClient, UriBuilder, { provide: ENV_CONFIG, useValue: fakeEnvironment }],
      componentProviders: [{ provide: HeroesWs, useValue: heroesWsMock }],
    });

    expect(screen.queryByRole('hero-preview')).not.toBeInTheDocument();

    const selectedRow = screen.getByText(heroes[0].name);
    await userEvent.click(selectedRow);

    expect(screen.queryByRole('hero-preview')).toBeInTheDocument();

    const closeButton = screen.getByRole('close-sidebar-tab');
    await userEvent.click(closeButton);

    expect(screen.queryByRole('hero-preview')).not.toBeInTheDocument();
  });
});
