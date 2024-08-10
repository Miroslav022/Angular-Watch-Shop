interface IProductInCart {
  priceId: number;
  quantity: number;
}
interface ICartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  backgroundImage: string;
}

interface ICart {
  id: number;
  createdAt: Date;
  products: ICartProduct[];
}

export { IProductInCart, ICart, ICartProduct };
