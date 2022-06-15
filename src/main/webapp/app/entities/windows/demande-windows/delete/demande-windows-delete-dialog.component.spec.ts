jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DemandeWindowsService } from '../service/demande-windows.service';

import { DemandeWindowsDeleteDialogComponent } from './demande-windows-delete-dialog.component';

describe('DemandeWindows Management Delete Component', () => {
  let comp: DemandeWindowsDeleteDialogComponent;
  let fixture: ComponentFixture<DemandeWindowsDeleteDialogComponent>;
  let service: DemandeWindowsService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DemandeWindowsDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(DemandeWindowsDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DemandeWindowsDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DemandeWindowsService);
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
