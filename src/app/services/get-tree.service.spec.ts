import { TestBed } from '@angular/core/testing';

import { GetTreeService } from './get-tree.service';

describe('GetTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetTreeService = TestBed.get(GetTreeService);
    expect(service).toBeTruthy();
  });
});
