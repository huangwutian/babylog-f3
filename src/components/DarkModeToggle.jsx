// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Moon, Sun } from 'lucide-react';

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // 初始化时读取用户偏好
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    updateTheme(savedDarkMode);
  }, []);

  // 切换黑暗模式
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
  return <button onClick={toggleDarkMode} className="fixed bottom-20 right-4 z-50 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-700 dark:to-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group" aria-label={darkMode ? '切换到亮色模式' : '切换到黑暗模式'}>
      {darkMode ? <Sun className="text-yellow-300 w-6 h-6 transform group-hover:rotate-12 transition-transform" /> : <Moon className="text-white w-6 h-6 transform group-hover:rotate-12 transition-transform" />}
      
      {/* 悬浮提示 */}
      <div className="absolute right-14 bg-gray-800 dark:bg-gray-700 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {darkMode ? '亮色模式' : '黑暗模式'}
      </div>
    </button>;
}