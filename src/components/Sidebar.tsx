import { Shield, Video, Heart, Folder, Trash2, Camera } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const navItems: NavItem[] = [
    { icon: <Video className="w-5 h-5" />, label: 'All Media' },
    { icon: <Heart className="w-5 h-5" />, label: 'Favorites' },
    { icon: <Folder className="w-5 h-5" />, label: 'Collections' },
    { icon: <Trash2 className="w-5 h-5" />, label: 'Trash' },
    { icon: <Camera className="w-5 h-5" />, label: 'Front Door' }
  ];

  return (
    <aside className="bg-gray-900 border-r border-gray-800 p-4 w-64">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold text-white">SecureView</h2>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors
              ${activeSection === item.label 
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800'
              }`}
            onClick={() => onSectionChange(item.label)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}