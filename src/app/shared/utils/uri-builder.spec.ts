import { TestBed } from '@angular/core/testing';
import { UriBuilder } from './uri-builder';
import { ENV_CONFIG } from '../config/env.config';
import { fakeEnvironment } from '../../../mocks';

describe('UriBuilder', () => {
  let service: UriBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: ENV_CONFIG, useValue: fakeEnvironment }],
    });
    service = TestBed.inject(UriBuilder);
  });

  it('should create an instance of UriBuilder', () => {
    expect(service).toBeTruthy();
  });

  it('should return completed url', () => {
    let url = service.buildUrl('/test');
    expect(url).toBe('https://fake-url/api/test');
  });

  it('should return url with data filled', () => {
    let url = service.buildUrl('/test/{id}', { id: 1 });
    expect(url).toBe('https://fake-url/api/test/1');
  });
});
