import {Component, OnInit} from '@angular/core';
import {CharacterService} from './character.service';
import {Result} from './character';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  characters: Result[];
  isLoaded  = true;
  numPage: number;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.numPage = Math.floor(Math.random() * 25) + 1;
    this.characterService.getCharacters(this.numPage)
      .subscribe(characters => {
        this.isLoaded = false;
        return this.characters = characters;
      }
      );
  }

  trackByFn(index, item) {
    return index;
  }

}
