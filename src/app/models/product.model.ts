import { Marque } from './marque.model';
import { Stock } from './stock.model';
import { TypeProduit } from './typeProduit.model';

export class Product {
    constructor(
        public id: number,
        public dateAjout: Date,
        public description: string,
        public nom: string,
        public photo: string,
        public prix: number,
        public marque: Marque,
        public type: TypeProduit,
        public stock: Stock
    ) {}

}