import { TestBed } from '@angular/core/testing';

import { LinkItemService } from './link-item.service';

describe('LinkItemService', () => {
  let service: LinkItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
