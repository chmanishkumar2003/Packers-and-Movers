import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { dataService } from '../utils/dataService';
import { Booking, TrackingUpdate } from '../types';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Package, 
  Truck, 
  CheckCircle, 
  AlertCircle,
  Phone,
  Mail,
  IndianRupee,
  User,
  Navigation
} from 'lucide-react';

const TrackOrder: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get('id') || '');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [trackingUpdates, setTrackingUpdates] = useState<TrackingUpdate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (trackingId) {
      handleSearch();
    }
  }, []);

  const handleSearch = async () => {
    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const foundBooking = await dataService.getBookingByTrackingId(trackingId);
      
      if (foundBooking) {
        setBooking(foundBooking);
        const updates = await dataService.getTrackingUpdates(foundBooking.id);
        setTrackingUpdates(updates);
        
        // Update URL
        setSearchParams({ id: trackingId });
      } else {
        setError('No booking found with this tracking ID');
        setBooking(null);
        setTrackingUpdates([]);
      }
    } catch (err) {
      setError('Error searching for booking. Please try again.');
      setBooking(null);
      setTrackingUpdates([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'text-yellow-600 bg-yellow-100 border-yellow-200',
      'approved': 'text-blue-600 bg-blue-100 border-blue-200',
      'picked': 'text-orange-600 bg-orange-100 border-orange-200',
      'in-transit': 'text-purple-600 bg-purple-100 border-purple-200',
      'delivered': 'text-green-600 bg-green-100 border-green-200',
      'cancelled': 'text-red-600 bg-red-100 border-red-200'
    };
    return colors[status] || 'text-gray-600 bg-gray-100 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, React.ReactNode> = {
      'pending': <Clock className="h-5 w-5" />,
      'approved': <CheckCircle className="h-5 w-5" />,
      'picked': <Package className="h-5 w-5" />,
      'in-transit': <Truck className="h-5 w-5" />,
      'delivered': <CheckCircle className="h-5 w-5" />,
      'cancelled': <AlertCircle className="h-5 w-5" />
    };
    return icons[status] || <Clock className="h-5 w-5" />;
  };

  const getProgressPercentage = (status: string) => {
    const statusProgress: Record<string, number> = {
      'pending': 20,
      'approved': 40,
      'picked': 60,
      'in-transit': 80,
      'delivered': 100,
      'cancelled': 0
    };
    return statusProgress[status] || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-gray-600 mt-2">Enter your tracking ID to get real-time updates on your shipment</p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your tracking ID (e.g., PM1m2n3o4ABCD1234EFGH)"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Track Order
                </>
              )}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Booking Details */}
        {booking && (
          <div className="space-y-8">
            {/* Status Overview */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Booking #{booking.id}</h2>
                    <p className="text-gray-600 mt-1">Tracking ID: {booking.trackingId}</p>
                  </div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(booking.status)} mt-4 lg:mt-0`}>
                    {getStatusIcon(booking.status)}
                    <span className="ml-2 capitalize">{booking.status.replace('-', ' ')}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{getProgressPercentage(booking.status)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        booking.status === 'delivered' ? 'bg-green-600' : 
                        booking.status === 'cancelled' ? 'bg-red-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${getProgressPercentage(booking.status)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Pickup Date</p>
                    <p className="font-medium text-gray-900">{new Date(booking.pickupDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Items</p>
                    <p className="font-medium text-gray-900">{booking.items.length} items</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Truck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Vehicle</p>
                    <p className="font-medium text-gray-900 capitalize">{booking.vehicleType}</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <IndianRupee className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Total Cost</p>
                    <p className="font-medium text-gray-900">₹{booking.cost.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tracking Timeline */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Navigation className="h-5 w-5 mr-2 text-blue-600" />
                      Tracking Timeline
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    {trackingUpdates.length > 0 ? (
                      <div className="space-y-6">
                        {trackingUpdates.map((update, index) => (
                          <div key={update.id} className="relative">
                            {index < trackingUpdates.length - 1 && (
                              <div className="absolute left-4 top-10 w-0.5 h-16 bg-gray-200"></div>
                            )}
                            
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                                </div>
                              </div>
                              
                              <div className="ml-4 min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium text-gray-900">{update.status}</h4>
                                  <time className="text-sm text-gray-500">
                                    {new Date(update.timestamp).toLocaleString()}
                                  </time>
                                </div>
                                
                                <div className="mt-1 flex items-center text-sm text-gray-600">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{update.location}</span>
                                </div>
                                
                                {update.notes && (
                                  <p className="mt-2 text-sm text-gray-500">{update.notes}</p>
                                )}
                                
                                <p className="mt-1 text-xs text-gray-400">Updated by: {update.updatedBy}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No updates yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Tracking information will appear here once available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Booking Details & Contact */}
              <div className="space-y-8">
                {/* Address Details */}
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                      Address Details
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Pickup Address</h4>
                      <p className="text-sm text-gray-600">{booking.pickupAddress}</p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Delivery Address</h4>
                      <p className="text-sm text-gray-600">{booking.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Driver & Vehicle Info */}
                {booking.assignedDriver && (
                  <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        Assigned Team
                      </h3>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Driver</h4>
                        <p className="text-sm text-gray-600">{booking.assignedDriver}</p>
                      </div>
                      
                      {booking.assignedVehicle && (
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Vehicle Number</h4>
                          <p className="text-sm text-gray-600">{booking.assignedVehicle}</p>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Driver
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Items List */}
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Package className="h-5 w-5 mr-2 text-blue-600" />
                      Items ({booking.items.length})
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {booking.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.category}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">×{item.quantity}</span>
                            {item.fragile && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Fragile
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sample Tracking IDs for testing */}
        {!booking && !loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-3">Sample Tracking ID for Testing:</h3>
            <div className="space-y-2">
              <button
                onClick={() => setTrackingId('PM1m2n3o4ABCD1234EFGH')}
                className="block w-full text-left px-4 py-2 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition duration-200"
              >
                <code className="text-sm font-mono text-blue-800">PM1m2n3o4ABCD1234EFGH</code>
                <span className="text-sm text-blue-600 ml-2">(In-Transit Order)</span>
              </button>
            </div>
            <p className="text-sm text-blue-700 mt-3">Click on the sample ID above to auto-fill and test the tracking functionality.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;