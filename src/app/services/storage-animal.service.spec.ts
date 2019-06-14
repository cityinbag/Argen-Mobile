import { TestBed } from '@angular/core/testing';

import { StorageAnimalService } from './storage-animal.service';

describe('StorageAnimalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageAnimalService = TestBed.get(StorageAnimalService);
    expect(service).toBeTruthy();
  });
});
