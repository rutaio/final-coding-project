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
  maker: string;
  slug: string;
  description: string;
  image: string;
  materials: string[];
  source: 'user' | 'api';
  category: 'visual' | 'audio' | 'tactile' | 'scented' | 'edible';
  userId?: string;
  apiSource?: string;
  status: 'under review' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}
