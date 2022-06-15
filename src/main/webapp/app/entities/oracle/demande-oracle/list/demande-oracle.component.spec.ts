import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DemandeOracleService } from '../service/demande-oracle.service';

import { DemandeOracleComponent } from './demande-oracle.component';

describe('DemandeOracle Management Component', () => {
  let comp: DemandeOracleComponent;
  let fixture: ComponentFixture<DemandeOracleComponent>;
  let service: DemandeOracleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DemandeOracleComponent],
    })
      .overrideTemplate(DemandeOracleComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DemandeOracleComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DemandeOracleService);

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
    expect(comp.demandeOracles?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
