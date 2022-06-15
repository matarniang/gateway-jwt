import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DemandeOracleService } from '../service/demande-oracle.service';
import { IDemandeOracle, DemandeOracle } from '../demande-oracle.model';

import { DemandeOracleUpdateComponent } from './demande-oracle-update.component';

describe('DemandeOracle Management Update Component', () => {
  let comp: DemandeOracleUpdateComponent;
  let fixture: ComponentFixture<DemandeOracleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let demandeOracleService: DemandeOracleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DemandeOracleUpdateComponent],
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
      .overrideTemplate(DemandeOracleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DemandeOracleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    demandeOracleService = TestBed.inject(DemandeOracleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const demandeOracle: IDemandeOracle = { id: 456 };

      activatedRoute.data = of({ demandeOracle });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(demandeOracle));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DemandeOracle>>();
      const demandeOracle = { id: 123 };
      jest.spyOn(demandeOracleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demandeOracle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demandeOracle }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(demandeOracleService.update).toHaveBeenCalledWith(demandeOracle);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DemandeOracle>>();
      const demandeOracle = new DemandeOracle();
      jest.spyOn(demandeOracleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demandeOracle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demandeOracle }));
      saveSubject.complete();

      // THEN
      expect(demandeOracleService.create).toHaveBeenCalledWith(demandeOracle);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DemandeOracle>>();
      const demandeOracle = { id: 123 };
      jest.spyOn(demandeOracleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demandeOracle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(demandeOracleService.update).toHaveBeenCalledWith(demandeOracle);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
