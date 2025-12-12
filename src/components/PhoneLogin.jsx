// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { X, Phone, Lock, UserPlus } from 'lucide-react';

export function PhoneLogin({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  const {
    toast
  } = useToast();
  const [phoneNum, setPhoneNum] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationInfo, setVerificationInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: 输入手机号, 2: 输入验证码

  const handleGetCode = async () => {
    if (!phoneNum) {
      toast({
        title: '请输入手机号',
        variant: 'destructive'
      });
      return;
    }

    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phoneNum)) {
      toast({
        title: '请输入正确的手机号',
        variant: 'destructive'
      });
      return;
    }
    setIsLoading(true);
    try {
      const tcb = await $w.cloud.getCloudInstance();
      const info = await tcb.auth().getVerification({
        phone_number: `+86 ${phoneNum}`
      });
      setVerificationInfo(info);
      setStep(2);
      toast({
        title: '验证码已发送',
        description: '请注意查收短信'
      });
    } catch (error) {
      console.error('获取验证码失败:', error);
      toast({
        title: '获取验证码失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogin = async () => {
    if (!verificationCode) {
      toast({
        title: '请输入验证码',
        variant: 'destructive'
      });
      return;
    }
    if (verificationCode.length !== 6) {
      toast({
        title: '验证码格式错误',
        variant: 'destructive'
      });
      return;
    }
    setIsLoading(true);
    try {
      const tcb = await $w.cloud.getCloudInstance();
      await tcb.auth().signInWithSms({
        verificationInfo,
        verificationCode,
        phoneNum: phoneNum
      });

      // 刷新用户信息
      await $w.auth.getUserInfo({
        force: true
      });
      toast({
        title: '登录成功',
        description: '欢迎回来！'
      });
      onLoginSuccess?.();
      onClose();
    } catch (error) {
      console.error('登录失败:', error);
      toast({
        title: '登录失败',
        description: error.message || '请检查验证码是否正确',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleBack = () => {
    setStep(1);
    setVerificationCode('');
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 font-['Playfair_Display']">
            {step === 1 ? '手机号登录' : '输入验证码'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* 步骤1: 输入手机号 */}
        {step === 1 && <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">手机号</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input type="tel" value={phoneNum} onChange={e => setPhoneNum(e.target.value.replace(/\D/g, ''))} placeholder="请输入手机号" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" maxLength={11} />
              </div>
            </div>

            <button onClick={handleGetCode} disabled={isLoading} className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? '发送中...' : '获取验证码'}
            </button>

            <div className="text-center text-sm text-gray-500">
              新用户将自动注册账号
            </div>
          </div>}

        {/* 步骤2: 输入验证码 */}
        {step === 2 && <div className="space-y-4">
            <div className="text-center">
              <div className="text-gray-600 mb-2">验证码已发送至</div>
              <div className="font-medium text-gray-800">{phoneNum.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">验证码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input type="text" value={verificationCode} onChange={e => setVerificationCode(e.target.value.replace(/\D/g, ''))} placeholder="请输入6位验证码" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" maxLength={6} />
              </div>
            </div>

            <div className="flex space-x-3">
              <button onClick={handleBack} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                返回
              </button>
              <button onClick={handleLogin} disabled={isLoading} className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? '登录中...' : '登录'}
              </button>
            </div>
          </div>}
      </div>
    </div>;
}