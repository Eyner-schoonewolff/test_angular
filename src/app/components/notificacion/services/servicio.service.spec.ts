import { TestBed } from '@angular/core/testing';

import { ServicioNotificaion } from './servicio.service';

describe('ServicioService', () => {
  let service: ServicioNotificaion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioNotificaion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
