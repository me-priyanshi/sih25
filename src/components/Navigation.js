import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Camera,
  BarChart3
} from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'attendance', label: 'Attendance', icon: Camera },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'tasks', label: 'Tasks', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const facultyNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'attendance', label: 'Attendance', icon: Users },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const navItems = user?.role === 'student' ? studentNavItems : facultyNavItems;

  const handleLogout = () => {
    logout();
  };

  const NavItem = ({ item, isMobile = false }) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    
    return (
      <button
        onClick={() => {
          setActiveTab(item.id);
          if (isMobile) setIsMobileMenuOpen(false);
        }}
        className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          isActive
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <Icon className="w-5 h-5 mr-3" />
        {item.label}
      </button>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">SmartClass</span>
          </div>

          {/* User Info */}
          <div className="px-4 mb-6">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full"
                src={user?.avatar}
                alt={user?.name}
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>

          {/* Logout Button */}
          <div className="px-4 mt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900">SmartClass</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <img
              className="w-8 h-8 rounded-full"
              src={user?.avatar}
              alt={user?.name}
            />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="ml-2 text-lg font-bold text-gray-900">SmartClass</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Info */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.avatar}
                    alt={user?.name}
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                  <NavItem key={item.id} item={item} isMobile={true} />
                ))}
              </nav>

              {/* Mobile Logout Button */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
