// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export function DateSelector({
  currentDate,
  onDateChange
}) {
  const formatDate = date => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === today.toDateString()) {
      return '今天';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '昨天';
    } else {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
  };
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };
  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };
  return <div className="flex items-center justify-center mt-6 space-x-4 px-4">
      <button onClick={goToPreviousDay} className="text-gray-600 hover:text-gray-800 transition-colors">
        <ChevronLeft size={20} />
      </button>
      
      <div className="flex items-center space-x-2">
        <Calendar size={18} className="text-gray-600" />
        <span className="text-lg font-medium text-gray-800">
          {formatDate(currentDate)}
        </span>
      </div>
      
      <button onClick={goToNextDay} className="text-gray-600 hover:text-gray-800 transition-colors">
        <ChevronRight size={20} />
      </button>
    </div>;
}