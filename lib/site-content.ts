import type {
  ContactDetail,
  FooterLinkGroup,
  NavLink,
  Pillar,
  ProductCard,
  SelectOption,
  ServiceItem,
  StatItem,
  WhyItem,
} from "@/types/content";

export const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#products", label: "Divisions" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact", isCta: true },
];

export const HERO_STATS: StatItem[] = [
  { value: "Oman", label: "Headquartered Enterprise" },
  { value: "Muscat", label: "Maabilah Branch" },
  { value: "Sohar", label: "Industrial Hub Operations" },
  { value: "Global", label: "Trading & Supply Bridge" },
];

export const ABOUT_PILLARS: Pillar[] = [
  {
    title: "Fast Distribution",
    description: "Operational reach through Maabilah, Muscat, and Sohar.",
  },
  {
    title: "Dependable Procurement",
    description:
      "Reliable sourcing across food, construction, and energy sectors.",
  },
  {
    title: "Seamless Trade",
    description: "Efficient import-export execution across Oman and beyond.",
  },
  {
    title: "Trusted Partnerships",
    description:
      "Long-term relationships built on quality, value, and dependability.",
  },
];

export const PRODUCT_CARDS: ProductCard[] = [
  {
    id: "foodstuff",
    iconSrc: "/assets/quality-food-products.png",
    iconAlt: "Quality Food Products logo",
    iconWidth: 300,
    iconHeight: 260,
    iconClassName: "supply-icon",
    category: "Foodstuff Import & Distribution",
    name: "Quality Food Products",
    description:
      "Sourcing and delivering quality food products to support the region's growing commercial and retail sectors.",
    list: [
      "Frozen fish, chicken, shawarma, meat, and french fries",
      "Rice, sugar, oil, flour, and fresh vegetables",
      "Peas and lentils",
    ],
  },
  {
    id: "building-materials",
    iconSrc: "/assets/infrastructure-project-supply.png",
    iconAlt: "Infrastructure project supply",
    iconWidth: 315,
    iconHeight: 265,
    iconClassName: "contract-icon",
    category: "Building Materials & Construction Machinery",
    name: "Infrastructure Project Supply",
    description:
      "Supplying structural materials and heavy-duty equipment essential for infrastructure, residential, and commercial projects.",
    list: ["Plywood and whitewood", "Glues, steel, and silica sand", "Construction machinery and power tools"],
  },
  {
    id: "power-fuel",
    iconSrc: "/assets/generators-compressors-diesel.png",
    iconAlt: "Generators, compressors, and diesel",
    iconWidth: 335,
    iconHeight: 265,
    iconClassName: "electrical-icon",
    category: "Power & Fuel Solutions",
    name: "Generators, Compressors & Diesel",
    description:
      "Supplying dependable power and fuel solutions for industrial, commercial, and project requirements.",
    list: ["Generators", "Air compressors", "Diesel fuel"],
  },
  {
    id: "trade-logistics",
    iconSrc: "/assets/trade-logistics-execution.png",
    iconAlt: "Trade and logistics execution",
    iconWidth: 370,
    iconHeight: 245,
    iconClassName: "logistics-icon",
    category: "Logistics, Import & Export",
    name: "Trade & Logistics Execution",
    description:
      "Facilitating efficient logistics, import-export operations, cross-border trading, and project supply management.",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "import-export-distribution",
    title: "Import, Export & Distribution",
    description:
      "Coordinating international sourcing and local distribution for essential commercial sectors.",
  },
  {
    id: "procurement",
    title: "Procurement Optimization",
    description:
      "Improving sourcing reliability and value through strategic supply chain management.",
  },
  {
    id: "project-supply",
    title: "Project Supply Management",
    description:
      "Managing materials, machinery, generators, and energy products for commercial project needs.",
  },
  {
    id: "logistics",
    title: "Logistics, Import & Export",
    description:
      "Supporting logistics, cross-border trading, contracting services, and dependable execution across markets.",
  },
];

export const WHY_ITEMS: WhyItem[] = [
  {
    title: "Our Vision",
    description:
      "To be Oman's, the Middle East's, and North Africa's premier trading and contracting partner.",
  },
  {
    title: "Sustainable Growth",
    description:
      "To drive sustainable growth, advance renewable energy adoption, and power infrastructure through reliable trade networks.",
  },
  {
    title: "Our Mission",
    description:
      "To deliver exceptional quality, value, and dependability across the food, construction, and energy sectors.",
  },
  {
    title: "Long-Term Partnerships",
    description:
      "To support Oman's economic diversification through optimized supply chains and trust-based client relationships.",
  },
];

export const CONTACT_DETAILS: ContactDetail[] = [
  { icon: "L", label: "Location", value: "Maabilah, Muscat & Sohar, Sultanate of Oman" },
  { icon: "P", label: "Phone", value: "+968 XXXXXXXX" },
  { icon: "E", label: "Email", value: "info@rawayssohar.com" },
  { icon: "H", label: "Working Hours", value: "Sun - Thu: 8:00 AM - 6:00 PM" },
];

export const SERVICE_INTEREST_OPTIONS: SelectOption[] = [
  { value: "", label: "Select a service..." },
  { value: "frozen-food-products", label: "Frozen Food Products" },
  { value: "fresh-food-products", label: "Fresh Food Products" },
  { value: "peas-lentils", label: "Peas & Lentils" },
  { value: "plywood-whitewood", label: "Plywood & Whitewood" },
  { value: "glues-steel-silica-sand", label: "Glues, Steel & Silica Sand" },
  { value: "construction-machinery-power-tools", label: "Construction Machinery & Power Tools" },
  { value: "generators", label: "Generators" },
  { value: "air-compressors", label: "Air Compressors" },
  { value: "diesel-fuel", label: "Diesel Fuel" },
  { value: "logistics-import-export", label: "Logistics, Import & Export" },
  { value: "general-inquiry", label: "General Inquiry" },
];

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Navigation",
    links: [
      { href: "/home", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/gallery", label: "Gallery" },
      { href: "/products", label: "Products" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Divisions",
    links: [
      { href: "/products#foodstuff", label: "Foodstuff" },
      { href: "/products#building-materials", label: "Building Materials" },
      { href: "/products#building-materials", label: "Power Tools" },
      { href: "/products#building-materials", label: "Construction Equipment" },
      { href: "/products#power-fuel", label: "Power & Fuel Solutions" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services#logistics", label: "Logistics" },
      { href: "/services#import-export-distribution", label: "Import & Export" },
      { href: "/services#import-export-distribution", label: "Distribution" },
      { href: "/services#project-supply", label: "Project Supply" },
      { href: "/services#logistics", label: "Contracting" },
    ],
  },
];
