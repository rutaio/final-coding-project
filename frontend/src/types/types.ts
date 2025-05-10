export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'contributor' | 'admin';
  createdAt: string;
  updatedAt: string;
}
