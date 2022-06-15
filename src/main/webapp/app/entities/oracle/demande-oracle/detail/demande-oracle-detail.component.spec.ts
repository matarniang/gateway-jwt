import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DemandeOracleDetailComponent } from './demande-oracle-detail.component';

describe('DemandeOracle Management Detail Component', () => {
  let comp: DemandeOracleDetailComponent;
  let fixture: ComponentFixture<DemandeOracleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeOracleDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ demandeOracle: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DemandeOracleDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DemandeOracleDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load demandeOracle on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.demandeOracle).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
