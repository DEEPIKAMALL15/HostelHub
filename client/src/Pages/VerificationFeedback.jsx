import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import Title from '../Components/Title'

const VerificationFeedback = () => {
  const { hotelId } = useParams();
  const { axios, navigate } = useAppContext();
  const [hotel, setHotel] = useState(null);
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    feedback: ''
  });

  // Fetch hotel and verification info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/verification/hotel/${hotelId}`, {
          withCredentials: true
        });
        if (data.success) {
          setHotel(data.hotel);
          setVerification(data.verification);
        } else {
          toast.error(data.message);
          navigate('/');
        }
      } catch (error) {
        toast.error('Failed to load verification page');
        navigate('/');
      }
    };

    if (hotelId) {
      fetchData();
    }
  }, [hotelId, axios, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.feedback) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post('/api/verification/feedback', {
        hotelId,
        ...formData
      }, {
        withCredentials: true
      });

      if (data.success) {
        toast.success('Thank you for your feedback! It has been submitted successfully.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          feedback: ''
        });
        // Refresh verification data
        const { data: refreshData } = await axios.get(`/api/verification/hotel/${hotelId}`, {
          withCredentials: true
        });
        if (refreshData.success) {
          setVerification(refreshData.verification);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <Title
          align='center'
          font='outfit'
          title='Hostel Verification Feedback'
          subTitle='Help verify the authenticity of this hostel by providing your feedback as a local resident'
        />

        {hotel && (
          <div className='bg-white border border-gray-300 rounded-lg p-6 mb-6 mt-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>Hostel Information</h3>
            <div className='space-y-2'>
              <p><span className='font-medium'>Name:</span> {hotel.name}</p>
              <p><span className='font-medium'>Address:</span> {hotel.address}</p>
              <p><span className='font-medium'>City:</span> {hotel.city}</p>
            </div>
            {verification && (
              <div className='mt-4 pt-4 border-t border-gray-200'>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium'>Verification Status:</span>{' '}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    verification.verificationStatus === 'verified' ? 'bg-green-200 text-green-700' :
                    verification.verificationStatus === 'rejected' ? 'bg-red-200 text-red-700' :
                    'bg-yellow-200 text-yellow-700'
                  }`}>
                    {verification.verificationStatus === 'verified' ? 'Verified' :
                     verification.verificationStatus === 'rejected' ? 'Rejected' :
                     'Pending Review'}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        <div className='bg-white border border-gray-300 rounded-lg p-6 mb-6'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>Submit Feedback</h3>
          <p className='text-gray-600 text-sm mb-6'>
            As a local resident, your feedback helps verify the authenticity of this hostel. Please provide accurate information about the property.
          </p>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>Full Name *</label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-2'>Email *</label>
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
            </div>

            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>Phone Number *</label>
                <input
                  type='tel'
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-2'>Your Address *</label>
                <input
                  type='text'
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Your residential address'
                  required
                />
              </div>
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-2'>Feedback *</label>
              <textarea
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                rows='5'
                placeholder='Please provide your feedback about this hostel. Is it a legitimate property? Have you seen it in the area? Any relevant information...'
                required
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='bg-primary text-white px-8 py-2 rounded mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>

        {verification && verification.localFeedback && verification.localFeedback.length > 0 && (
          <div className='bg-white border border-gray-300 rounded-lg p-6'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>Previous Feedback</h3>
            <div className='space-y-4'>
              {verification.localFeedback.map((feedback, index) => (
                <div key={index} className='border border-gray-200 rounded-lg p-4 bg-gray-50'>
                  <div className='flex justify-between items-start mb-2'>
                    <div>
                      <p className='font-semibold text-gray-800'>{feedback.name}</p>
                      <p className='text-sm text-gray-600'>{feedback.address}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      feedback.isVerified ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {feedback.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <p className='text-gray-700 mt-2'>{feedback.feedback}</p>
                  <p className='text-xs text-gray-500 mt-2'>
                    Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationFeedback;

