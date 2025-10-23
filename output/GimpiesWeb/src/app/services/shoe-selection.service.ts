import { Injectable } from '@angular/core';
import { Shoe } from '../models/shoe.model';

//Gebruikt om data op te slaan onder deze naam in de browser.
const STORAGE_KEY = 'selectedShoes';

@Injectable({
  providedIn: 'root'
})
export class ShoeSelectionService {
  //Private array,Bevat de huidige selectie in het geheugen (met amount, ShoeID, enz.).
  private selectedShoes: Shoe[] = [];
  //Constructor laadt opgeslagen selectie
  //Zodra deze service wordt aangemaakt, wordt de selectie uit localStorage gelezen.
  constructor() {
    this.loadFromStorage();
  }
// Opslaan van selectie
  //Wordt gebruikt wanneer je schoenen selecteert of een amount aanpast.
  setSelectedShoes(shoes: Shoe[]): void {
    this.selectedShoes = shoes;
    this.saveToStorage();
  }
//Ophalen van selectie
  //Wordt gebruikt in zowel Shoe_View als CreateOrder om de selectie op te halen.
  getSelectedShoes(): Shoe[] {
    return this.selectedShoes;
  }
//Selectie wissen
  //Handig voor na het plaatsen van een bestelling of uitloggen.
  clear(): void {
    this.selectedShoes = [];
    localStorage.removeItem(STORAGE_KEY);
  }
// Checken of er een selectie is
  //Kun je gebruiken om bijvoorbeeld het winkelmand-icoon te tonen of verbergen.
  hasSelection(): boolean {
    return this.selectedShoes.length > 0;
  }
//Tellen hoeveel geselecteerd
  //Voor bijvoorbeeld een badge of teller in de UI.
  count(): number {
    return this.selectedShoes.length;
  }
//Opslaan in localStorage
  //Slaat de array van schoenen op als een JSON-string.
  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.selectedShoes));
  }
//Ophalen uit localStorage
  //Wordt automatisch aangeroepen in de constructor.
  private loadFromStorage(): void {
    const json = localStorage.getItem(STORAGE_KEY);
    if (json) {
      try {
        this.selectedShoes = JSON.parse(json);
      } catch (e) {
        console.error('❌ Kon selectie niet laden uit localStorage:', e);
      }
    }
  }
}
