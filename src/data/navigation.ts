import type { NavigationItem } from '@/types/site';

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Solutions',
    href: '/capabilities',
    children: [
      { label: 'Capabilities', href: '/capabilities' },
      { label: 'Capability Statement', href: '/capability-statement', indent: true },
      { label: 'Who We Serve', href: '/who-we-serve' },
      { label: 'Past Performance', href: '/past-performance' },
    ],
  },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  {
    label: 'Contact',
    href: '/contact',
    children: [
      { label: 'Contact', href: '/contact' },
      { label: 'Partners', href: '/partners' },
      { label: 'Careers', href: '/careers' },
    ],
  },
];

export const footerNavigation: NavigationItem[] = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Who We Serve', href: '/who-we-serve' },
  { label: 'Capability Statement', href: '/capability-statement' },
  { label: 'About', href: '/about' },
  { label: 'Past Performance', href: '/past-performance' },
  { label: 'Insights', href: '/insights' },
];

export const contactNavigation: NavigationItem[] = [
  { label: 'Contact', href: '/contact' },
  { label: 'Partners', href: '/partners' },
  { label: 'Careers', href: '/careers' },
];

export const toolsNavigation: NavigationItem[] = [
  { label: 'Set-Aside Checker', href: '/tools/set-aside-checker' },
  { label: 'Subcontract Calculator', href: '/tools/subcontract-calculator' },
  { label: 'Readiness Assessment', href: '/tools/assessment' },
];

export const legalNavigation: NavigationItem[] = [
  { label: 'Privacy', href: '/privacy' },
];
