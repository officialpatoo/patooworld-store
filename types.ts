
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  subCategory?: string;
  image: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  stock: number;
  lowStockAlert?: number;
  sku: string;
  variants?: { name: string; options: string[] }[];
  supplier?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
  orders: Order[];
  wishlist: string[];
  totalSpent?: number;
  joinDate?: string;
  role: 'customer' | 'staff' | 'admin';
  segment?: 'new' | 'loyal' | 'high-value' | 'at-risk';
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  shippingAddress: Address;
  shippingMethod: string;
  paymentMethod: string;
  trackingNumber?: string;
  refundAmount?: number;
  returnRequested?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping' | 'bogo';
  value: number;
  expiryDate: string;
  usageLimit?: number;
  usageCount: number;
  active: boolean;
  minSpend?: number;
}

export interface ShippingZone {
  id: string;
  name: string;
  regions: string[];
  rates: { name: string; minWeight?: number; maxWeight?: number; price: number }[];
}

export interface StoreSettings {
  storeName: string;
  contactEmail: string;
  currency: string;
  timezone: string;
  taxRate: number;
  freeShippingThreshold: number;
  paymentGateways: { name: string; enabled: boolean }[];
  seo: { metaTitle: string; metaDescription: string };
}

export interface CMSContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  lastUpdated: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Partial<User>) => Promise<void>;
  logout: () => void;
  updateWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (addressId: string) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Promise<string>;
}
