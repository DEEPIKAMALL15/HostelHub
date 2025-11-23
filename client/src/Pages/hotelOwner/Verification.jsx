import React, { useEffect, useState } from 'react'
import Title from '../../Components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Verification = () => {
  const { axios, getToken, user } = useAppContext();

  const [verification, setVerification] = useState({
    aadharCard: null,
    panCard: null,
    verificationStatus: 'pending',
    localFeedback: [],
    hotelId: null
  });
  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  // Fetch verification status
  const fetchVerification = async () => {
    try {
      const { data } = await axios.get('/api/verification', {
        headers: { Authorization: `Bearer ${await getToken()}` },
        withCredentials: true
      });
      if (data.success) {
        setVerification(data.verification);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchVerification();
    }
  }, [user]);

  // Upload documents
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!aadharFile && !panFile) {
      toast.error("Please upload at least one document");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      if (aadharFile) {
        formData.append('aadharCard', aadharFile);
      }
      if (panFile) {
        formData.append('panCard', panFile);
      }

      const { data } = await axios.post('/api/verification/upload', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (data.success) {
        toast.success(data.message);
        setVerification(data.verification);
        setAadharFile(null);
        setPanFile(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-200 text-green-700';
      case 'rejected':
        return 'bg-red-200 text-red-700';
      default:
        return 'bg-yellow-200 text-yellow-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending Review';
    }
  };

  return (
    <div>
      <Title
        align='left'
        font='outfit'
        title='Hostel Verification'
        subTitle='Upload your identity documents to verify your hostel. Local residents can also provide feedback to help verify the authenticity of your property.'
      />

      {/* Verification Status */}
      <div className='mt-8 mb-6'>
        <div className='bg-white border border-gray-300 rounded-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-xl font-semibold text-gray-800'>Verification Status</h3>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(verification.verificationStatus)}`}>
              {getStatusText(verification.verificationStatus)}
            </span>
          </div>
          <p className='text-gray-600 text-sm'>
            {verification.verificationStatus === 'pending' && 'Your documents are under review. Please wait for verification.'}
            {verification.verificationStatus === 'verified' && 'Your hostel has been verified successfully!'}
            {verification.verificationStatus === 'rejected' && 'Your verification was rejected. Please upload new documents.'}
          </p>
        </div>
      </div>

      {/* Document Upload Section */}
      <div className='bg-white border border-gray-300 rounded-lg p-6 mb-6'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>Upload Identity Documents</h3>
        <p className='text-gray-600 text-sm mb-6'>
          Upload your Aadhar Card and PAN Card to verify your identity and hostel ownership.
        </p>

        <form onSubmit={handleUpload}>
          <div className='grid md:grid-cols-2 gap-6 mb-6'>
            {/* Aadhar Card Upload */}
            <div>
              <label className='block text-gray-700 font-medium mb-2'>Aadhar Card</label>
              <label htmlFor='aadharCard' className='cursor-pointer'>
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors'>
                  {aadharFile ? (
                    <div>
                      <img
                        src={URL.createObjectURL(aadharFile)}
                        alt='Aadhar Card Preview'
                        className='max-h-40 mx-auto mb-2 rounded'
                      />
                      <p className='text-sm text-gray-600'>{aadharFile.name}</p>
                    </div>
                  ) : verification.aadharCard ? (
                    <div>
                      <img
                        src={verification.aadharCard}
                        alt='Aadhar Card'
                        className='max-h-40 mx-auto mb-2 rounded'
                      />
                      <p className='text-sm text-gray-600'>Current Aadhar Card</p>
                    </div>
                  ) : (
                    <div>
                      <img src={assets.uploadArea} alt='Upload' className='max-h-20 mx-auto mb-2 opacity-50' />
                      <p className='text-sm text-gray-600'>Click to upload Aadhar Card</p>
                    </div>
                  )}
                </div>
              </label>
              <input
                type='file'
                id='aadharCard'
                accept='image/*'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const maxBytes = 1.5 * 1024 * 1024;
                    if (file.size > maxBytes) {
                      toast.error('File size must be under 1.5MB');
                      return;
                    }
                    setAadharFile(file);
                  }
                }}
              />
            </div>

            {/* PAN Card Upload */}
            <div>
              <label className='block text-gray-700 font-medium mb-2'>PAN Card</label>
              <label htmlFor='panCard' className='cursor-pointer'>
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors'>
                  {panFile ? (
                    <div>
                      <img
                        src={URL.createObjectURL(panFile)}
                        alt='PAN Card Preview'
                        className='max-h-40 mx-auto mb-2 rounded'
                      />
                      <p className='text-sm text-gray-600'>{panFile.name}</p>
                    </div>
                  ) : verification.panCard ? (
                    <div>
                      <img
                        src={verification.panCard}
                        alt='PAN Card'
                        className='max-h-40 mx-auto mb-2 rounded'
                      />
                      <p className='text-sm text-gray-600'>Current PAN Card</p>
                    </div>
                  ) : (
                    <div>
                      <img src={assets.uploadArea} alt='Upload' className='max-h-20 mx-auto mb-2 opacity-50' />
                      <p className='text-sm text-gray-600'>Click to upload PAN Card</p>
                    </div>
                  )}
                </div>
              </label>
              <input
                type='file'
                id='panCard'
                accept='image/*'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const maxBytes = 1.5 * 1024 * 1024;
                    if (file.size > maxBytes) {
                      toast.error('File size must be under 1.5MB');
                      return;
                    }
                    setPanFile(file);
                  }
                }}
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={loading || (!aadharFile && !panFile)}
            className='bg-primary text-white px-8 py-2 rounded mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Uploading...' : 'Upload Documents'}
          </button>
        </form>
      </div>

      {/* Local Feedback Section */}
      <div className='bg-white border border-gray-300 rounded-lg p-6'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>Local Community Feedback</h3>
        <p className='text-gray-600 text-sm mb-6'>
          Feedback from local residents helps verify the authenticity of your hostel. Share this page with people in your area.
        </p>

        {verification.localFeedback && verification.localFeedback.length > 0 ? (
          <div className='space-y-4 mb-6'>
            {verification.localFeedback.map((feedback, index) => (
              <div key={index} className='border border-gray-200 rounded-lg p-4 bg-gray-50'>
                <div className='flex justify-between items-start mb-2'>
                  <div>
                    <p className='font-semibold text-gray-800'>{feedback.name}</p>
                    <p className='text-sm text-gray-600'>{feedback.email}</p>
                    <p className='text-sm text-gray-600'>{feedback.phone}</p>
                    <p className='text-sm text-gray-600 mt-1'>{feedback.address}</p>
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
        ) : (
          <div className='bg-gray-50 border border-gray-200 rounded-lg p-6 text-center mb-6'>
            <p className='text-gray-600'>No feedback submitted yet. Share your verification page with local residents.</p>
          </div>
        )}

        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <p className='text-sm text-blue-800 font-medium mb-2'>Share Verification Link</p>
          <p className='text-xs text-blue-600 mb-3'>
            Share this link with local residents so they can submit feedback about your hostel's authenticity.
          </p>
          {verification.hotelId && (() => {
            // Use environment variable for frontend URL, fallback to current origin
            const frontendUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin;
            const verificationLink = `${frontendUrl}/verification/${verification.hotelId}`;
            
            return (
              <div className='bg-white border border-blue-300 rounded p-3 mb-3'>
                <p className='text-xs text-gray-600 mb-2 font-medium'>Verification Page URL:</p>
                <div className='flex items-center gap-2'>
                  <input
                    type='text'
                    readOnly
                    value={verificationLink}
                    className='flex-1 text-xs p-2 border border-gray-300 rounded bg-gray-50'
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(verificationLink);
                      toast.success('Link copied to clipboard!');
                    }}
                    className='bg-blue-600 text-white px-4 py-2 rounded text-xs hover:bg-blue-700 transition-colors'
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default Verification;

