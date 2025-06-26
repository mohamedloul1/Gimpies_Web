import { Injectable } from '@angular/core';
import { Shoe } from '../models/shoe.model';

const STORAGE_KEY = 'selectedShoes';

@Injectable({
  providedIn: 'root'
})
export class ShoeSelectionService {
  private selectedShoes: Shoe[] = [];

  constructor() {
    this.loadFromStorage();
  }

  setSelectedShoes(shoes: Shoe[]): void {
    this.selectedShoes = shoes;
    this.saveToStorage();
  }

  getSelectedShoes(): Shoe[] {
    return this.selectedShoes;
  }

  clear(): void {
    this.selectedShoes = [];
    localStorage.removeItem(STORAGE_KEY);
  }

  hasSelection(): boolean {
    return this.selectedShoes.length > 0;
  }

  count(): number {
    return this.selectedShoes.length;
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.selectedShoes));
  }

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
