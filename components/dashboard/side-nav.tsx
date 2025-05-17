'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  User, 
  Settings, 
  BarChart3 
} from 'lucide-react';

const items = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Learning',
    href: '/learn',
    icon: BookOpen,
  },
  {
    title: 'Social',
    href: '/social',
    icon: Users,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Profile',
    href: '/profile/user_123',
    icon: User,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="px-2 py-2">
        <h2 className="px-4 text-lg font-semibold tracking-tight">
          Menu
        </h2>
        <nav className="grid gap-1 pt-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                pathname === item.href || pathname?.startsWith(`${item.href}/`)
                  ? 'bg-accent text-accent-foreground'
                  : 'transparent'
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}