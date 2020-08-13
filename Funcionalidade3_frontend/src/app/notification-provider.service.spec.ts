import { TestBed } from '@angular/core/testing';

import { NotificationProviderService } from './notification-provider.service';

describe('NotificationProviderService', () => {
  let service: NotificationProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
