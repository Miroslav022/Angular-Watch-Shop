interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  total: number;
  status: string;
  orderItems: OrderItem[];
}

interface UserOrdersResponse {
  data: Order[];
  perPage: number;
  totalCount: number;
  pages: number;
  currentPage: number;
}
export { OrderItem, Order, UserOrdersResponse };
