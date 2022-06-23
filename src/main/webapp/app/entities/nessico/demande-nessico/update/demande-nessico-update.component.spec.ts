import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DemandeNessicoService } from '../service/demande-nessico.service';
import { IDemandeNessico, DemandeNessico } from '../demande-nessico.model';

import { DemandeNessicoUpdateComponent } from './demande-nessico-update.component';

describe('DemandeNessico Management Update Component', () => {
  let comp: DemandeNessicoUpdateComponent;
  let fixture: ComponentFixture<DemandeNessicoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let demandeNessicoService: DemandeNessicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DemandeNessicoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DemandeNessicoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DemandeNessicoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    demandeNessicoService = TestBed.inject(DemandeNessicoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const demandeNessico: IDemandeNessico = { id: 456 };

      activatedRoute.data = of({ demandeNessico });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(demandeNessico));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DemandeNessico>>();
      const demandeNessico = { id: 123 };
      jest.spyOn(demandeNessicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demandeNessico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demandeNessico }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(demandeNessicoService.update).toHaveBeenCalledWith(demandeNessico);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DemandeNessico>>();
      const demandeNessico = new DemandeNessico();
      jest.spyOn(demandeNessicoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demandeNessico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demandeNessico }));
      saveSubject.complete();

      // THEN
      expect(demandeNessicoService.create).toHaveBeenCalledWith(demandeNessico);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DemandeNessico>>();
      const demandeNessico = { id: 123 };
      jest.spyOn(demandeNessicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demandeNessico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(demandeNessicoService.update).toHaveBeenCalledWith(demandeNessico);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
