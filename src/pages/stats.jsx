// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ArrowLeft, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
import { DarkModeToggle } from '@/components/DarkModeToggle';
export default function Stats(props) {
  const {
    $w,
    style
  } = props;
  const [activeTab, setActiveTab] = useState('stats');
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
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    if (tabId !== 'stats') {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => $w.utils.navigateBack()} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white font-['Playfair_Display']">统计</h1>
        <div className="w-6"></div>
      </header>

      <div className="p-4 space-y-6">
        {/* 统计概览 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="text-green-600 dark:text-green-400" size={20} />
            <span>统计概览</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">156</div>
              <div className="text-sm text-blue-500 dark:text-blue-300">总记录数</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">89</div>
              <div className="text-sm text-green-500 dark:text-green-300">照片数量</div>
            </div>
          </div>
        </div>

        {/* 喂奶统计 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center space-x-2">
            <Calendar className="text-orange-600 dark:text-orange-400" size={20} />
            <span>喂奶统计</span>
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">今日喂奶次数</span>
              <span className="font-semibold text-gray-800 dark:text-white">6次</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">平均间隔</span>
              <span className="font-semibold text-gray-800 dark:text-white">2.5小时</span>
            </div>
          </div>
        </div>

        {/* 睡眠统计 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center space-x-2">
            <BarChart3 className="text-purple-600 dark:text-purple-400" size={20} />
            <span>睡眠统计</span>
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">今日总睡眠</span>
              <span className="font-semibold text-gray-800 dark:text-white">14小时</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">最长连续睡眠</span>
              <span className="font-semibold text-gray-800 dark:text-white">5小时</span>
            </div>
          </div>
        </div>
      </div>

      {/* 全局黑暗模式切换按钮 */}
      <DarkModeToggle />

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}