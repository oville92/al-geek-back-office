export class Stock {
    constructor(
        public _id: string,
        public productId: number,
        public quantityInStock: number,
        public minimumQuantity: number
    ){}
}