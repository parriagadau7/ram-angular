import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterComponent } from './character.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {characters} from './charactersDummy';
import {MomentModule} from 'ngx-moment';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let debugElement: DebugElement;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [HttpClientTestingModule,
        MomentModule.forRoot({
          relativeTimeThresholdOptions: {
            m: 59
          }
        })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service', () => {
    component = fixture.componentInstance;
    const element = debugElement.nativeElement;
    httpMock = TestBed.inject(HttpTestingController);
    // esperar a que se llame a esta ruta
    const req = httpMock.expectOne(`https://rickandmortyapi.com/api/character/?page=${component.numPage}`);
    req.flush(characters); // responder con esto
    httpMock.verify(); // comprobar que no hay más llamadas
    fixture.detectChanges();
    expect(element.querySelectorAll('.card').length).toBe(3);
    expect(component.characters).toEqual(characters.results);
  });

  it('should error call service user null', () => {
    component = debugElement.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    // esperar a que se llame a esta ruta
    const req = httpMock.expectOne(`https://rickandmortyapi.com/api/character/?page=${component.numPage}`);
    const mockErrorResponse = { status: 500, statusText: 'Server Error' };
    req.flush({  }, mockErrorResponse); // responder con esto
    httpMock.verify(); // comprobar que no hay más llamadas
    expect(component.characters).toEqual([]);
  });

});
