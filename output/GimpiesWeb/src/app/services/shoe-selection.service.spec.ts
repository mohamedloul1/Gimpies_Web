import { ShoeSelectionService } from './shoe-selection.service';
import { Shoe } from '../models/shoe.model';

/**
 * We testen met Partial<Shoe> zodat we niet alle verplichte
 * modelvelden hoeven te vullen. Waar de service een Shoe[] vraagt,
 * casten we (as Shoe[]). In asserts gebruiken we objectContaining.
 */
const STORAGE_KEY = 'selectedShoes';

describe('ShoeSelectionService', () => {
  let service: ShoeSelectionService;

  // Spies op localStorage (per test schoon)
  let getItemSpy: jasmine.Spy<(key: string) => string | null>;
  let setItemSpy: jasmine.Spy<(key: string, value: string) => void>;
  let removeItemSpy: jasmine.Spy<(key: string) => void>;

  const sampleShoes: Partial<Shoe>[] = [
    {
      ShoeID: 1,
      amount: 2,
      Brand_Name: 'Nike',
      Type_Name: 'Sneaker',
      Color_Name: 'Red',
      Value: 99,
    },
    {
      ShoeID: 2,
      amount: 1,
      Brand_Name: 'Adidas',
      Type_Name: 'Runner',
      Color_Name: 'Blue',
      Value: 120,
    },
  ];

  beforeEach(() => {
    // Verse spies zetten VOOR het maken van de service,
    // omdat de constructor loadFromStorage() aanroept.
    getItemSpy = spyOn(window.localStorage, 'getItem').and.returnValue(null);
    setItemSpy = spyOn(window.localStorage, 'setItem').and.stub();
    removeItemSpy = spyOn(window.localStorage, 'removeItem').and.stub();

    // Service heeft geen DI-deps, dus direct instantieren is prima
    service = new ShoeSelectionService();
  });

  it('zou gecreëerd moeten worden', () => {
    expect(service).toBeTruthy();
  });

  describe('constructor / loadFromStorage', () => {
    it('laadt selectie uit localStorage bij geldige JSON', () => {
      const stored = JSON.stringify(sampleShoes);
      getItemSpy.and.returnValue(stored);

      // Nieuwe instantie zodat constructor opnieuw draait met huidige spy-return
      service = new ShoeSelectionService();

      expect(getItemSpy).toHaveBeenCalledWith(STORAGE_KEY);

      // Controleer met matchers zodat extra velden geen probleem zijn
      expect(service.getSelectedShoes()).toEqual(
        jasmine.arrayContaining([
          jasmine.objectContaining({ ShoeID: 1, amount: 2 }),
          jasmine.objectContaining({ ShoeID: 2, amount: 1 }),
        ])
      );
      expect(service.hasSelection()).toBeTrue();
      expect(service.count()).toBe(2);
    });

    it('logt een error en blijft leeg bij ongeldige JSON', () => {
      getItemSpy.and.returnValue('{"kapot":true,'); // invalid
      const errorSpy = spyOn(console, 'error').and.stub();

      service = new ShoeSelectionService();

      expect(getItemSpy).toHaveBeenCalledWith(STORAGE_KEY);
      expect(errorSpy).toHaveBeenCalled();
      expect(service.getSelectedShoes()).toEqual([]);
      expect(service.hasSelection()).toBeFalse();
      expect(service.count()).toBe(0);
    });

    it('laat selectie leeg als er niets in storage staat', () => {
      getItemSpy.and.returnValue(null);

      service = new ShoeSelectionService();

      expect(service.getSelectedShoes()).toEqual([]);
      expect(service.hasSelection()).toBeFalse();
      expect(service.count()).toBe(0);
    });
  });

  describe('setSelectedShoes', () => {
    it('stelt selectie in en slaat op in localStorage', () => {
      service.setSelectedShoes(sampleShoes as Shoe[]);

      expect(service.getSelectedShoes()).toEqual(
        jasmine.arrayContaining([
          jasmine.objectContaining({ ShoeID: 1, amount: 2 }),
          jasmine.objectContaining({ ShoeID: 2, amount: 1 }),
        ])
      );

      expect(setItemSpy).toHaveBeenCalledWith(
        STORAGE_KEY,
        JSON.stringify(sampleShoes)
      );
      expect(service.hasSelection()).toBeTrue();
      expect(service.count()).toBe(2);
    });

    it('kan naar lege selectie zetten en slaat dat op', () => {
      service.setSelectedShoes([] as Shoe[]);

      expect(service.getSelectedShoes()).toEqual([]);
      expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([]));
      expect(service.hasSelection()).toBeFalse();
      expect(service.count()).toBe(0);
    });
  });

  describe('clear', () => {
    it('leegt de selectie en verwijdert het storage item', () => {
      service.setSelectedShoes(sampleShoes as Shoe[]);
      service.clear();

      expect(service.getSelectedShoes()).toEqual([]);
      expect(removeItemSpy).toHaveBeenCalledWith(STORAGE_KEY);
      expect(service.hasSelection()).toBeFalse();
      expect(service.count()).toBe(0);
    });
  });

  describe('hasSelection & count', () => {
    it('reflecteert correct de huidige selectie', () => {
      expect(service.hasSelection()).toBeFalse();
      expect(service.count()).toBe(0);

      service.setSelectedShoes([{ ShoeID: 99, amount: 1 } as Shoe]);

      expect(service.hasSelection()).toBeTrue();
      expect(service.count()).toBe(1);
    });
  });
});
