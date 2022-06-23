jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DemandeOracleService } from '../service/demande-oracle.service';

import { DemandeOracleDeleteDialogComponent } from './demande-oracle-delete-dialog.component';

describe('DemandeOracle Management Delete Component', () => {
  let comp: DemandeOracleDeleteDialogComponent;
  let fixture: ComponentFixture<DemandeOracleDeleteDialogComponent>;
  let service: DemandeOracleService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DemandeOracleDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(DemandeOracleDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DemandeOracleDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DemandeOracleService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
