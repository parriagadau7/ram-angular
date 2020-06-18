import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CharacterService} from './character.service';
import {characters} from './charactersDummy';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Ojo al async para ejectuar las llamadas asíncronas
  it(`THEN: should return 'Welcome to api!' when call 'listUser()'`, () => {
    service
      .getCharacters(2)
      .subscribe(result => {
          expect(result).toBeTruthy();
          expect(result.length).toBe(3);
          expect(result).toEqual(characters.results);
        }
      );
    // mock del backend para no depender del servidor
    const httpMock = TestBed.inject(HttpTestingController);
    // esperar a que se llame a esta ruta
    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character/?page=2');
    req.flush(characters); // responder con esto
    httpMock.verify(); // comprobar que no hay más llamadas
  });
});
