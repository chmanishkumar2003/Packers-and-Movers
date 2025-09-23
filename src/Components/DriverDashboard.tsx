import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { dataService } from '../utils/dataService';
import { Booking, User } from '../types';
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Navigation, 
  Phone,
  Camera,
  AlertTriangle,
  IndianRupee,
  Calendar
} from 'lucide-react';

const DriverDashboard: React.FC = () => {
  const { user } = useAuth();
  const [assignedBookings, setAssignedBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [allBookings, allUsers] = await Promise.all([
        dataService.getAllBookings(),
        dataService.getAllUsers()
      ]);
      
      // Filter bookings assigned to current driver
      const driverBookings = allBookings.filter(booking => 
        booking.assignedDriver === user?.name && 
        !['delivered', 'cancelled'].includes(booking.status)
      );
      
      setAssignedBookings(driverBookings);
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading driver data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: Booking['status'], location?: string) => {
    setUpdatingStatus(bookingId);
    try {
      await dataService.updateBookingStatus(
        bookingId, 
        newStatus, 
        location || 'Driver Update',
        `Status updated to ${newStatus} by driver`
      );
      await loadData(); // Refresh data
    } catch (error) {
      console.error('Error updating booking status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'approved': 'bg-blue-100 text-blue-800 border-blue-200',
      'picked': 'bg-orange-100 text-orange-800 border-orange-200',
      'in-transit': 'bg-purple-100 text-purple-800 border-purple-200',
      'delivered': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getNextStatusOptions = (currentStatus: string) => {
    const statusFlow: Record<string, { status: Booking['status'], label: string }[]> = {
      'approved': [
        { status: 'picked', label: 'Mark as Picked Up' }
      ],
      'picked': [
        { status: 'in-transit', label: 'Start Transit' }
      ],
      'in-transit': [
        { status: 'delivered', label: 'Mark as Delivered' }
      ]
    };
    return statusFlow[currentStatus] || [];
  };

  const getCustomerDetails = (userId: string) => {
    return users.find(u => u.id === userId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Driver Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {user?.name}! Manage your assigned deliveries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{assignedBookings.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Pickup</p>
                <p className="text-3xl font-bold text-gray-900">
                  {assignedBookings.filter(b => b.status === 'approved').length}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-3xl font-bold text-gray-900">
                  {assignedBookings.filter(b => ['picked', 'in-transit'].includes(b.status)).length}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Navigation className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  ₹{assignedBookings.reduce((sum, b) => sum + b.cost, 0).toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Your Active Deliveries</h2>
              <span className="text-sm text-gray-500">{assignedBookings.length} jobs assigned</span>
            </div>
          </div>

          {assignedBookings.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No active deliveries</h3>
              <p className="mt-1 text-sm text-gray-500">
                You have no active deliveries at the moment. Check back later for new assignments.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {assignedBookings.map(booking => {
                const customer = getCustomerDetails(booking.userId);
                return (
                  <div key={booking.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              Booking #{booking.id}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                              {booking.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Tracking ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{booking.trackingId}</code>
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Pickup: {new Date(booking.pickupDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">₹{booking.cost.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{booking.items.length} items</p>
                      </div>
                    </div>

                    {/* Customer Information */}
                    {customer && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Name: <span className="font-medium text-gray-900">{customer.name}</span></p>
                            <div className="flex items-center mt-1">
                              <Phone className="h-4 w-4 text-gray-400 mr-1" />
                              <a href={`tel:${customer.phone}`} className="text-sm text-blue-600 hover:text-blue-500">
                                {customer.phone}
                              </a>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Email: <span className="font-medium text-gray-900">{customer.email}</span></p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Addresses */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 text-green-600 mr-2" />
                          <h4 className="text-sm font-medium text-green-900">Pickup Address</h4>
                        </div>
                        <p className="text-sm text-green-800">{booking.pickupAddress}</p>
                        <button className="mt-2 inline-flex items-center px-3 py-1 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 transition duration-150">
                          <Navigation className="h-4 w-4 mr-1" />
                          Get Directions
                        </button>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                          <h4 className="text-sm font-medium text-blue-900">Delivery Address</h4>
                        </div>
                        <p className="text-sm text-blue-800">{booking.deliveryAddress}</p>
                        <button className="mt-2 inline-flex items-center px-3 py-1 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition duration-150">
                          <Navigation className="h-4 w-4 mr-1" />
                          Get Directions
                        </button>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Items to Transport</h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {booking.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <span className="text-gray-900">{item.name}</span>
                                {item.fragile && (
                                  <AlertTriangle className="h-4 w-4 text-orange-500 ml-1" title="Fragile item" />
                                )}
                              </div>
                              <span className="text-gray-500">×{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    {booking.specialInstructions && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-yellow-900">Special Instructions</h4>
                            <p className="text-sm text-yellow-800 mt-1">{booking.specialInstructions}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      {getNextStatusOptions(booking.status).map(option => (
                        <button
                          key={option.status}
                          onClick={() => updateBookingStatus(booking.id, option.status)}
                          disabled={updatingStatus === booking.id}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                        >
                          {updatingStatus === booking.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : (
                            <CheckCircle className="h-4 w-4 mr-2" />
                          )}
                          {option.label}
                        </button>
                      ))}

                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-200">
                        <Camera className="h-4 w-4 mr-2" />
                        Add Photo
                      </button>

                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-200">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Customer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;