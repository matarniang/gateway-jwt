import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DemandeWindowsDetailComponent } from './demande-windows-detail.component';

describe('DemandeWindows Management Detail Component', () => {
  let comp: DemandeWindowsDetailComponent;
  let fixture: ComponentFixture<DemandeWindowsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeWindowsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ demandeWindows: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DemandeWindowsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DemandeWindowsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load demandeWindows on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.demandeWindows).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
