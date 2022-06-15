import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DemandeWindowsService } from '../service/demande-windows.service';

import { DemandeWindowsComponent } from './demande-windows.component';

describe('DemandeWindows Management Component', () => {
  let comp: DemandeWindowsComponent;
  let fixture: ComponentFixture<DemandeWindowsComponent>;
  let service: DemandeWindowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DemandeWindowsComponent],
    })
      .overrideTemplate(DemandeWindowsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DemandeWindowsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DemandeWindowsService);

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
    expect(comp.demandeWindows?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
