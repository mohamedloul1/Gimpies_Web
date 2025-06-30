// src/app/models/shoe.model.ts
export interface Shoe {
  ShoeID: number;
  Brand_Name: string;
  Type_Name: string;
  Value: number;
  Color_Name: string;
  Price: number;
  Quantity: number;
  imageUrl?: string; // bijv. '/assets/images/shoe1.jpg'


  amount?: number; // 👈 toevoegen


}
