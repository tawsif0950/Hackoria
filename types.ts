import React from 'react';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}