export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  materials: string[];
  source: 'user' | 'api';
  userId?: string;
  apiSource?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Messages {
  _id: string;
  name: string;
  email: string;
  message: string;
}

