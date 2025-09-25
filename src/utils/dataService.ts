import { User, Booking, Vehicle, TrackingUpdate, Payment, Feedback } from '../types';
import { generateTrackingId, generateBookingId, generateUserId } from './trackingIdGenerator';

// Generate more sample data for 2025
const generateSampleBookings = () => {
  const sampleBookings = [];
  const statuses: Booking['status'][] = ['pending', 'approved', 'picked', 'in-transit', 'delivered'];
  const vehicleTypes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
  
  for (let i = 0; i < 15; i++) {
    const randomDate = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    sampleBookings.push({
      id: generateBookingId(),
      userId: '1',
      trackingId: generateTrackingId(),
      pickupAddress: `${Math.floor(Math.random() * 999) + 1} Sample Street, Mumbai, Maharashtra 400001`,
      deliveryAddress: `${Math.floor(Math.random() * 999) + 1} Destination Road, Delhi, Delhi 110001`,
      pickupDate: randomDate.toISOString().split('T')[0],
      deliveryDate: new Date(randomDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      weight: Math.floor(Math.random() * 1000) + 100,
      vehicleType: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      cost: Math.floor(Math.random() * 20000) + 5000,
      paymentStatus: Math.random() > 0.3 ? 'paid' : 'pending',
      assignedDriver: Math.random() > 0.5 ? 'Driver Kumar' : 'Driver Singh',
      assignedVehicle: `MH0${Math.floor(Math.random() * 9) + 1}AB${Math.floor(Math.random() * 9000) + 1000}`,
      createdAt: randomDate.toISOString(),
      updatedAt: randomDate.toISOString(),
      items: [
        { id: '1', name: 'Furniture Set', quantity: Math.floor(Math.random() * 3) + 1, category: 'Furniture', fragile: false },
        { id: '2', name: 'Electronics', quantity: Math.floor(Math.random() * 2) + 1, category: 'Electronics', fragile: true }
      ],
      specialInstructions: Math.random() > 0.7 ? 'Handle with care' : undefined
    });
  }
  return sampleBookings;
};

// Simulated data storage (in a real app, this would be API calls)
class DataService {
  private users: User[] = [
    {
      id: '1',
      name: 'John',
      email: 'customer@example.com',
      phone: '+91-9876543210',
      role: 'customer',
      address: '123 Main Street, Mumbai',
      createdAt: new Date().toISOString()
    },
    {
  id: '2',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91-9812345670',
  role: 'customer',
  address: '45 Park Avenue, Delhi',
  createdAt: new Date().toISOString()
},
{
  id: '3',
  name: 'Rohit Verma',
  email: 'rohit.verma@example.com',
  phone: '+91-9922334455',
  role: 'customer',
  address: '78 MG Road, Bengaluru',
  createdAt: new Date().toISOString()
},
{
  id: '4',
  name: 'Anjali Mehta',
  email: 'anjali.mehta@example.com',
  phone: '+91-9871234567',
  role: 'customer',
  address: '56 Lake View, Pune',
  createdAt: new Date().toISOString()
},
{
  id: '5',
  name: 'Karan Singh',
  email: 'karan.singh@example.com',
  phone: '+91-9765432109',
  role: 'customer',
  address: '12 Sector 22, Chandigarh',
  createdAt: new Date().toISOString()
},
{
  id: '6',
  name: 'Sneha Gupta',
  email: 'sneha.gupta@example.com',
  phone: '+91-9911223344',
  role: 'customer',
  address: '34 Green Park, Lucknow',
  createdAt: new Date().toISOString()
},
{
  id: '7',
  name: 'Arjun Nair',
  email: 'arjun.nair@example.com',
  phone: '+91-9001122334',
  role: 'customer',
  address: '22 Marine Drive, Kochi',
  createdAt: new Date().toISOString()
},
{
  id: '8',
  name: 'Meera Iyer',
  email: 'meera.iyer@example.com',
  phone: '+91-9898989898',
  role: 'customer',
  address: '88 Anna Nagar, Chennai',
  createdAt: new Date().toISOString()
},
{
  id: '9',
  name: 'Vikram Malhotra',
  email: 'vikram.malhotra@example.com',
  phone: '+91-9933445566',
  role: 'customer',
  address: '99 Sector 18, Noida',
  createdAt: new Date().toISOString()
},
{
  id: '10',
  name: 'Aditi Jain',
  email: 'aditi.jain@example.com',
  phone: '+91-9955667788',
  role: 'customer',
  address: '67 Civil Lines, Jaipur',
  createdAt: new Date().toISOString()
},
{
  id: '11',
  name: 'Ramesh Kumar',
  email: 'ramesh.kumar@example.com',
  phone: '+91-9876501234',
  role: 'customer',
  address: '101 Gandhi Road, Hyderabad',
  createdAt: new Date().toISOString()
}
,
    {
      id: '12',
      name: 'Admin User',
      email: 'admin@packersmovers.com',
      phone: '+91-9876543211',
      role: 'admin',
      createdAt: new Date().toISOString()
    },
    {
      id: '13',
      name: 'Driver Kumar',
      email: 'driver@example.com',
      phone: '+91-9876543212',
      role: 'driver',
      createdAt: new Date().toISOString()
    }
  ];

  private bookings: Booking[] = [
    {
      id: 'BK170579532001',
      userId: '1',
      trackingId: 'PM1m2n3o4ABCD1234EFGH',
      pickupAddress: '123 Main Street, Mumbai, Maharashtra 400001',
      deliveryAddress: '456 Oak Avenue, Delhi, Delhi 110001',
      pickupDate: '2025-01-20',
      deliveryDate: '2025-01-22',
      weight: 500,
      vehicleType: 'medium',
      status: 'in-transit',
      cost: 15000,
      paymentStatus: 'paid',
      assignedDriver: 'Driver Kumar',
      assignedVehicle: 'MH01AB1234',
      createdAt: '2025-01-18T10:00:00Z',
      updatedAt: '2025-01-20T14:30:00Z',
      items: [
        { id: '1', name: 'Sofa Set', quantity: 1, category: 'Furniture', fragile: false },
        { id: '2', name: 'Dining Table', quantity: 1, category: 'Furniture', fragile: false },
        { id: '3', name: 'TV', quantity: 1, category: 'Electronics', fragile: true }
      ],
      specialInstructions: 'Handle TV with extra care'
    },
    {
  id: 'BK170579532001',
  userId: '1',
  trackingId: 'PM1m2n3o4ABCD1234EFGH',
  pickupAddress: '123 Main Street, Mumbai, Maharashtra 400001',
  deliveryAddress: '456 Oak Avenue, Delhi, Delhi 110001',
  pickupDate: '2025-01-20',
  deliveryDate: '2025-01-22',
  weight: 500,
  vehicleType: 'medium',
  status: 'in-transit',
  cost: 15000,
  paymentStatus: 'paid',
  assignedDriver: 'Driver Kumar',
  assignedVehicle: 'MH01AB1234',
  createdAt: '2025-01-18T10:00:00Z',
  updatedAt: '2025-01-20T14:30:00Z',
  items: [
    { id: '1', name: 'Sofa Set', quantity: 1, category: 'Furniture', fragile: false },
    { id: '2', name: 'Dining Table', quantity: 1, category: 'Furniture', fragile: false },
    { id: '3', name: 'TV', quantity: 1, category: 'Electronics', fragile: true }
  ],
  specialInstructions: 'Handle TV with extra care'
},
{
  id: 'BK170579532002',
  userId: '2',
  trackingId: 'PM2a3b4c5XYZ7890JKLM',
  pickupAddress: '45 Park Avenue, Delhi, Delhi 110002',
  deliveryAddress: '78 MG Road, Bengaluru, Karnataka 560001',
  pickupDate: '2025-02-01',
  deliveryDate: '2025-02-05',
  weight: 1200,
  vehicleType: 'large',
  status: 'delivered',
  cost: 35000,
  paymentStatus: 'paid',
  assignedDriver: 'Driver Ramesh',
  assignedVehicle: 'DL05XY9876',
  createdAt: '2025-01-28T11:15:00Z',
  updatedAt: '2025-02-05T18:20:00Z',
  items: [
    { id: '1', name: 'Bed', quantity: 2, category: 'Furniture', fragile: false },
    { id: '2', name: 'Wardrobe', quantity: 1, category: 'Furniture', fragile: false },
    { id: '3', name: 'Glass Center Table', quantity: 1, category: 'Furniture', fragile: true }
  ],
  specialInstructions: 'Keep glass items on top'
},
{
  id: 'BK170579532003',
  userId: '3',
  trackingId: 'PM3d4e5f6LMN2345PQRS',
  pickupAddress: '56 Lake View, Pune, Maharashtra 411001',
  deliveryAddress: '12 Sector 22, Chandigarh, Chandigarh 160022',
  pickupDate: '2025-02-10',
  deliveryDate: '2025-02-12',
  weight: 700,
  vehicleType: 'medium',
  status: 'in-transit',
  cost: 20000,
  paymentStatus: 'paid',
  assignedDriver: 'Driver Singh',
  assignedVehicle: 'MH12CD4567',
  createdAt: '2025-02-07T09:30:00Z',
  updatedAt: '2025-02-10T12:45:00Z',
  items: [
    { id: '1', name: 'Books', quantity: 10, category: 'Household', fragile: false },
    { id: '2', name: 'Microwave Oven', quantity: 1, category: 'Electronics', fragile: true }
  ],
  specialInstructions: 'Do not place heavy items on microwave'
},
{
  id: 'BK170579532004',
  userId: '4',
  trackingId: 'PM4g5h6i7TUV5678WXYZ',
  pickupAddress: '34 Green Park, Lucknow, Uttar Pradesh 226001',
  deliveryAddress: '22 Marine Drive, Kochi, Kerala 682001',
  pickupDate: '2025-02-15',
  deliveryDate: '2025-02-20',
  weight: 2500,
  vehicleType: 'large',
  status: 'in-transit',
  cost: 50000,
  paymentStatus: 'pending',
  assignedDriver: 'Driver Das',
  assignedVehicle: 'UP32EF7890',
  createdAt: '2025-02-12T16:00:00Z',
  updatedAt: '2025-02-15T09:10:00Z',
  items: [
    { id: '1', name: 'Refrigerator', quantity: 1, category: 'Electronics', fragile: true },
    { id: '2', name: 'Washing Machine', quantity: 1, category: 'Electronics', fragile: false },
    { id: '3', name: 'Clothes Cartons', quantity: 5, category: 'Household', fragile: false }
  ],
  specialInstructions: 'Refrigerator should remain upright during transit'
},
{
  id: 'BK170579532005',
  userId: '5',
  trackingId: 'PM5j6k7l8ABC9876DEFG',
  pickupAddress: '88 Anna Nagar, Chennai, Tamil Nadu 600040',
  deliveryAddress: '99 Sector 18, Noida, Uttar Pradesh 201301',
  pickupDate: '2025-03-01',
  deliveryDate: '2025-03-06',
  weight: 3000,
  vehicleType: 'large',
  status: 'picked',
  cost: 60000,
  paymentStatus: 'paid',
  assignedDriver: 'Driver Rajan',
  assignedVehicle: 'TN09GH6543',
  createdAt: '2025-02-26T10:45:00Z',
  updatedAt: '2025-03-01T08:20:00Z',
  items: [
    { id: '1', name: 'Office Chairs', quantity: 20, category: 'Furniture', fragile: false },
    { id: '2', name: 'Desktop Computers', quantity: 10, category: 'Electronics', fragile: true },
    { id: '3', name: 'Conference Table', quantity: 1, category: 'Furniture', fragile: false }
  ],
  specialInstructions: 'Keep computers in shock-proof packing'
},
{
  id: 'BK170579532006',
  userId: '6',
  trackingId: 'PM6m7n8o9HIJ1234KLMN',
  pickupAddress: '101 Gandhi Road, Hyderabad, Telangana 500001',
  deliveryAddress: '67 Civil Lines, Jaipur, Rajasthan 302001',
  pickupDate: '2025-03-10',
  deliveryDate: '2025-03-13',
  weight: 900,
  vehicleType: 'medium',
  status: 'in-transit',
  cost: 22000,
  paymentStatus: 'paid',
  assignedDriver: 'Driver Hussain',
  assignedVehicle: 'TS07IJ2345',
  createdAt: '2025-03-08T14:25:00Z',
  updatedAt: '2025-03-10T15:40:00Z',
  items: [
    { id: '1', name: 'Cupboard', quantity: 1, category: 'Furniture', fragile: false },
    { id: '2', name: 'Glass Crockery Set', quantity: 2, category: 'Kitchenware', fragile: true }
  ],
  specialInstructions: 'Crockery should be handled with bubble wrap'
},
{
  id: 'BK170579532007',
  userId: '7',
  trackingId: 'PM7p8q9r0NOP4567QRST',
  pickupAddress: '12 Sector 9, Gandhinagar, Gujarat 382007',
  deliveryAddress: '56 Residency Road, Indore, Madhya Pradesh 452001',
  pickupDate: '2025-03-15',
  deliveryDate: '2025-03-16',
  weight: 400,
  vehicleType: 'small',
  status: 'delivered',
  cost: 8000,
  paymentStatus: 'paid',
  assignedDriver: 'Driver Patel',
  assignedVehicle: 'GJ01KL9988',
  createdAt: '2025-03-13T09:40:00Z',
  updatedAt: '2025-03-16T11:10:00Z',
  items: [
    { id: '1', name: 'Clothes Cartons', quantity: 3, category: 'Household', fragile: false },
    { id: '2', name: 'Wall Clock', quantity: 1, category: 'Household', fragile: true }
  ],
  specialInstructions: 'Wall clock should be wrapped separately'
},
{
  id: 'BK170579532008',
  userId: '8',
  trackingId: 'PM8s9t0u1UVW6789XYZA',
  pickupAddress: '77 City Center, Ahmedabad, Gujarat 380015',
  deliveryAddress: '11 Residency Lane, Patna, Bihar 800001',
  pickupDate: '2025-03-18',
  deliveryDate: '2025-03-21',
  weight: 1100,
  vehicleType: 'large',
  status: 'cancelled',
  cost: 25000,
  paymentStatus: 'paid',
  assignedDriver: 'Driver Jha',
  assignedVehicle: 'GJ18MN3344',
  createdAt: '2025-03-15T13:20:00Z',
  updatedAt: '2025-03-18T08:00:00Z',
  items: [
    { id: '1', name: 'Bookshelf', quantity: 1, category: 'Furniture', fragile: false },
    { id: '2', name: 'TV Unit', quantity: 1, category: 'Furniture', fragile: false }
  ],
  specialInstructions: 'Cancelled before packing started'
},
{
  id: 'BK170579532009',
  userId: '9',
  trackingId: 'PM9v0w1x2YZA1234BCDE',
  pickupAddress: '23 College Road, Nagpur, Maharashtra 440001',
  deliveryAddress: '19 Hill Road, Shimla, Himachal Pradesh 171001',
  pickupDate: '2025-03-22',
  deliveryDate: '2025-03-25',
  weight: 1500,
  vehicleType: 'large',
  status: 'in-transit',
  cost: 30000,
  paymentStatus: 'paid',
  assignedDriver: 'Driver Sharma',
  assignedVehicle: 'MH31OP6677',
  createdAt: '2025-03-20T10:15:00Z',
  updatedAt: '2025-03-22T12:30:00Z',
  items: [
    { id: '1', name: 'Double Bed', quantity: 1, category: 'Furniture', fragile: false },
    { id: '2', name: 'Mirror', quantity: 1, category: 'Household', fragile: true }
  ],
  specialInstructions: 'Mirror to be transported vertically'
},
{
  id: 'BK170579532010',
  userId: '10',
  trackingId: 'PM0y1z2a3CDE5678FGHI',
  pickupAddress: '66 Nehru Street, Surat, Gujarat 395001',
  deliveryAddress: '45 Connaught Place, Delhi, Delhi 110001',
  pickupDate: '2025-03-28',
  deliveryDate: '2025-03-30',
  weight: 800,
  vehicleType: 'medium',
  status: 'pending',
  cost: 18000,
  paymentStatus: 'pending',
  assignedDriver: 'Driver Lal',
  assignedVehicle: 'GJ05QR2299',
  createdAt: '2025-03-26T14:00:00Z',
  updatedAt: '2025-03-28T09:15:00Z',
  items: [
    { id: '1', name: 'Air Conditioner', quantity: 1, category: 'Electronics', fragile: true },
    { id: '2', name: 'Small Cupboard', quantity: 1, category: 'Furniture', fragile: false }
  ],
  specialInstructions: 'AC must be packed with foam support'
},
{
  id: 'BK170579532011',
  userId: '11',
  trackingId: 'PM1b2c3d4JKL9876MNOP',
  pickupAddress: '14 City Tower, Bhopal, Madhya Pradesh 462001',
  deliveryAddress: '88 MG Road, Kolkata, West Bengal 700001',
  pickupDate: '2025-04-01',
  deliveryDate: '2025-04-05',
  weight: 2800,
  vehicleType: 'large',
  status: 'delivered',
  cost: 55000,
  paymentStatus: 'paid',
  assignedDriver: 'Driver Banerjee',
  assignedVehicle: 'MP09ST7788',
  createdAt: '2025-03-29T11:30:00Z',
  updatedAt: '2025-04-01T10:20:00Z',
  items: [
    { id: '1', name: 'Office Desks', quantity: 15, category: 'Furniture', fragile: false },
    { id: '2', name: 'Projectors', quantity: 3, category: 'Electronics', fragile: true },
    { id: '3', name: 'Document Boxes', quantity: 12, category: 'Office Supplies', fragile: false }
  ],
  specialInstructions: 'Projectors must be shock-proof packed'
}
,
    ...generateSampleBookings()
  ];

  private vehicles: Vehicle[] = [
    {
      id: '1',
      vehicleNo: 'MH01AB1234',
      type: 'medium',
      capacity: 1000,
      driverId: '3',
      status: 'busy',
      location: 'Mumbai Central',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      vehicleNo: 'MH02CD5678',
      type: 'large',
      capacity: 2000,
      status: 'available',
      location: 'Depot - Andheri',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      vehicleNo: 'MH03EF9012',
      type: 'small',
      capacity: 300,
      status: 'available',
      location: 'Depot - Bandra',
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      vehicleNo: 'MH04GH3456',
      type: 'small',
      capacity: 250,
      status: 'busy',
      location: 'Local Delivery Route',
      createdAt: new Date().toISOString()
    }
  ];

  private trackingUpdates: TrackingUpdate[] = [
    {
      id: '1',
      bookingId: 'BK170579532001',
      status: 'Booking Confirmed',
      location: 'Mumbai Office',
      timestamp: '2024-01-18T10:00:00Z',
      notes: 'Booking confirmed and payment received',
      updatedBy: 'System'
    },
    {
      id: '2',
      bookingId: 'BK170579532001',
      status: 'Pickup Scheduled',
      location: 'Mumbai Office',
      timestamp: '2024-01-19T09:00:00Z',
      notes: 'Driver and vehicle assigned for pickup',
      updatedBy: 'Admin'
    },
    {
      id: '3',
      bookingId: 'BK170579532001',
      status: 'Items Picked Up',
      location: '123 Main Street, Mumbai',
      timestamp: '2024-01-20T08:30:00Z',
      notes: 'All items picked up successfully',
      updatedBy: 'Driver Kumar'
    },
    {
      id: '4',
      bookingId: 'BK170579532001',
      status: 'In Transit',
      location: 'Mumbai-Delhi Highway, Nashik',
      timestamp: '2024-01-20T14:30:00Z',
      notes: 'Vehicle en route to Delhi',
      updatedBy: 'Driver Kumar'
    }
  ];

  private feedback: Feedback[] = [
    {
      id: '1',
      bookingId: 'BK170579532001',
      userId: '1',
      rating: 5,
      comments: 'Excellent service! The team was professional and handled everything with care.',
      createdAt: '2025-01-22T10:00:00Z',
      customerName: 'John Customer',
      isPublic: true
    },
    {
      id: '2',
      bookingId: 'BK170579532002',
      userId: '1',
      rating: 4,
      comments: 'Good service, but delivery was slightly delayed.',
      createdAt: '2025-01-15T14:30:00Z',
      customerName: 'Sarah Wilson',
      isPublic: true
    },
    {
      id: '3',
      bookingId: 'BK170579532003',
      userId: '1',
      rating: 5,
      comments: 'Outstanding packing and moving service. Highly recommended!',
      createdAt: '2025-01-10T09:15:00Z',
      customerName: 'Mike Johnson',
      isPublic: true
    }
    ,{
      id: '4',
      bookingId: 'BK170579532004',
      userId: '1',
      rating: 5,
      comments: 'Highly recommended!',
      createdAt: '2025-02-11T09:15:00Z',
      customerName: 'Johnsown',
      isPublic: true
    }
    ,{
  id: '5',
  bookingId: 'BK170579532005',
  userId: '2',
  rating: 4,
  comments: 'The service was good and timely, packaging could be improved.',
  createdAt: '2025-02-12T11:30:00Z',
  customerName: 'Priya Sharma',
  isPublic: true
},
{
  id: '6',
  bookingId: 'BK170579532006',
  userId: '3',
  rating: 5,
  comments: 'Very professional and careful with fragile items. Great experience!',
  createdAt: '2025-02-13T14:20:00Z',
  customerName: 'Rohit Verma',
  isPublic: true
},
{
  id: '7',
  bookingId: 'BK170579532007',
  userId: '4',
  rating: 3,
  comments: 'Affordable price but delivery was slightly delayed.',
  createdAt: '2025-02-14T16:45:00Z',
  customerName: 'Anjali Mehta',
  isPublic: true
},
{
  id: '8',
  bookingId: 'BK170579532008',
  userId: '5',
  rating: 5,
  comments: 'Smooth shifting process, staff was very cooperative.',
  createdAt: '2025-02-15T09:00:00Z',
  customerName: 'Karan Singh',
  isPublic: true
},
{
  id: '9',
  bookingId: 'BK170579532009',
  userId: '6',
  rating: 4,
  comments: 'Packing quality was good, team was polite and supportive.',
  createdAt: '2025-02-16T13:25:00Z',
  customerName: 'Sneha Gupta',
  isPublic: true
},
{
  id: '10',
  bookingId: 'BK170579532010',
  userId: '7',
  rating: 5,
  comments: 'Excellent service! Everything reached safely without any damage.',
  createdAt: '2025-02-17T10:50:00Z',
  customerName: 'Arjun Nair',
  isPublic: true
},
{
  id: '11',
  bookingId: 'BK170579532011',
  userId: '8',
  rating: 2,
  comments: 'Some items were scratched during shifting, not very satisfied.',
  createdAt: '2025-02-18T12:10:00Z',
  customerName: 'Meera Iyer',
  isPublic: true
},
{
  id: '12',
  bookingId: 'BK170579532012',
  userId: '9',
  rating: 5,
  comments: 'Quick, reliable, and stress-free moving. Highly recommended!',
  createdAt: '2025-02-19T08:40:00Z',
  customerName: 'Vikram Malhotra',
  isPublic: true
},
{
  id: '13',
  bookingId: 'BK170579532013',
  userId: '10',
  rating: 4,
  comments: 'Good service overall, but communication could be better.',
  createdAt: '2025-02-20T15:35:00Z',
  customerName: 'Aditi Jain',
  isPublic: true
},
{
  id: '14',
  bookingId: 'BK170579532014',
  userId: '11',
  rating: 5,
  comments: 'Best movers I’ve used so far, everything was handled with care.',
  createdAt: '2025-02-21T17:55:00Z',
  customerName: 'Ramesh Kumar',
  isPublic: true
}

  ];

  private services = [
    {
      id: '1',
      name: 'Full Home Moving',
      description: 'Complete household shifting with packing and unpacking',
      basePrice: 15000,
      category: 'moving' as const,
      icon: 'home'
    },
    {
      id: '2',
      name: 'Packing Services',
      description: 'Professional packing of your belongings',
      basePrice: 5000,
      category: 'packing' as const,
      icon: 'package'
    },
    {
      id: '3',
      name: 'Loading & Unloading',
      description: 'Loading and unloading services only',
      basePrice: 3000,
      category: 'loading' as const,
      icon: 'truck'
    },
    {
      id: '4',
      name: 'Local Shifting',
      description: 'Within city moving with small vehicles',
      basePrice: 8000,
      category: 'moving' as const,
      icon: 'map-pin'
    }
  ];
  // User Authentication
  async authenticateUser(email: string, password: string): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = this.users.find(u => u.email === email);
    
    // Simple password check (in real app, use proper password hashing)
    const validPasswords: Record<string, string> = {
      'customer@example.com': 'customer123',
      'admin@packersmovers.com': 'admin123',
      'driver@example.com': 'driver123'
    };
    
    if (user && validPasswords[email] === password) {
      return user;
    }
    
    return null;
  }

  async registerUser(userData: Partial<User> & { password: string }): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: generateUserId(),
      name: userData.name!,
      email: userData.email!,
      phone: userData.phone!,
      role: 'customer',
      address: userData.address,
      createdAt: new Date().toISOString()
    };
    
    this.users.push(newUser);
    return newUser;
  }

  // Booking Management
  async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBooking: Booking = {
      ...bookingData,
      id: generateBookingId(),
      trackingId: generateTrackingId(),
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Booking;
    
    this.bookings.push(newBooking);
    
    // Add initial tracking update
    this.trackingUpdates.push({
      id: Date.now().toString(),
      bookingId: newBooking.id,
      status: 'Booking Created',
      location: 'System',
      timestamp: new Date().toISOString(),
      notes: 'New booking created successfully',
      updatedBy: 'System'
    });
    
    return newBooking;
  }

  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.bookings.filter(booking => booking.userId === userId);
  }

  async getAllBookings(): Promise<Booking[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.bookings;
  }

  async getBookingByTrackingId(trackingId: string): Promise<Booking | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.bookings.find(booking => booking.trackingId === trackingId) || null;
  }

  async updateBookingStatus(bookingId: string, status: Booking['status'], location?: string, notes?: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const booking = this.bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = status;
      booking.updatedAt = new Date().toISOString();
      
      // Add tracking update
      this.trackingUpdates.push({
        id: Date.now().toString(),
        bookingId,
        status: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' '),
        location: location || 'Unknown',
        timestamp: new Date().toISOString(),
        notes: notes || '',
        updatedBy: 'System'
      });
    }
  }

  // Tracking
  async getTrackingUpdates(bookingId: string): Promise<TrackingUpdate[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.trackingUpdates.filter(update => update.bookingId === bookingId);
  }

  // Vehicles
  async getAllVehicles(): Promise<Vehicle[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.vehicles;
  }

  async getAvailableVehicles(): Promise<Vehicle[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.vehicles.filter(vehicle => vehicle.status === 'available');
  }

  // Users
  async getAllUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.users;
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      totalBookings: this.bookings.length,
      pendingBookings: this.bookings.filter(b => b.status === 'pending').length,
      activeBookings: this.bookings.filter(b => ['approved', 'picked', 'in-transit'].includes(b.status)).length,
      completedBookings: this.bookings.filter(b => b.status === 'delivered').length,
      totalRevenue: this.bookings.reduce((sum, b) => sum + (b.paymentStatus === 'paid' ? b.cost : 0), 0),
      availableVehicles: this.vehicles.filter(v => v.status === 'available').length,
      totalVehicles: this.vehicles.length,
      totalUsers: this.users.filter(u => u.role === 'customer').length,
      averageRating: this.feedback.reduce((sum, f) => sum + f.rating, 0) / this.feedback.length || 0,
      totalFeedback: this.feedback.length
    };
  }

  // Feedback Management
  async getAllFeedback(): Promise<Feedback[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.feedback.filter(f => f.isPublic);
  }

  async addFeedback(feedbackData: Omit<Feedback, 'id' | 'createdAt'>): Promise<Feedback> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newFeedback: Feedback = {
      ...feedbackData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    this.feedback.push(newFeedback);
    return newFeedback;
  }

  // Services
  async getAllServices() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.services;
  }

  // User Management
  async updateUser(userId: string, userData: Partial<User>): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...userData };
      return this.users[userIndex];
    }
    return null;
  }

  async deleteUser(userId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return true;
    }
    return false;
  }
}

export const dataService = new DataService();