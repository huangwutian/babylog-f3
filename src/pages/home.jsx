// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Settings, Smile } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
import { QuickActions } from '@/components/QuickActions';
import { DateSelector } from '@/components/DateSelector';
import { DarkModeToggle } from '@/components/DarkModeToggle';
export default function Home(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  // 监听主题变化
  useEffect(() => {
    const handleThemeChange = event => {
      setDarkMode(event.detail.darkMode);
    };
    window.addEventListener('themeChange', handleThemeChange);

    // 初始化时读取当前主题
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);
  const handleAction = actionType => {
    toast({
      title: "记录添加成功",
      description: `已记录${getActionLabel(actionType)}`
    });
  };
  const getActionLabel = actionType => {
    const labels = {
      feed: '喂奶',
      sleep: '睡觉',
      diaper: '换尿布'
    };
    return labels[actionType] || '活动';
  };
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    if (tabId !== 'home') {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      {/* 顶部导航栏 */}
      <header className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Smile className="text-blue-600 dark:text-blue-400" size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white font-['Playfair_Display']">BabyLog</h1>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900 px-3 py-1 rounded-full flex items-center space-x-1">
          <span className="text-blue-600 dark:text-blue-400 font-medium">小宝</span>
          <span className="text-blue-400 dark:text-blue-300 text-sm">· 2个月29天</span>
        </div>
        
        <button onClick={() => $w.utils.navigateTo({
        pageId: 'settings',
        params: {}
      })} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
          <Settings size={20} />
        </button>
      </header>

      {/* 上次喂奶记录卡片 */}
      <div className="mx-4 mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">上次喂奶</div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">暂无喂奶记录</div>
        </div>
      </div>

      {/* 日期选择器 */}
      <DateSelector currentDate={currentDate} onDateChange={setCurrentDate} />

      {/* 本日活动标题 */}
      <div className="mx-4 mt-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white font-['Playfair_Display']">本日活动</h2>
      </div>

      {/* 本日活动内容区域 */}
      <div className="mx-4 mt-3 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="text-center text-gray-500 dark:text-gray-400 text-lg">
          今天还没有记录哦
        </div>
      </div>

      {/* 快捷操作按钮 */}
      <QuickActions onAction={handleAction} />

      {/* 全局黑暗模式切换按钮 */}
      <DarkModeToggle />

      {/* 底部导航栏 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}