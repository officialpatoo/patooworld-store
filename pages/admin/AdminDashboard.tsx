
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Product, Order, User, Coupon, StoreSettings, 
  ProductReview, CMSContent, ShippingZone 
} from '../../types';
import { getProducts, updateProduct, deleteProduct, addProduct } from '../../services/productService';
import { adminService } from '../../services/adminService';
import { ICONS } from '../../constants';

type TabType = 'dashboard' | 'catalog' | 'sales' | 'customers' | 'marketing' | 'cms' | 'reporting' | 'settings';

interface AdminDashboardProps {
  adminEmail: string;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminEmail, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [subTab, setSubTab] = useState<string>('overview');
  
  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [cms, setCms] = useState<CMSContent[]>([]);
  const [zones, setZones] = useState<ShippingZone[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(adminService.getSettings());
  const [loading, setLoading] = useState(true);
  
  // Modal & Selection States
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Partial<Coupon> | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);

  useEffect(() => {
    refreshAllData();
  }, []);

  const refreshAllData = async () => {
    setLoading(true);
    try {
      const prodData = await getProducts();
      setProducts(prodData);
      setOrders(adminService.getOrders());
      setCustomers(adminService.getCustomers());
      setCoupons(adminService.getCoupons());
      setReviews(adminService.getReviews());
      setCms(adminService.getCMSContent());
      setZones(adminService.getShippingZones());
      setSettings(adminService.getSettings());
    } catch (e) {
      console.error("Refresh failed", e);
    } finally {
      setLoading(false);
    }
  };

  const analytics = adminService.getAnalytics();
  const productPerformance = useMemo(() => adminService.getProductPerformance(products, orders), [products, orders]);

  // Handlers
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name) return;
    if (editingProduct.id) {
      await updateProduct(editingProduct.id, editingProduct);
    } else {
      await addProduct({
        ...editingProduct,
        rating: 0,
        reviews: 0,
        stock: editingProduct.stock || 0,
        sku: editingProduct.sku || `SKU-${Date.now()}`
      } as Omit<Product, 'id'>);
    }
    setShowProductModal(false);
    refreshAllData();
  };

  const handleUpdateOrderStatus = (id: string, status: Order['status']) => {
    adminService.updateOrderStatus(id, status);
    refreshAllData();
  };

  const handleReviewAction = (id: string, action: 'approved' | 'rejected' | 'delete') => {
    if (action === 'delete') {
      adminService.deleteReview(id);
    } else {
      adminService.updateReviewStatus(id, action);
    }
    refreshAllData();
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCoupon) {
      adminService.saveCoupon({
        ...editingCoupon,
        id: editingCoupon.id || `CPN-${Date.now()}`,
        usageCount: editingCoupon.usageCount || 0,
        active: editingCoupon.active ?? true
      } as Coupon);
      setShowCouponModal(false);
      refreshAllData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex text-gray-300 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col p-8 space-y-10 sticky top-0 h-screen overflow-y-auto scrollbar-hide">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">P</div>
          <span className="font-bold tracking-tighter text-2xl text-white">CONSOLE</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'M4 6h16M4 12h16M4 18h16' },
            { id: 'catalog', label: 'Catalog', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { id: 'sales', label: 'Sales & Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
            { id: 'customers', label: 'Customers', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
            { id: 'marketing', label: 'Marketing', icon: 'M11 5.882V19.297A8.25 8.25 0 017 18c-1.62 0-3.14.453-4.43 1.242.438-1.291 1.054-2.435 1.83-3.411M11 5.882l-1.83 5.491m0 0l-1.83 5.492m3.66-10.983A8.25 8.25 0 0115 18c1.62 0 3.14.453 4.43 1.242m-4.43-1.242l1.83-5.492m0 0l1.83-5.491' },
            { id: 'cms', label: 'Content (CMS)', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z' },
            { id: 'reporting', label: 'Reporting', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setSubTab('overview'); }}
              className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} /></svg>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-gray-800">
           <button onClick={onLogout} className="w-full text-rose-500 text-xs font-bold uppercase tracking-widest hover:text-rose-400 transition-colors">Terminate Session</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-x-hidden">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{activeTab.toUpperCase()}</h1>
            <div className="flex space-x-6 text-sm font-bold text-gray-500 uppercase tracking-widest">
               {activeTab === 'catalog' && (
                 <>
                   <button onClick={() => setSubTab('overview')} className={subTab === 'overview' ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : ''}>Inventory</button>
                   <button onClick={() => setSubTab('reviews')} className={subTab === 'reviews' ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : ''}>Reviews</button>
                 </>
               )}
               {activeTab === 'settings' && (
                 <>
                   <button onClick={() => setSubTab('overview')} className={subTab === 'overview' ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : ''}>General</button>
                   <button onClick={() => setSubTab('shipping')} className={subTab === 'shipping' ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : ''}>Shipping & Tax</button>
                   <button onClick={() => setSubTab('security')} className={subTab === 'security' ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : ''}>Security & Backup</button>
                 </>
               )}
            </div>
          </div>
          <div className="flex items-center space-x-6">
             <div className="flex flex-col text-right">
                <span className="text-white font-bold">Admin Root</span>
                <span className="text-[10px] text-indigo-500 font-mono tracking-widest uppercase">{adminEmail}</span>
             </div>
             <div className="w-12 h-12 bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden ring-2 ring-indigo-500/20">
                <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${adminEmail}`} className="w-full h-full object-cover" alt="Admin" />
             </div>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {activeTab === 'dashboard' && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { label: 'Global Gross', value: `$${analytics.revenue.toLocaleString()}`, trend: '+14.2%', color: 'text-emerald-400' },
                    { label: 'Transactions', value: analytics.orderCount, trend: '+5.7%', color: 'text-indigo-400' },
                    { label: 'AOV', value: `$${analytics.avgOrderValue.toFixed(2)}`, trend: '-0.4%', color: 'text-amber-400' },
                    { label: 'Active Clients', value: analytics.customerCount, trend: '+11.0%', color: 'text-rose-400' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-gray-900 p-8 rounded-[2rem] border border-gray-800 shadow-xl group hover:border-indigo-500/30 transition-all">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{stat.label}</p>
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-3xl font-bold text-white font-mono">{stat.value}</h3>
                        <span className={`text-xs font-bold ${stat.color}`}>{stat.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-900 p-10 rounded-[2.5rem] border border-gray-800 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-8">Sales Velocity</h3>
                    <div className="h-64 flex items-end justify-between space-x-4">
                      {analytics.dailySales.map((day, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                           <div className="w-full bg-indigo-600/20 rounded-t-xl relative group cursor-help" style={{ height: `${(day.value / 2500) * 100}%` }}>
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap">${day.value}</div>
                              <div className="w-full h-full bg-indigo-600 rounded-t-xl opacity-40 hover:opacity-100 transition-opacity"></div>
                           </div>
                           <span className="mt-4 text-[10px] font-bold text-gray-600 uppercase font-mono">{day.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-900 p-10 rounded-[2.5rem] border border-gray-800 shadow-xl overflow-y-auto max-h-[24rem] scrollbar-hide">
                    <h3 className="text-xl font-bold text-white mb-8">Inventory Watchlist</h3>
                    <div className="space-y-4">
                      {products.filter(p => p.stock <= (p.lowStockAlert || 10)).map(p => (
                        <div key={p.id} className="flex justify-between items-center p-4 bg-gray-950 rounded-2xl border border-gray-800 border-l-4 border-l-rose-500 hover:bg-gray-800/40 transition-colors">
                          <div className="flex items-center space-x-4">
                            <img src={p.image} className="w-10 h-10 rounded-lg object-cover grayscale opacity-60" />
                            <div>
                               <p className="font-bold text-sm text-white">{p.name}</p>
                               <p className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">{p.sku}</p>
                            </div>
                          </div>
                          <div className="text-right">
                             <p className="text-lg font-bold text-rose-400 font-mono">{p.stock}</p>
                             <p className="text-[10px] text-gray-600 uppercase font-black">UNITS</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'catalog' && subTab === 'overview' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                   <div className="relative w-96">
                     <input type="text" placeholder="Filter inventory..." className="w-full bg-gray-900 border border-gray-800 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm font-medium" />
                     <svg className="absolute left-4 top-4.5 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                   </div>
                   <button onClick={() => { setEditingProduct({}); setShowProductModal(true); }} className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-500 transition-all text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/10">Register Entry</button>
                </div>

                <div className="bg-gray-900 rounded-[2.5rem] border border-gray-800 overflow-hidden shadow-2xl overflow-x-auto">
                  <table className="w-full text-left min-w-[800px]">
                    <thead>
                      <tr className="bg-gray-900 border-b border-gray-800">
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Master SKU</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Classification</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Valuation</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Current Stock</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Protocol</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-gray-800/30 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-4">
                              <img src={p.image} className="w-12 h-12 rounded-xl object-cover border border-gray-800" />
                              <div>
                                <span className="font-bold text-white block text-sm">{p.name}</span>
                                <span className="text-[10px] text-gray-600 font-mono tracking-tighter uppercase">{p.sku}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6"><span className="text-[10px] font-black text-indigo-400 border border-indigo-400/20 px-2 py-1 rounded bg-indigo-400/5 uppercase tracking-tighter">{p.category}</span></td>
                          <td className="px-8 py-6"><p className="text-sm font-bold text-white font-mono">${p.price.toFixed(2)}</p></td>
                          <td className="px-8 py-6">
                             <div className="flex items-center space-x-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${p.stock > 10 ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></div>
                                <span className="text-xs font-mono font-bold">{p.stock} Units</span>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditingProduct(p); setShowProductModal(true); }} className="p-2 bg-gray-800 text-gray-400 hover:text-indigo-400 rounded-lg"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                              <button onClick={() => { if(confirm('Purge SKU from master inventory?')) deleteProduct(p.id).then(refreshAllData) }} className="p-2 bg-gray-800 text-gray-400 hover:text-rose-500 rounded-lg"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'sales' && (
              <div className="bg-gray-900 rounded-[2.5rem] border border-gray-800 overflow-hidden shadow-2xl">
                 <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Order Hash</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Client Identity</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Net Value</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Workflow State</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Fulfillment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {orders.map(o => (
                        <tr key={o.id} className="hover:bg-gray-800/30 transition-colors group cursor-pointer" onClick={() => setSelectedOrder(o)}>
                          <td className="px-8 py-6 font-mono text-xs font-bold text-indigo-400">{o.id}</td>
                          <td className="px-8 py-6 font-bold text-white text-sm">{o.shippingAddress.fullName}</td>
                          <td className="px-8 py-6 font-bold text-white font-mono">${o.total.toFixed(2)}</td>
                          <td className="px-8 py-6">
                             <span className={`text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest border ${
                               o.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                               o.status === 'processing' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 
                               'bg-gray-800 text-gray-500 border-gray-700'
                             }`}>{o.status}</span>
                          </td>
                          <td className="px-8 py-6 text-[10px] font-black text-gray-600 group-hover:text-indigo-400 uppercase tracking-widest">Details →</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="bg-gray-900 rounded-[2.5rem] border border-gray-800 overflow-hidden shadow-2xl">
                 <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Client Identity</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Communications</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Segmentation</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Market LTV</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {customers.map(c => (
                        <tr key={c.id} className="hover:bg-gray-800/30 transition-colors group">
                          <td className="px-8 py-6 flex items-center space-x-3">
                             <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/20 font-mono uppercase">{c.firstName[0]}{c.lastName[0]}</div>
                             <span className="font-bold text-white text-sm">{c.firstName} {c.lastName}</span>
                          </td>
                          <td className="px-8 py-6 text-xs text-gray-400 font-mono">{c.email}</td>
                          <td className="px-8 py-6">
                             <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase border ${
                               (c.totalSpent || 0) > 2000 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                             }`}>{ (c.totalSpent || 0) > 2000 ? 'High Value' : 'Loyal Client' }</span>
                          </td>
                          <td className="px-8 py-6 font-bold text-emerald-400 font-mono">${c.totalSpent?.toLocaleString() || '0'}</td>
                          <td className="px-8 py-6">
                             <button onClick={() => setSelectedCustomer(c)} className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Profile</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>
            )}

            {activeTab === 'reporting' && (
              <div className="space-y-12">
                <div className="bg-gray-900 p-10 rounded-[2.5rem] border border-gray-800 shadow-xl">
                   <h3 className="text-xl font-bold text-white mb-8">SKU Performance Matrix</h3>
                   <div className="space-y-4">
                     {productPerformance.slice(0, 5).map(p => (
                       <div key={p.id} className="flex justify-between items-center p-6 bg-gray-950 rounded-3xl border border-gray-800 group hover:border-indigo-500/50 transition-all">
                         <div className="flex items-center space-x-6">
                            <img src={p.image} className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                               <p className="font-bold text-white">{p.name}</p>
                               <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest font-mono">{p.sku}</p>
                            </div>
                         </div>
                         <div className="flex items-center space-x-12">
                            <div className="text-right">
                               <p className="text-sm font-black text-white font-mono">{p.totalSales}</p>
                               <p className="text-[9px] text-gray-600 uppercase font-black">UNITS SOLD</p>
                            </div>
                            <div className="text-right min-w-[100px]">
                               <p className="text-sm font-black text-emerald-400 font-mono">${p.revenue.toLocaleString()}</p>
                               <p className="text-[9px] text-gray-600 uppercase font-black">REVENUE</p>
                            </div>
                            <div className="w-24 bg-gray-900 h-1.5 rounded-full overflow-hidden">
                               <div className="bg-indigo-600 h-full" style={{ width: `${Math.min(100, (p.totalSales / 50) * 100)}%` }}></div>
                            </div>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-gray-900 p-10 rounded-[2.5rem] border border-gray-800">
                      <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Abandonment Logic</h3>
                      <div className="p-8 bg-gray-950 rounded-[2rem] border border-gray-800 text-center">
                         <p className="text-4xl font-black text-rose-500 font-mono mb-2">24.2%</p>
                         <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Cart Dropout Rate</p>
                      </div>
                   </div>
                   <div className="bg-gray-900 p-10 rounded-[2.5rem] border border-gray-800">
                      <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Growth Retention</h3>
                      <div className="p-8 bg-gray-950 rounded-[2rem] border border-gray-800 text-center">
                         <p className="text-4xl font-black text-emerald-500 font-mono mb-2">82.1%</p>
                         <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Repeat Customer Rate</p>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && subTab === 'security' && (
              <div className="max-w-3xl bg-gray-900 p-12 rounded-[3rem] border border-gray-800 shadow-2xl">
                 <h3 className="text-2xl font-bold text-white mb-10">Data Integrity & Security</h3>
                 <div className="space-y-10">
                    <div className="p-8 bg-gray-950 rounded-[2.5rem] border border-gray-800">
                       <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Global Snapshot (Backup)</h4>
                       <p className="text-xs text-gray-500 mb-6">Download a full JSON image of the store's current state, including inventory, orders, and customer profiles.</p>
                       <button onClick={() => adminService.triggerBackup()} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/10">Download Production Backup</button>
                    </div>
                    
                    <div className="p-8 bg-gray-950 rounded-[2.5rem] border border-gray-800">
                       <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Administrative Access Nodes</h4>
                       <div className="space-y-4">
                          {['info@patooworld.com', 'developer@patooworld.com', 'samuel@patooworld.com'].map(email => (
                             <div key={email} className="flex justify-between items-center p-4 bg-gray-900 rounded-2xl border border-gray-800">
                                <span className="text-xs font-mono text-gray-400">{email}</span>
                                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest px-2 py-1 bg-emerald-400/5 rounded">Authorized</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="p-8 bg-gray-950 rounded-[2.5rem] border border-gray-800 border-l-4 border-l-rose-500">
                       <h4 className="text-sm font-bold text-rose-500 mb-2 uppercase tracking-widest">Terminal Factory Reset</h4>
                       <p className="text-xs text-gray-500 mb-6">This will purge all local cached data. Use only for hardware migration or severe system corruption.</p>
                       <button onClick={() => { if(confirm('IRREVERSIBLE: Full data wipe?')) { localStorage.clear(); window.location.reload(); } }} className="w-full border-2 border-rose-500 text-rose-500 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">Execute Wipe Protocol</button>
                    </div>
                 </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in duration-300">
           <div className="bg-gray-900 w-full max-w-4xl rounded-[3rem] border border-gray-800 p-12 overflow-y-auto max-h-[90vh] shadow-3xl">
              <div className="flex justify-between items-start mb-12">
                 <div>
                    <h2 className="text-3xl font-black text-white mb-1 font-mono">{selectedOrder.id}</h2>
                    <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">Workflow Detail</p>
                 </div>
                 <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-white transition-colors text-3xl">&times;</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                 <div>
                    <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Consignment Address</h4>
                    <div className="p-6 bg-gray-950 rounded-3xl border border-gray-800">
                       <p className="font-bold text-white mb-2">{selectedOrder.shippingAddress.fullName}</p>
                       <p className="text-sm text-gray-400 leading-relaxed">
                          {selectedOrder.shippingAddress.street}<br />
                          {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.zipCode}<br />
                          {selectedOrder.shippingAddress.country}
                       </p>
                    </div>
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Market Operations</h4>
                    <div className="p-6 bg-gray-950 rounded-3xl border border-gray-800 space-y-4">
                       <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Method</span>
                          <span className="font-bold text-white uppercase font-mono">{selectedOrder.shippingMethod}</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Gateway</span>
                          <span className="font-bold text-white uppercase font-mono">{selectedOrder.paymentMethod}</span>
                       </div>
                       <div className="flex justify-between text-lg font-black pt-4 border-t border-gray-800">
                          <span className="text-white uppercase tracking-widest text-xs">Gross Total</span>
                          <span className="text-indigo-400 font-mono">${selectedOrder.total.toFixed(2)}</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mb-12">
                 <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Itemized Ledger</h4>
                 <div className="space-y-4">
                    {selectedOrder.items.map(item => (
                       <div key={item.id} className="flex justify-between items-center p-4 bg-gray-950 rounded-2xl border border-gray-800">
                          <div className="flex items-center space-x-4">
                             <img src={item.image} className="w-10 h-10 rounded-lg object-cover" />
                             <span className="font-bold text-sm text-white">{item.name}</span>
                          </div>
                          <div className="flex items-center space-x-8">
                             <span className="text-xs font-mono text-gray-400">QTY: {item.quantity}</span>
                             <span className="text-sm font-bold text-white font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="flex space-x-4">
                 <button onClick={() => { adminService.processRefund(selectedOrder.id, selectedOrder.total); setSelectedOrder(null); refreshAllData(); }} className="flex-1 bg-rose-500/10 text-rose-500 py-4 rounded-xl font-bold text-xs uppercase tracking-widest border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all">Authorize Full Refund</button>
                 <button className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/20">Generate Packing Slip</button>
              </div>
           </div>
        </div>
      )}

      {/* Product Modal Refined */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-gray-900 w-full max-w-2xl rounded-[3.5rem] border border-gray-800 p-12 overflow-y-auto max-h-[90vh] shadow-3xl scrollbar-hide">
              <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-widest">{editingProduct?.id ? 'Revision' : 'Registration'}</h2>
              <form onSubmit={handleProductSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Internal Identity (Name)</label>
                       <input value={editingProduct?.name || ''} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-600 text-white font-bold" required />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Product SKU</label>
                       <input value={editingProduct?.sku || ''} onChange={(e) => setEditingProduct({...editingProduct, sku: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-600 text-white font-mono text-xs" />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Base Price ($)</label>
                       <input type="number" step="0.01" value={editingProduct?.price || ''} onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="w-full bg-gray-950 border border-gray-800 rounded-xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-600 text-white font-mono" required />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Inventory Level</label>
                       <input type="number" value={editingProduct?.stock || 0} onChange={(e) => setEditingProduct({...editingProduct, stock: Number(e.target.value)})} className="w-full bg-gray-950 border border-gray-800 rounded-xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-600 text-white font-mono" />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Alert Threshold</label>
                       <input type="number" value={editingProduct?.lowStockAlert || 10} onChange={(e) => setEditingProduct({...editingProduct, lowStockAlert: Number(e.target.value)})} className="w-full bg-gray-950 border border-gray-800 rounded-xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-600 text-white font-mono" />
                    </div>
                    <div className="col-span-2">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Asset URL (Primary)</label>
                       <input value={editingProduct?.image || ''} onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-600 text-white font-mono text-[10px]" required />
                    </div>
                 </div>
                 <div className="flex space-x-4 pt-6">
                    <button type="button" onClick={() => setShowProductModal(false)} className="flex-1 bg-gray-800 py-4 rounded-xl font-bold uppercase tracking-widest text-xs">Abort</button>
                    <button type="submit" className="flex-[2] bg-indigo-600 py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-indigo-600/20">Commit Revision</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
