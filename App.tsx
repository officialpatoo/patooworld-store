
import React, { useState, useMemo } from 'react';
import { ForceGraph } from './components/ForceGraph';
import { NodeDetail } from './components/NodeDetail';
import { D3Node, OmniGrowData } from './types';
import { Search } from './components/Search';

const omniGrowData: OmniGrowData = {
  "name": "Wix OmniGrow: All-in-One Growth & Operations Suite",
  "description": "Your central nervous system for accelerating business growth on Wix. Provides intelligent, integrated tools across sales, service, marketing, and site optimization from a single dashboard.",
  "children": [
    {
      "name": "Core Intelligence & Unified Dashboard (The Brain)",
      "description": "The foundation of OmniGrow, providing centralized data, AI-driven insights, and automation across all modules. This is where all data converges to create actionable intelligence.",
      "unified_dimension_focus": "Centralized Control & Smart Decision Making",
      "children": [
        { "name": "Unified Analytics & Reporting", "description": "Aggregates KPIs from all OmniGrow modules (sales, bookings, loyalty, marketing, site performance, accessibility) into real-time, comprehensive dashboards. Replaces disparate reports with a single source of truth." },
        { "name": "AI-Powered Insights & Recommendations", "description": "Analyzes cross-module data to identify patterns, predict trends, and suggest proactive actions (e.g., optimal upsell timing, content updates, staffing adjustments). Feeds intelligence to all suites." },
        { "name": "Smart Automation Engine", "description": "Extends Wix Automations. Allows triggers from one OmniGrow module to activate actions in another (e.g., 'New booking' -> 'Send intake form' + 'Enroll in loyalty' + 'Add to CRM segment')." },
        { "name": "Unified Client/Customer Profile (CRM Enhancement)", "description": "All interactions (purchases, bookings, quiz answers, loyalty points, form submissions) contribute to a rich, 360-degree view of each client within the Wix CRM, accessible directly from OmniGrow." }
      ]
    },
    {
      "name": "OmniCommerce Suite (Sales & Inventory)",
      "description": "Maximizes sales revenue, streamlines order fulfillment, and intelligently manages inventory across all selling channels for Wix Stores.",
      "unified_dimension_focus": "Revenue Optimization & Seamless Sales Operations",
      "children": [
        { "name": "Advanced Upsell & Cross-sell Engine", "description": "Leverages AI from Core Intelligence and customer profiles (CRM) to intelligently recommend complementary products on product pages, cart, checkout, and post-purchase. Directly boosts AOV.", "original_app_feature": "Advanced Upsell & Cross-sell Engine" },
        { "name": "Product Bundling & Kit Builder", "description": "Enables creation of dynamic bundles, 'build your own' kits, and subscription boxes with flexible pricing and inventory rules. Integrates with Wix Stores and Multi-Channel Inventory.", "original_app_feature": "Product Bundling & Kit Builder" },
        { "name": "Multi-Channel Inventory Management", "description": "Syncs Wix Store inventory with external platforms (Etsy, Amazon, physical POS), preventing overselling and centralizing stock control. Directly impacts product availability for bundles and sales.", "original_app_feature": "Multi-Channel Inventory Management" },
        { "name": "Advanced Shipping & Delivery Options", "description": "Integrates real-time carrier rates (UPS, FedEx), complex local delivery zones, pickup points, and scheduled delivery/pickup time slots into Wix checkout. Shipping options can be tied to loyalty tiers.", "original_app_feature": "Advanced Shipping & Delivery Options" }
      ]
    },
    {
      "name": "OmniService Suite (Bookings & Client Management)",
      "description": "Optimizes scheduling, enhances client intake, and provides specialized tools for service-based businesses using Wix Bookings.",
      "unified_dimension_focus": "Streamlined Service Delivery & Enhanced Client Experience",
      "children": [
        { "name": "Smart Booking Scheduler & Resource Management", "description": "Extends Wix Bookings with advanced features like multi-resource allocation, complex pricing (group discounts), and intelligent waitlist management. Uses CRM for personalized booking experiences.", "original_app_feature": "Smart Booking Scheduler & Resource Management" },
        { "name": "Client Intake Forms & Digital Waivers", "description": "Customizable forms and legally binding digital waivers, automatically sent upon booking/purchase and securely stored with the client's Unified Profile. Improves compliance and data collection.", "original_app_feature": "Client Intake Forms & Digital Waivers" },
        { "name": "Fitness/Studio Membership Management & Class Packs", "description": "Provides advanced membership tiers, recurring billing, class pack creation, attendance tracking, and virtual class integration. Integrates with Wix Bookings and Loyalty Programs.", "original_app_feature": "Fitness/Studio Membership Management & Class Packs" },
        { "name": "Restaurant Online Ordering & Table Reservations", "description": "A highly tailored system for restaurants including flexible menu builders, custom ordering, kitchen printing integration, and sophisticated table management. Links orders to loyalty and CRM.", "original_app_feature": "Restaurant Online Ordering & Table Reservations" }
      ]
    },
    {
      "name": "OmniEngage Suite (Marketing & Customer Loyalty)",
      "description": "Attracts, engages, and retains customers through intelligent, personalized interactions and robust loyalty programs.",
      "unified_dimension_focus": "Customer Acquisition, Engagement & Retention",
      "children": [
        { "name": "Customer Loyalty & Rewards Program", "description": "A comprehensive points system for purchases, referrals, reviews, social shares, and bookings, with flexible redemption options. Fully integrated with CRM and OmniCommerce.", "original_app_feature": "Customer Loyalty & Rewards Program" },
        { "name": "Advanced Quiz & Survey Builder", "description": "Creates interactive quizzes, personality tests, product recommenders, and detailed surveys with conditional logic. Results segment customers in CRM for targeted marketing and recommendations.", "original_app_feature": "Advanced Quiz & Survey Builder" },
        { "name": "Automated Social Proof Notifications", "description": "Displays real-time, non-intrusive pop-up notifications showing store activity (recent sales, sign-ups, bookings) to build trust and urgency. Draws data from OmniCommerce and OmniService.", "original_app_feature": "Automated Social Proof Notifications" }
      ]
    },
    {
      "name": "OmniOptimize Suite (Website Performance & Compliance)",
      "description": "Ensures the Wix site itself is performing optimally, is accessible, and adheres to best practices for visibility and inclusivity.",
      "unified_dimension_focus": "Site Visibility, Compliance & User Experience",
      "children": [
        { "name": "AI-powered SEO & Content Optimization Assistant", "description": "Analyzes Wix site content, suggests keywords, optimizes metadata, and generates AI-powered content to improve organic traffic." },
        { "name": "Accessibility Checker & Fixer", "description": "Scans the entire Wix site for WCAG compliance issues (alt text, color contrast) and provides actionable recommendations or automated fixes. Ensures inclusivity and legal compliance for all site interactions.", "original_app_feature": "Accessibility Checker & Fixer" }
      ]
    },
    {
      "name": "Developer Foundations & Implementation", "description": "The technical backbone for building and integrating Wix OmniGrow seamlessly.",
      "children": [
        { "name": "Wix App Market Integration", "description": "Single listing, ensuring compliance with Wix guidelines for a unified user experience." },
        { "name": "Wix Velo & Headless Core", "description": "Utilizes Velo for deep editor integration and custom backend logic; Headless for exposing APIs and external system integrations." },
        { "name": "Extensive Wix API Utilization", "description": "Leverages all relevant Wix APIs (Stores, Bookings, CRM, Automations, Members, Payments, etc.) for cross-module communication." },
        { "name": "Microservices Architecture", "description": "Internal structure for scalability, maintainability, and independent development of modules." },
        { "name": "AI/ML Integration (APIs)", "description": "Incorporates external AI APIs (OpenAI, Google AI) for advanced content generation, recommendations, and analytics." },
        { "name": "Robust Database & Data Sync", "description": "Optimized database for real-time cross-module data synchronization and consistency with Wix native data." },
        { "name": "Intuitive UI/UX Design", "description": "Admin interface within the Wix dashboard designed for exceptional ease of use, making complex features accessible to business owners." }
      ]
    },
    {
      "name": "Monetization Strategy", "description": "How Wix OmniGrow generates revenue while providing value to users.",
      "children": [
        { "name": "Tiered Subscription Model", "description": "Offers Basic, Pro, and Premium tiers with increasing feature sets, usage limits, and support levels to cater to diverse business needs." },
        { "name": "Freemium Option", "description": "A compelling free tier with limited core functionalities to attract users and demonstrate value before upgrading." }
      ]
    }
  ]
};

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<D3Node | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const data = useMemo(() => {
    const nodes: D3Node[] = [];
    const links: { source: string; target: string }[] = [];
    let idCounter = 0;

    function traverse(node: OmniGrowData, parentId: string | null, depth: number) {
      const nodeId = `${idCounter++}-${node.name}`;
      
      nodes.push({
        id: nodeId,
        name: node.name,
        description: node.description,
        unified_dimension_focus: node.unified_dimension_focus,
        original_app_feature: node.original_app_feature,
        depth: depth,
      });

      if (parentId) {
        links.push({ source: parentId, target: nodeId });
      }

      if (node.children) {
        node.children.forEach(child => traverse(child, nodeId, depth + 1));
      }
    }

    traverse(omniGrowData, null, 0);
    return { nodes, links };
  }, []);

  const highlightedData = useMemo(() => {
    if (!searchTerm.trim()) {
        return null;
    }

    const searchLower = searchTerm.trim().toLowerCase();
    
    const matchingNodeIds = new Set<string>();
    data.nodes.forEach(node => {
        if (node.name.toLowerCase().includes(searchLower)) {
            matchingNodeIds.add(node.id);
        }
    });

    if (matchingNodeIds.size === 0) {
        return { visibleNodeIds: new Set<string>(), matchingNodeIds };
    }

    const parentMap = new Map<string, string>();
    data.links.forEach(link => {
        parentMap.set(link.target as string, link.source as string);
    });

    const visibleNodeIds = new Set<string>();
    matchingNodeIds.forEach(matchId => {
        let currentId: string | undefined = matchId;
        while(currentId) {
            visibleNodeIds.add(currentId);
            currentId = parentMap.get(currentId);
        }
    });

    return { visibleNodeIds, matchingNodeIds };
  }, [searchTerm, data]);

  const handleNodeClick = (node: D3Node) => {
    setSelectedNode(node);
  };
  
  const handleCloseDetail = () => {
    setSelectedNode(null);
  };

  const handleSearchChange = (value: string) => {
      setSearchTerm(value);
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900 font-sans">
        <header className="absolute top-0 left-0 w-full p-4 z-10 bg-gradient-to-b from-gray-900 via-gray-900/80 to-transparent flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">Wix OmniGrow Suite Explorer</h1>
              <p className="text-gray-400">Pan &amp; zoom the graph. Click a node for details, or search.</p>
            </div>
            <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </header>
      <ForceGraph 
        data={data} 
        onNodeClick={handleNodeClick} 
        selectedNodeId={selectedNode?.id ?? null}
        highlightedData={highlightedData}
      />
      <NodeDetail node={selectedNode} onClose={handleCloseDetail} />
    </div>
  );
};

export default App;
