import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DemandeNessicoDetailComponent } from './demande-nessico-detail.component';

describe('DemandeNessico Management Detail Component', () => {
  let comp: DemandeNessicoDetailComponent;
  let fixture: ComponentFixture<DemandeNessicoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeNessicoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ demandeNessico: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DemandeNessicoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DemandeNessicoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load demandeNessico on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.demandeNessico).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
