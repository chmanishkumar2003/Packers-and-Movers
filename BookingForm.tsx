import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { dataService } from '../utils/dataService';
import { BookingItem } from '../types';
import { MapPin, Calendar, Package, Truck, Plus, Minus, AlertTriangle, CheckCircle } from 'lucide-react';

const BookingForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupAddress: '',
    deliveryAddress: '',
    pickupDate: '',
    weight: 0,
    vehicleType: 'medium' as 'small' | 'medium' | 'large',
    specialInstructions: '',
    items: [] as BookingItem[],
    selectedServices: [] as string[]
  });
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    category: 'Furniture',
    fragile: false
  });

  const vehicleTypes = [
    { value: 'small', label: 'Small Vehicle (Car/Scooter)', capacity: '300 kg', price: 6000, description: 'Perfect for local shifting & small items' },
    { value: 'medium', label: 'Medium Vehicle', capacity: '1000 kg', price: 15000, description: 'Ideal for 2-3BHK homes' },
    { value: 'large', label: 'Large Vehicle', capacity: '2000 kg', price: 25000, description: 'Best for 4BHK+ or offices' }
  ];

  const categories = ['Furniture', 'Electronics', 'Appliances', 'Clothing', 'Books', 'Kitchenware', 'Decorative', 'Documents', 'Other'];

  const services = [
    { id: 'packing', name: 'Packing Services', price: 2000, description: 'Professional packing of items' },
    { id: 'unpacking', name: 'Unpacking Services', price: 1500, description: 'Unpacking at destination' },
    { id: 'loading', name: 'Loading Services', price: 1000, description: 'Loading items into vehicle' },
    { id: 'unloading', name: 'Unloading Services', price: 1000, description: 'Unloading items from vehicle' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const addItem = () => {
    if (newItem.name.trim()) {
      const item: BookingItem = {
        id: Date.now().toString(),
        ...newItem
      };
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, item]
      }));
      setNewItem({
        name: '',
        quantity: 1,
        category: 'Furniture',
        fragile: false
      });
    }
  };

  const removeItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      }));
    }
  };

  const calculateEstimatedCost = () => {
    const basePrice = vehicleTypes.find(v => v.value === formData.vehicleType)?.price || 15000;
    const weightMultiplier = Math.max(1, formData.weight / 500);
    const itemsMultiplier = Math.max(1, formData.items.length / 10);
    const servicesPrice = formData.selectedServices.reduce((sum, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);
    return Math.round(basePrice * weightMultiplier * itemsMultiplier + servicesPrice);
  };

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        userId: user!.id,
        cost: calculateEstimatedCost()
      };

      const booking = await dataService.createBooking(bookingData);
      navigate('/track?id=' + booking.trackingId);
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.pickupAddress && formData.deliveryAddress && formData.pickupDate;
      case 2:
        return formData.weight > 0 && formData.items.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Moving Service</h1>
          <p className="text-gray-600 mt-2">Professional packing and moving services at your doorstep</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= stepNumber 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {step > stepNumber ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-20">
            <span className={`text-sm ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Location & Date
            </span>
            <span className={`text-sm ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Items & Vehicle
            </span>
            <span className={`text-sm ${step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Review & Confirm
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Location and Date */}
            {step === 1 && (
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-blue-600" />
                  Pickup & Delivery Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Address *
                    </label>
                    <textarea
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter complete pickup address with landmark"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter complete delivery address with landmark"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Pickup Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Items and Vehicle */}
            {step === 2 && (
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Package className="h-6 w-6 mr-2 text-blue-600" />
                  Items & Vehicle Selection
                </h2>

                <div className="space-y-6">
                  {/* Add Items */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Add Items to Move</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div>
                        <input
                          type="text"
                          placeholder="Item name"
                          value={newItem.name}
                          onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <select
                          value={newItem.category}
                          onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Qty"
                          min="1"
                          value={newItem.quantity}
                          onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={addItem}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </button>
                    </div>

                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id="fragile"
                        checked={newItem.fragile}
                        onChange={(e) => setNewItem(prev => ({ ...prev, fragile: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="fragile" className="ml-2 text-sm text-gray-700 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1 text-orange-500" />
                        Mark as fragile (requires special handling)
                      </label>
                    </div>
                  </div>

                  {/* Items List */}
                  {formData.items.length > 0 && (
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Items List ({formData.items.length})</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {formData.items.map(item => (
                          <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <span className="font-medium text-gray-900">{item.name}</span>
                                <span className="text-sm text-gray-500">({item.category})</span>
                                {item.fragile && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Fragile
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <button
                                  type="button"
                                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-red-400 hover:text-red-600"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Estimated Weight */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Total Weight (kg) *
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Approximate total weight of all items"
                    />
                  </div>

                  {/* Vehicle Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Select Vehicle Type *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {vehicleTypes.map(vehicle => (
                        <div
                          key={vehicle.value}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition duration-200 ${
                            formData.vehicleType === vehicle.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, vehicleType: vehicle.value as any }))}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Truck className="h-6 w-6 text-gray-600" />
                            <span className="text-lg font-semibold text-gray-900">₹{vehicle.price.toLocaleString()}</span>
                          </div>
                          <h3 className="font-medium text-gray-900">{vehicle.label}</h3>
                          <p className="text-sm text-gray-600 mt-1">{vehicle.description}</p>
                          <p className="text-sm text-gray-500 mt-1">Capacity: {vehicle.capacity}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Additional Services (Optional)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map(service => (
                        <div
                          key={service.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition duration-200 ${
                            formData.selectedServices.includes(service.id)
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => toggleService(service.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Package className="h-5 w-5 text-gray-600" />
                            <span className="text-sm font-semibold text-gray-900">+₹{service.price}</span>
                          </div>
                          <h4 className="font-medium text-gray-900">{service.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Any special handling requirements or additional notes..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review and Confirm */}
            {step === 3 && (
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2 text-blue-600" />
                  Review & Confirm Booking
                </h2>

                <div className="space-y-6">
                  {/* Booking Summary */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Pickup Details</h4>
                        <p className="text-sm text-gray-600 mb-2">{formData.pickupAddress}</p>
                        <p className="text-sm text-gray-500">Date: {new Date(formData.pickupDate).toLocaleDateString()}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Delivery Details</h4>
                        <p className="text-sm text-gray-600">{formData.deliveryAddress}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Vehicle & Weight</h4>
                          <p className="text-sm text-gray-600">
                            {vehicleTypes.find(v => v.value === formData.vehicleType)?.label}
                          </p>
                          <p className="text-sm text-gray-500">Weight: {formData.weight} kg</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Items Count</h4>
                          <p className="text-sm text-gray-600">{formData.items.length} items</p>
                          <p className="text-sm text-gray-500">
                            {formData.items.filter(i => i.fragile).length} fragile items
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Estimated Cost</h4>
                          <p className="text-2xl font-bold text-blue-600">₹{calculateEstimatedCost().toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Final cost after inspection</p>
                          {formData.selectedServices.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Additional Services:</p>
                              <ul className="text-xs text-gray-500 mt-1">
                                {formData.selectedServices.map(serviceId => {
                                  const service = services.find(s => s.id === serviceId);
                                  return service ? (
                                    <li key={serviceId}>• {service.name} (+₹{service.price})</li>
                                  ) : null;
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {formData.specialInstructions && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Special Instructions</h4>
                        <p className="text-sm text-gray-600">{formData.specialInstructions}</p>
                      </div>
                    )}
                  </div>

                  {/* Important Notes */}
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <h4 className="font-medium mb-1">Important Notes:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Final quotation will be provided after physical inspection</li>
                          <li>Our team will contact you within 24 hours</li>
                          <li>Payment is due upon completion of service</li>
                          <li>Insurance coverage available for valuable items</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-between">
              <div>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
                  >
                    Previous
                  </button>
                )}
              </div>
              
              <div>
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid(step)}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Booking...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;