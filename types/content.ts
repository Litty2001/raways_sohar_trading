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
