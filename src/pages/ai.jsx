// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ArrowLeft, Bot, Sparkles, Lightbulb } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
import { DarkModeToggle } from '@/components/DarkModeToggle';
export default function AI(props) {
  const {
    $w,
    style
  } = props;
  const [activeTab, setActiveTab] = useState('ai');
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
    if (tabId !== 'ai') {
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
        <h1 className="text-xl font-bold text-gray-800 dark:text-white font-['Playfair_Display']">AI助手</h1>
        <div className="w-6"></div>
      </header>

      <div className="p-4 space-y-6">
        {/* AI助手介绍 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot className="text-white" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">智能育儿助手</h2>
          <p className="text-gray-600 dark:text-gray-300">基于AI技术，为您的育儿之路提供专业建议</p>
        </div>

        {/* 功能卡片 */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <Sparkles className="text-yellow-500" size={24} />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">成长分析</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">基于宝宝数据智能分析成长状况</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <Lightbulb className="text-blue-500" size={24} />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">育儿建议</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">个性化育儿指导和专业建议</p>
              </div>
            </div>
          </div>
        </div>

        {/* 提示信息 */}
        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
          <div className="text-blue-800 dark:text-blue-200 text-sm text-center">
            💡 功能开发中，敬请期待...
          </div>
        </div>
      </div>

      {/* 全局黑暗模式切换按钮 */}
      <DarkModeToggle />

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}