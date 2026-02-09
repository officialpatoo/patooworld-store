
import { Order, User, Coupon, StoreSettings, ProductReview, CMSContent, ShippingZone, Product } from '../types';

const REVIEWS_KEY = 'patoo_admin_reviews';
const CMS_KEY = 'patoo_admin_cms';
const ZONES_KEY = 'patoo_admin_shipping_zones';
const ORDERS_KEY = 'patoo_admin_orders';
const CUSTOMERS_KEY = 'patoo_admin_customers';
const COUPONS_KEY = 'patoo_admin_coupons';
const SETTINGS_KEY = 'patoo_admin_settings';

const INITIAL_REVIEWS: ProductReview[] = [
  { id: 'r1', productId: '1', productName: 'Patoo Sound Pro', customerName: 'Alice Smith', rating: 5, comment: 'Incredible depth of sound. Worth every penny.', date: '2024-03-15', status: 'approved' },
  { id: 'r2', productId: '2', productName: 'Patoo Watch Series 5', customerName: 'Bob Jones', rating: 4, comment: 'Great watch but battery could be better.', date: '2024-03-16', status: 'pending' },
];

const INITIAL_CMS: CMSContent[] = [
  { id: 'cms1', slug: 'about-us', title: 'About Patooworld', content: 'Crafting tools for the modern pioneer...', lastUpdated: '2024-01-10' },
  { id: 'cms2', slug: 'faq', title: 'Frequently Asked Questions', content: 'Find answers to common questions about shipping, returns...', lastUpdated: '2024-02-05' },
];

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'Patooworld Store',
  contactEmail: 'concierge@patooworld.com',
  currency: 'USD',
  timezone: 'UTC',
  taxRate: 8.5,
  freeShippingThreshold: 150,
  paymentGateways: [
    { name: 'Stripe', enabled: true },
    { name: 'PayPal', enabled: true },
    { name: 'CryptoPay', enabled: false }
  ],
  seo: {
    metaTitle: 'Patooworld Store - Premium Tech Essentials',
    metaDescription: 'Discover high-end audio, wearables, and computing products.'
  }
};

const getStorage = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const setStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const adminService = {
  // Reviews
  getReviews: (): ProductReview[] => getStorage(REVIEWS_KEY, INITIAL_REVIEWS),
  updateReviewStatus: (id: string, status: ProductReview['status']) => {
    const reviews = adminService.getReviews();
    setStorage(REVIEWS_KEY, reviews.map(r => r.id === id ? { ...r, status } : r));
  },
  deleteReview: (id: string) => {
    const reviews = adminService.getReviews();
    setStorage(REVIEWS_KEY, reviews.filter(r => r.id !== id));
  },

  // Orders
  getOrders: (): Order[] => getStorage(ORDERS_KEY, []),
  updateOrderStatus: (orderId: string, status: Order['status'], tracking?: string) => {
    const orders = adminService.getOrders();
    const updated = orders.map(o => o.id === orderId ? { ...o, status, trackingNumber: tracking || o.trackingNumber } : o);
    setStorage(ORDERS_KEY, updated);
  },
  processRefund: (orderId: string, amount: number) => {
    const orders = adminService.getOrders();
    setStorage(ORDERS_KEY, orders.map(o => o.id === orderId ? { ...o, status: 'refunded', refundAmount: amount } : o));
  },

  // Customers
  getCustomers: (): User[] => getStorage(CUSTOMERS_KEY, []),
  updateCustomerRole: (id: string, role: User['role']) => {
    const customers = adminService.getCustomers();
    setStorage(CUSTOMERS_KEY, customers.map(c => c.id === id ? { ...c, role } : c));
  },

  // Coupons
  getCoupons: (): Coupon[] => getStorage(COUPONS_KEY, []),
  saveCoupon: (coupon: Coupon) => {
    const coupons = adminService.getCoupons();
    const index = coupons.findIndex(c => c.id === coupon.id);
    if (index > -1) {
      coupons[index] = coupon;
      setStorage(COUPONS_KEY, coupons);
    } else {
      setStorage(COUPONS_KEY, [...coupons, coupon]);
    }
  },
  deleteCoupon: (id: string) => {
    const coupons = adminService.getCoupons();
    setStorage(COUPONS_KEY, coupons.filter(c => c.id !== id));
  },

  // Shipping Zones
  getShippingZones: (): ShippingZone[] => getStorage(ZONES_KEY, []),
  saveShippingZone: (zone: ShippingZone) => {
    const zones = adminService.getShippingZones();
    const index = zones.findIndex(z => z.id === zone.id);
    if (index > -1) {
      zones[index] = zone;
      setStorage(ZONES_KEY, zones);
    } else {
      setStorage(ZONES_KEY, [...zones, zone]);
    }
  },

  // CMS
  getCMSContent: (): CMSContent[] => getStorage(CMS_KEY, INITIAL_CMS),
  updateCMS: (id: string, updates: Partial<CMSContent>) => {
    const contents = adminService.getCMSContent();
    setStorage(CMS_KEY, contents.map(c => c.id === id ? { ...c, ...updates, lastUpdated: new Date().toISOString() } : c));
  },

  // Settings
  getSettings: (): StoreSettings => getStorage(SETTINGS_KEY, DEFAULT_SETTINGS),
  updateSettings: (settings: StoreSettings) => setStorage(SETTINGS_KEY, settings),

  // Analytics helper
  getAnalytics: () => {
    const orders = adminService.getOrders();
    const customers = adminService.getCustomers();
    const validOrders = orders.filter(o => o.status !== 'cancelled');
    const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);
    
    // Simple mock daily sales data
    const dailySales = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString(undefined, { weekday: 'short' }),
        value: Math.floor(Math.random() * 2000) + 500
      };
    });

    return {
      revenue: totalRevenue,
      orderCount: orders.length,
      customerCount: customers.length,
      avgOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
      dailySales
    };
  },

  getProductPerformance: (products: Product[], orders: Order[]) => {
    return products.map(p => {
      const sales = orders.reduce((total, order) => {
        const item = order.items.find(i => i.id === p.id);
        return total + (item ? item.quantity : 0);
      }, 0);
      return {
        ...p,
        totalSales: sales,
        revenue: sales * p.price
      };
    }).sort((a, b) => b.totalSales - a.totalSales);
  },

  triggerBackup: () => {
    const data = {
      inventory: localStorage.getItem('patooworld_inventory'),
      orders: localStorage.getItem(ORDERS_KEY),
      customers: localStorage.getItem(CUSTOMERS_KEY),
      settings: localStorage.getItem(SETTINGS_KEY)
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `patoo_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }
};
