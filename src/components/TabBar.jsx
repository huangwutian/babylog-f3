// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, BarChart3, Sparkles, User } from 'lucide-react';

export function TabBar({
  activeTab,
  onTabChange
}) {
  const tabs = [{
    id: 'home',
    label: '记录',
    icon: Home
  }, {
    id: 'stats',
    label: '统计',
    icon: BarChart3
  }, {
    id: 'ai',
    label: 'AI助手',
    icon: Sparkles
  }, {
    id: 'profile',
    label: '我的',
    icon: User
  }];
  return <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {tabs.map(tab => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        return <button key={tab.id} onClick={() => onTabChange(tab.id)} className="flex flex-col items-center space-y-1 transition-colors">
              <IconComponent size={20} className={isActive ? "text-blue-600" : "text-gray-500"} />
              <span className={`text-xs font-medium ${isActive ? "text-blue-600" : "text-gray-500"}`}>
                {tab.label}
              </span>
            </button>;
      })}
      </div>
    </nav>;
}