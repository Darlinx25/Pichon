import { TestBed } from '@angular/core/testing';

import { Websocket } from './websocketService';

describe('Websocket', () => {
  let service: Websocket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Websocket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
