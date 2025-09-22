import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { dataService } from '../utils/dataService';
import { Star, Send, MessageSquare, Mail, Phone, MapPin, Award, Users, CheckCircle } from 'lucide-react';

const CustomerFeedback: React.FC = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'feedback' | 'about'>('feedback');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating === 0) return;

    setLoading(true);
    try {
      await dataService.addFeedback({
        bookingId: bookingId || 'GENERAL',
        userId: user.id,
        rating,
        comments,
        customerName: user.name,
        isPublic: true
      });
      setSubmitted(true);
      setRating(0);
      setComments('');
      setBookingId('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-6 w-6 cursor-pointer transition-colors ${
          i < currentRating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-300'
        }`}
        onClick={interactive ? () => setRating(i + 1) : undefined}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Feedback & About Us</h1>
          <p className="text-gray-600 mt-2">Share your experience and learn more about PackMove Pro</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 justify-center">
              <button
                onClick={() => setActiveTab('feedback')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition duration-200 ${
                  activeTab === 'feedback'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="h-5 w-5 mr-2 inline" />
                Give Feedback
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition duration-200 ${
                  activeTab === 'about'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Award className="h-5 w-5 mr-2 inline" />
                About Us
              </button>
            </nav>
          </div>
        </div>

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="space-y-8">
            {/* Feedback Form */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
                  Share Your Experience
                </h2>
              </div>
              
              <div className="p-6">
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Submit Another Review
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Booking ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your booking ID if applicable"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rate Our Service *
                      </label>
                      <div className="flex items-center space-x-1">
                        {renderStars(rating, true)}
                        <span className="ml-3 text-sm text-gray-600">
                          {rating > 0 && `${rating}/5 stars`}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Comments *
                      </label>
                      <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Tell us about your experience with our service..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || rating === 0 || !comments.trim()}
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Send className="h-5 w-5 mr-2" />
                      )}
                      Submit Feedback
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Contact Us Directly</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium text-gray-900">Email Us</h4>
                    <p className="text-sm text-gray-600 mt-1">feedback@packmovepro.com</p>
                    <a
                      href="mailto:feedback@packmovepro.com"
                      className="inline-flex items-center mt-2 text-sm text-blue-600 hover:text-blue-500"
                    >
                      Send Email
                    </a>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium text-gray-900">Call Us</h4>
                    <p className="text-sm text-gray-600 mt-1">+91-9876543210</p>
                    <a
                      href="tel:+919876543210"
                      className="inline-flex items-center mt-2 text-sm text-green-600 hover:text-green-500"
                    >
                      Call Now
                    </a>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium text-gray-900">Visit Us</h4>
                    <p className="text-sm text-gray-600 mt-1">Mumbai, Maharashtra</p>
                    <a
                      href="#"
                      className="inline-flex items-center mt-2 text-sm text-purple-600 hover:text-purple-500"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Us Tab */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            {/* Company Overview */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Award className="h-6 w-6 mr-2 text-blue-600" />
                  About PackMove Pro
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Story</h3>
                    <p className="text-gray-600 mb-4">
                      Founded in 2020, PackMove Pro has been India's trusted partner for professional packing and moving services. 
                      We understand that moving is more than just transporting belongings – it's about moving lives, dreams, and memories.
                    </p>
                    <p className="text-gray-600 mb-4">
                      With over 5 years of experience and thousands of successful relocations, we've built our reputation on reliability, 
                      professionalism, and customer satisfaction. Our team of trained professionals ensures your belongings are handled 
                      with the utmost care and precision.
                    </p>
                    <p className="text-gray-600">
                      From local shifting to intercity moves, from residential relocations to corporate transfers, 
                      we provide comprehensive moving solutions tailored to your specific needs.
                    </p>
                  </div>
                  
                  <div>
                    <img 
                      src="https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop" 
                      alt="Professional Moving Team" 
                      className="w-full h-64 rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Our Services */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Our Services</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <img src="https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" alt="Moving Truck" className="w-10 h-10 rounded object-cover" />
                    </div>
                    <h4 className="font-medium text-gray-900">Full Home Moving</h4>
                    <p className="text-sm text-gray-600 mt-1">Complete household relocation services</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-16 w-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <img src="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" alt="Packing" className="w-10 h-10 rounded object-cover" />
                    </div>
                    <h4 className="font-medium text-gray-900">Packing Services</h4>
                    <p className="text-sm text-gray-600 mt-1">Professional packing and unpacking</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-16 w-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <img src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" alt="Loading" className="w-10 h-10 rounded object-cover" />
                    </div>
                    <h4 className="font-medium text-gray-900">Loading & Unloading</h4>
                    <p className="text-sm text-gray-600 mt-1">Safe loading and unloading services</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <img src="https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" alt="Local Moving" className="w-10 h-10 rounded object-cover" />
                    </div>
                    <h4 className="font-medium text-gray-900">Local Shifting</h4>
                    <p className="text-sm text-gray-600 mt-1">Within city moving solutions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold text-center mb-8">Our Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">5000+</div>
                  <div className="text-blue-100">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">10000+</div>
                  <div className="text-blue-100">Successful Moves</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">4.8/5</div>
                  <div className="text-blue-100">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">5+</div>
                  <div className="text-blue-100">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Why Choose PackMove Pro?</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Professional Team</h4>
                      <p className="text-sm text-gray-600 mt-1">Trained and experienced moving professionals</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Insured Services</h4>
                      <p className="text-sm text-gray-600 mt-1">Complete insurance coverage for your belongings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Real-time Tracking</h4>
                      <p className="text-sm text-gray-600 mt-1">Track your shipment in real-time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">24/7 Support</h4>
                      <p className="text-sm text-gray-600 mt-1">Round-the-clock customer support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerFeedback;