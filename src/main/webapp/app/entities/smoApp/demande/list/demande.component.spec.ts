import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DemandeService } from '../service/demande.service';

import { DemandeComponent } from './demande.component';

describe('Demande Management Component', () => {
  let comp: DemandeComponent;
  let fixture: ComponentFixture<DemandeComponent>;
  let service: DemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DemandeComponent],
    })
      .overrideTemplate(DemandeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DemandeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DemandeService);

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
    expect(comp.demandes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
