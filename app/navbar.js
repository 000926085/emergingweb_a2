'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavLinks() {
  const pathname = usePathname();
 
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid justify-content-center">
        <ul className="navbar-nav gap-3">
          <li className="nav-item">
            <Link
                className={`nav-link ${pathname === '/' ? 'active text-primary fw-semibold' : ''}`}
                href="/">
              Home
          </Link>
          </li>
          <li className="nav-item">
            <Link 
                className={`nav-link ${pathname === '/equipment' ? 'active text-primary fw-semibold' : ''}`}
                href="/equipment">
              Equipment
          </Link>
          </li>
          <li className="nav-item">
            <Link 
                className={`nav-link ${pathname === '/login' ? 'active text-primary fw-semibold' : ''}`}
                href="/login">
              Login
          </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}