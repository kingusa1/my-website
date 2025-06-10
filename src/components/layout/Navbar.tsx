import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeXml } from 'lucide-react';

export function Navbar() {
  const navItems = [
    { href: '/', label: 'CV' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact Me' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CodeXml className="h-6 w-6 text-accent" />
          <span className="font-bold sm:inline-block font-headline">
            Mohamed Ismail
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-2 sm:space-x-4">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
