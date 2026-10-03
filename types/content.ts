export interface NavLink {
  href: string;
  label: string;
  isCta?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Pillar {
  title: string;
  description: string;
}

export interface ProductCard {
  /** Anchor id so other pages can link straight to this card (e.g. /products#foodstuff). */
  id: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
  iconClassName: string;
  category: string;
  name: string;
  description: string;
  list?: string[];
}

export interface ServiceItem {
  /** Anchor id so other pages can link straight to this item (e.g. /services#logistics). */
  id: string;
  title: string;
  description: string;
}

export interface WhyItem {
  title: string;
  description: string;
}

export interface ContactDetail {
  icon: string;
  label: string;
  value: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}

export interface SelectOption {
  value: string;
  label: string;
}
