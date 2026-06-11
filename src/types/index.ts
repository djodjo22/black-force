export interface Order {
  id: number;
  name: string;
  phone: string;
  address: string;
  quantity: number;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}
