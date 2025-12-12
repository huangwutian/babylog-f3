// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ArrowLeft, User, Baby, Calendar, Weight, Settings, Bell, Shield, HelpCircle, LogIn, LogOut, Edit2, Check, X, Star, Heart, Clock, TrendingUp, Plus } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
import { PhoneLogin } from '@/components/PhoneLogin';
import { DarkModeToggle } from '@/components/DarkModeToggle';
export default function Profile(props) {
  const {
    $w,
    style
  } = props;
  const [activeTab, setActiveTab] = useState('profile');
  const [showLogin, setShowLogin] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempNickName, setTempNickName] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // 检查登录状态
  // 检查登录状态
  const isLoggedIn = Boolean($w.auth.currentUser?.userId);
  const currentUser = $w.auth.currentUser;

  // 监听主题变化
  // 监听主题变化
  useEffect(() => {
    const handleThemeChange = event => {
      setDarkMode(event.detail.darkMode);
    };
    window.addEventListener('themeChange', handleThemeChange);

    // 初始化时读取当前主题
    // 初始化时读取当前主题
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  // 宝宝信息数据
  // 宝宝信息数据
  const babyInfo = {
    name: '小宝',
    birthDate: '2024-09-15',
    age: '2个月29天',
    weight: '6.8kg',
    height: '62cm',
    milestones: 12,
    favoriteFood: '胡萝卜泥'
  };

  // 设置选项列表
  // 设置选项列表
  const settings = [{
    icon: Settings,
    label: '通用设置',
    description: '应用基础设置'
  }, {
    icon: Bell,
    label: '通知管理',
    description: '提醒和通知设置'
  }];
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    if (tabId !== 'profile') {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };
  const handleLoginSuccess = () => {
    console.log('登录成功');
  };
  const handleLogout = async () => {
    try {
      const tcb = await $w.cloud.getCloudInstance();
      await tcb.auth().signOut();
      await tcb.auth().signInAnonymously();
      await $w.auth.getUserInfo({
        force: true
      });
      window.location.reload();
    } catch (error) {
      console.error('退出登录失败:', error);
    }
  };
  const handleEditName = () => {
    setTempNickName(currentUser?.nickName || currentUser?.name || '');
    setIsEditingName(true);
  };
  const handleSaveName = () => {
    setIsEditingName(false);
    console.log('保存昵称:', tempNickName);
  };
  const handleCancelEdit = () => {
    setIsEditingName(false);
    setTempNickName('');
  };
  const handleAddBabyData = () => {
    console.log('跳转到添加宝宝数据页面');
    // 这里可以添加跳转到添加宝宝数据页面的逻辑
    $w.utils.navigateTo({
      pageId: 'home',
      params: {
        action: 'addBaby'
      }
    });
  };
  return <div style={style} className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => $w.utils.navigateBack()} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white font-['Playfair_Display']">我的</h1>
        <div className="w-6"></div>
      </header>

      <div className="p-4 space-y-6">
        {/* 宝宝信息卡片 - 仅登录后显示 */}
        {isLoggedIn && <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center space-x-2">
                <Baby className="text-blue-600 dark:text-blue-400" size={20} />
                <span>我的宝宝</span>
              </h3>
              <span className="text-sm text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded-full">2个月29天</span>
            </div>
            
            {/* 添加宝宝数据按钮 - 现在放在模块下方，宽度拉长 */}
            <button onClick={handleAddBabyData} className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors border-2 border-dashed border-blue-300 dark:border-blue-600 mt-4">
              <Plus className="text-blue-500 dark:text-blue-400" size={24} />
              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">添加宝宝数据</span>
            </button>
          </div>}

        {/* 设置选项 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">设置</h3>
          <div className="space-y-2">
            {settings.map((setting, index) => <button key={index} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <setting.icon className="text-gray-400" size={20} />
                  <div className="text-left">
                    <div className="font-medium text-gray-800 dark:text-white">{setting.label}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</div>
                  </div>
                </div>
                <ArrowLeft className="text-gray-400 transform rotate-180" size={16} />
              </button>)}
          </div>
        </div>

        {/* 未登录提示 */}
        {!isLoggedIn && <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-2xl p-6">
            <div className="text-yellow-800 dark:text-yellow-200 text-sm text-center">
              💡 登录后可以保存宝宝信息、同步数据到云端，享受更完整的服务
            </div>
          </div>}
      </div>

      {/* 全局黑暗模式切换按钮 */}
      <DarkModeToggle />

      {/* 登录弹窗 */}
      <PhoneLogin isOpen={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}