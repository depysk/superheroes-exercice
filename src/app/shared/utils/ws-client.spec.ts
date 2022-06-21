import { TestBed } from '@angular/core/testing';
import { UriBuilder } from './uri-builder';
import { ENV_CONFIG } from '../config/env.config';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WsClient } from './ws-client';
import { fakeEnvironment } from '../../../mocks';

describe('WsClient', () => {
  let service: WsClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WsClient, UriBuilder, { provide: ENV_CONFIG, useValue: fakeEnvironment }],
    });
    service = TestBed.inject(WsClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should request with GET method', () => {
    service.get('/test').subscribe();
    const req = httpTestingController.expectOne('https://fake-url/api/test');
    expect(req.request.method).toEqual('GET');
  });

  it('should request with POST method', () => {
    service.post('/test', {}, { data: { name: 'John', age: 35 } }).subscribe();
    const req = httpTestingController.expectOne('https://fake-url/api/test');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).not.toBeNull();
  });

  it('should request with PUT method', () => {
    service.put('/test', {}, { data: { name: 'John Smith', age: 45 } }).subscribe();
    const req = httpTestingController.expectOne('https://fake-url/api/test');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).not.toBeNull();
  });

  it('should request with DELETE method', () => {
    service.delete('/test').subscribe();
    const req = httpTestingController.expectOne('https://fake-url/api/test');
    expect(req.request.method).toEqual('DELETE');
  });

  it('should throw error', () => {
    service.get('/test').subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: any) => {
        expect(error).toEqual(new Error('Something bad happened; please try again later.'));
      },
    });
    const req = httpTestingController.expectOne('https://fake-url/api/test');
    req.flush('Deliberate error', { status: 404, statusText: 'Not Found' });
  });
});
