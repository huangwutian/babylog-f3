// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { BabyBottle, Moon, Droplets } from 'lucide-react';

export function QuickActions({
  onAction
}) {
  const actions = [{
    id: 'feed',
    label: '喂奶',
    icon: BabyBottle,
    color: 'bg-blue-500'
  }, {
    id: 'sleep',
    label: '睡觉',
    icon: Moon,
    color: 'bg-indigo-500'
  }, {
    id: 'diaper',
    label: '换尿布',
    icon: Droplets,
    color: 'bg-red-400'
  }];
  return <div className="flex justify-center mt-10 space-x-6 px-4">
      {actions.map(action => <button key={action.id} onClick={() => onAction(action.id)} className="flex flex-col items-center space-y-2 transition-transform hover:scale-105">
          <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center text-white`}>
            <action.icon size={24} />
          </div>
          <span className="text-sm font-medium text-gray-800">{action.label}</span>
        </button>)}
    </div>;
}