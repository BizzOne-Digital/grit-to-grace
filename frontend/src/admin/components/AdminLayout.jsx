import { Outlet, NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Star, MessageSquare, Settings, LogOut,
  Menu, X, ExternalLink, ChevronRight, Compass, DollarSign
} from 'lucide-react';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/leads', icon: MessageSquare, label: 'Leads / Contacts' },
  { to: '/admin/services', icon: Compass, label: 'Services' },
  { to: '/admin/pricing', icon: DollarSign, label: 'Mentorship Packages' },
  { to: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { to: '/admin/settings', icon: Settings, label: 'Site Settings' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>

        {/* Logo */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-crimson-500 flex items-center justify-center">
              <span className="text-white font-heading font-bold text-sm">G</span>
            </div>
            <div>
              <p className="text-white font-heading font-bold text-sm uppercase tracking-wide">Grit to Grace</p>
              <p className="text-white/30 text-xs">Admin Panel</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/50 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* User */}
        <div className="px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-crimson-500/20 border border-crimson-500/30 flex items-center justify-center">
              <span className="text-crimson-400 font-heading font-bold text-sm">{user?.name?.[0] || 'A'}</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">{user?.name || 'Admin'}</p>
              <p className="text-white/30 text-xs">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 group
                ${isActive
                  ? 'bg-crimson-500 text-white'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`
              }>
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link to="/" target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 text-white/30 hover:text-white text-xs transition-colors">
            <ExternalLink size={14} /> View Website
          </Link>
          <button onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-white/30 hover:text-crimson-400 text-xs transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-navy-700">
            <Menu size={20} />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Admin Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" target="_blank"
              className="text-xs text-gray-400 hover:text-crimson-500 flex items-center gap-1 transition-colors">
              <ExternalLink size={12} /> Live Site
            </Link>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
