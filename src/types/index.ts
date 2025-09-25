export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'driver' | 'employee';
  address?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  trackingId: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  deliveryDate?: string;
  weight: number;
  vehicleType: 'small' | 'medium' | 'large';
  status: 'pending' | 'approved' | 'picked' | 'in-transit' | 'delivered' | 'cancelled';
  cost: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  assignedDriver?: string;
  assignedVehicle?: string;
  createdAt: string;
  updatedAt: string;
  items: BookingItem[];
  specialInstructions?: string;
}

export interface BookingItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  fragile: boolean;
}

export interface Vehicle {
  id: string;
  vehicleNo: string;
  type: 'small' | 'medium' | 'large';
  capacity: number;
  driverId?: string;
  status: 'available' | 'busy' | 'maintenance';
  location: string;
  createdAt: string;
}

export interface TrackingUpdate {
  id: string;
  bookingId: string;
  status: string;
  location: string;
  timestamp: string;
  notes?: string;
  updatedBy: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  method: 'cash' | 'card' | 'upi' | 'netbanking';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  bookingId: string;
  userId: string;
  rating: number;
  comments: string;
  createdAt: string;
  customerName: string;
  isPublic: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: 'moving' | 'packing' | 'loading' | 'storage';
  icon: string;
}

export interface CompanyStats {
  totalCustomers: number;
  totalBookings: number;
  averageRating: number;
  yearsInBusiness: number;
}