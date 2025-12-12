// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ArrowLeft, Bell, Shield, HelpCircle, Info, Moon, Sun } from 'lucide-react';

import { DarkModeToggle } from '@/components/DarkModeToggle';
export default function Settings(props) {
  const {
    $w,
    style
  } = props;
  const [darkMode, setDarkMode] = useState(false);

  // 初始化时读取用户偏好
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    updateTheme(savedDarkMode);
  }, []);

  // 切换深色模式
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    updateTheme(newDarkMode);

    // 触发自定义事件，通知其他组件主题变化
    window.dispatchEvent(new CustomEvent('themeChange', {
      detail: {
        darkMode: newDarkMode
      }
    }));
  };

  // 更新主题
  const updateTheme = isDark => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => $w.utils.navigateBack()} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white font-['Playfair_Display']">设置</h1>
        <div className="w-6"></div>
      </header>

      <div className="p-4 space-y-4">
        {/* 外观设置 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Moon className="text-indigo-600 dark:text-indigo-400" size={20} />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">外观设置</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {darkMode ? <Moon className="text-indigo-600 dark:text-indigo-400" size={18} /> : <Sun className="text-yellow-600" size={18} />}
                <span className="text-gray-700 dark:text-gray-300">深色模式</span>
              </div>
              <button onClick={toggleDarkMode} className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600 transition-colors">
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {darkMode ? '当前使用深色主题，适合夜间使用' : '当前使用浅色主题，适合白天使用'}
            </div>
          </div>
        </div>

        {/* 通知设置 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="text-blue-600 dark:text-blue-400" size={20} />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">通知设置</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">喂奶提醒</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">睡眠提醒</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">换尿布提醒</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
          </div>
        </div>

        {/* 关于应用 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Info className="text-purple-600 dark:text-purple-400" size={20} />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">关于应用</h3>
          </div>
          <div className="text-center text-gray-600 dark:text-gray-400">
            <div className="text-lg font-medium mb-2">BabyLog v1.0.0</div>
            <div className="text-sm">专为新手父母设计的宝宝成长记录工具</div>
          </div>
        </div>
      </div>

      {/* 全局黑暗模式切换按钮 */}
      <DarkModeToggle />
    </div>;
}