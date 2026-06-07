import { TestBed } from '@angular/core/testing';

import { ChatServise } from './chat-servise';

describe('ChatServise', () => {
  let service: ChatServise;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatServise);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
