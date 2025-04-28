import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial counter value of 0', (done) => {
    service.loadingCounter$.pipe(first()).subscribe((count) => {
      expect(count).toBe(0);
      done();
    });
  });

  it('should increment counter when show is called', (done) => {
    service.show();
    service.loadingCounter$.pipe(first()).subscribe((count) => {
      expect(count).toBe(1);
      done();
    });
  });

  it('should decrement counter when hide is called', (done) => {
    service.show();
    service.show();
    service.hide();
    service.loadingCounter$.pipe(first()).subscribe((count) => {
      expect(count).toBe(1);
      done();
    });
  });

  it('should not decrement below 0', (done) => {
    service.hide();
    service.loadingCounter$.pipe(first()).subscribe((count) => {
      expect(count).toBe(0);
      done();
    });
  });

  it('should reset counter to 0', (done) => {
    service.show();
    service.show();
    service.reset();
    service.loadingCounter$.pipe(first()).subscribe((count) => {
      expect(count).toBe(0);
      done();
    });
  });

  it('should handle multiple show and hide calls correctly', (done) => {
    service.show();
    service.show();
    service.show();
    service.hide();
    service.loadingCounter$.pipe(first()).subscribe((count) => {
      expect(count).toBe(2);
      done();
    });
  });
});
