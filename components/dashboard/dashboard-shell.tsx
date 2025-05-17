import { ReactNode } from 'react';
import SideNav from '@/components/dashboard/side-nav';
import UserNav from '@/components/dashboard/user-nav';
import { MobileNav } from '@/components/dashboard/mobile-nav';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 lg:h-14">
        <MobileNav />
        <div className="flex-1"></div>
        <UserNav />
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden border-r md:block">
          <SideNav />
        </aside>
        <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}