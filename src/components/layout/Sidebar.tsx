import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Zap, 
  FileText,
  Settings,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: any;
  label: string;
  path: string;
  adminOnly?: boolean;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: isAdmin ? '/admin' : '/dashboard',
    },
    {
      icon: FileText,
      label: 'Faturamento',
      path: '/billing',
      adminOnly: false,
    },
    {
      icon: Users,
      label: 'Usuários',
      path: '/admin/users',
      adminOnly: true,
    },
    {
      icon: Zap,
      label: 'Produção',
      path: '/admin/production',
      adminOnly: true,
    },
    {
      icon: BarChart3,
      label: 'Clientes',
      path: '/admin/clients',
      adminOnly: true,
    },
    {
      icon: Settings,
      label: 'Configurações',
      path: '/settings',
    },
  ];

  const filteredMenuItems = menuItems.filter(
    item => !item.adminOnly || (item.adminOnly && isAdmin)
  );

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white shadow-lg z-30 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64
        `}
      >
        <nav className="flex flex-col h-full">
          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1 mt-20 lg:mt-4">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-700 mb-1">
                💡 Dica
              </p>
              <p className="text-xs text-gray-600">
                Exporte seus relatórios mensais para acompanhar sua economia
              </p>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}