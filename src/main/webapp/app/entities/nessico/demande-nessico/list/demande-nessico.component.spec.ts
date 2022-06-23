import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DemandeNessicoService } from '../service/demande-nessico.service';

import { DemandeNessicoComponent } from './demande-nessico.component';

describe('DemandeNessico Management Component', () => {
  let comp: DemandeNessicoComponent;
  let fixture: ComponentFixture<DemandeNessicoComponent>;
  let service: DemandeNessicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DemandeNessicoComponent],
    })
      .overrideTemplate(DemandeNessicoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DemandeNessicoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DemandeNessicoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.demandeNessicos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
