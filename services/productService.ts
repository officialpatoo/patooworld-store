
import { Product } from '../types';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise-canceling over-ear headphones with studio-quality audio and 40-hour battery life.',
    price: 399.99,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
    rating: 4.8,
    reviews: 124,
    featured: true,
    stock: 45,
    sku: 'SNY-WH-XM5'
  },
  {
    id: '2',
    name: 'Apple Watch Ultra 2',
    description: 'The most rugged and capable Apple Watch. Designed for endurance, exploration, and adventure with a 49mm titanium case.',
    price: 799.00,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 89,
    featured: true,
    stock: 12,
    sku: 'APL-WCH-U2'
  },
  {
    id: '3',
    name: 'iPhone 15 Pro Max',
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a powerful iPhone camera system.',
    price: 1199.00,
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000',
    rating: 4.7,
    reviews: 215,
    stock: 8,
    sku: 'APL-IP15-PM'
  },
  {
    id: '4',
    name: 'MacBook Air M3',
    description: 'Lean. Mean. M3 machine. MacBook Air sails through work and play — and the M3 chip brings even greater capabilities.',
    price: 1299.00,
    category: 'Computing',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 56,
    featured: true,
    stock: 25,
    sku: 'APL-MBA-M3'
  },
  {
    id: '5',
    name: 'AirPods Pro (2nd Gen)',
    description: 'Featuring up to 2x more Active Noise Cancellation, plus Adaptive Transparency, and Personalized Spatial Audio.',
    price: 249.00,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1588423770574-91993ca06f42?auto=format&fit=crop&q=80&w=1000',
    rating: 4.5,
    reviews: 312,
    stock: 150,
    sku: 'APL-APP-G2'
  },
  {
    id: '6',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Experience the next level of mobile AI. Featuring a titanium frame, built-in S Pen, and a 200MP camera system.',
    price: 1299.99,
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=1000',
    rating: 4.8,
    reviews: 142,
    featured: true,
    stock: 30,
    sku: 'SAM-S24-ULT'
  },
  {
    id: '7',
    name: 'Dell XPS 15',
    description: 'A masterpiece of design and performance. 15.6-inch OLED touch display with 13th Gen Intel Core processors.',
    price: 1899.00,
    category: 'Computing',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1000',
    rating: 4.6,
    reviews: 74,
    stock: 15,
    sku: 'DEL-XPS-15'
  },
  {
    id: '8',
    name: 'Bose QuietComfort Ultra',
    description: 'World-class noise cancellation, quieter than ever before. Breakthrough spatialized audio for more immersive listening.',
    price: 429.00,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1000',
    rating: 4.7,
    reviews: 95,
    stock: 40,
    sku: 'BSE-QC-ULT'
  },
  {
    id: '13',
    name: 'Sony Alpha A7 IV',
    description: 'The ultimate hybrid mirrorless camera. 33MP full-frame sensor, advanced AF, and 4K 60p video recording.',
    price: 2499.00,
    category: 'Cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 28,
    featured: true,
    stock: 5,
    sku: 'SNY-A7-IV'
  },
  {
    id: '14',
    name: 'Samsung Galaxy Tab S9 Ultra',
    description: 'The largest and most powerful Android tablet. 14.6-inch Dynamic AMOLED 2X display and bundled S Pen.',
    price: 1199.00,
    category: 'Computing',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000',
    rating: 4.8,
    reviews: 34,
    stock: 18,
    sku: 'SAM-TAB-S9U'
  },
  {
    id: '15',
    name: 'Bose SoundLink Revolve+ II',
    description: 'The best-performing portable Bluetooth speaker from Bose. True 360° sound for consistent, uniform coverage.',
    price: 329.00,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&q=80&w=1000',
    rating: 4.7,
    reviews: 156,
    stock: 60,
    sku: 'BSE-SLR-P2'
  },
  {
    id: '16',
    name: 'DJI Mini 4 Pro',
    description: 'Mini to the Max. Weighing less than 249g, it features omnidirectional obstacle sensing and 4K/60fps HDR video.',
    price: 759.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 42,
    featured: true,
    stock: 12,
    sku: 'DJI-MN4-PRO'
  },
  {
    id: '17',
    name: 'PlayStation 5 Slim',
    description: 'Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, and 3D Audio.',
    price: 499.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1606813907291-d86ebb9954ad?auto=format&fit=crop&q=80&w=1000',
    rating: 4.8,
    reviews: 428,
    stock: 25,
    sku: 'SNY-PS5-SLM'
  },
  {
    id: '18',
    name: 'Sonos Era 300',
    description: 'With next-level audio that hits from every direction, Era 300 doesn’t just surround you, it puts you inside your music.',
    price: 449.00,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=1000',
    rating: 4.6,
    reviews: 67,
    stock: 30,
    sku: 'SON-ERA-300'
  },
  {
    id: '19',
    name: 'Fujifilm X100V',
    description: 'The iconic digital camera with a refined timeless design and sophisticated image quality. APS-C 26.1MP sensor.',
    price: 1399.00,
    category: 'Cameras',
    image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 112,
    stock: 3,
    sku: 'FUJ-X100V'
  },
  {
    id: '20',
    name: 'Razer Huntsman V3 Pro',
    description: 'The pinnacle of gaming performance. Featuring analog optical switches and adjustable actuation for ultimate control.',
    price: 249.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1000',
    rating: 4.7,
    reviews: 54,
    stock: 45,
    sku: 'RZR-HNT-V3P'
  }
];

const STORAGE_KEY = 'patooworld_inventory';

const loadInventory = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(stored);
};

const saveInventory = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const getProducts = async (): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(loadInventory()), 300);
  });
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const products = loadInventory();
  return new Promise(resolve => {
    setTimeout(() => resolve(products.find(p => p.id === id)), 200);
  });
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter(p => p.featured);
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const products = loadInventory();
  const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
  saveInventory([...products, newProduct]);
  return newProduct;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  const products = loadInventory();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) throw new Error("Product not found");
  
  const updatedProduct = { ...products[index], ...updates };
  products[index] = updatedProduct;
  saveInventory(products);
  return updatedProduct;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const products = loadInventory();
  saveInventory(products.filter(p => p.id !== id));
};

export const bulkUploadProducts = async (newProducts: Product[]): Promise<void> => {
  const products = loadInventory();
  saveInventory([...products, ...newProducts]);
};
