import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { backendUrl } from '../../service/url';

const CategorizationModal = ({ 
  imageFile, 
  imagePreview, 
  onAccept, 
  onClose, 
  loading = false 
}) => {
  const { token } = useSelector((state) => state.auth);
  const [categorization, setCategorization] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [customData, setCustomData] = useState({
    item: '',
    category: '',
    material: '',
    weight: '',
  });
  const [showCustomForm, setShowCustomForm] = useState(false);

  // Function to analyze image using Gemini Vision API
  const analyzeImage = async () => {
    setAnalyzing(true);
    setError(null);

    try {
      // Check if token exists
      if (!token) {
        setError('Authentication failed. Please log in to continue.');
        setAnalyzing(false);
        toast.error('You must be logged in to use this feature');
        return;
      }

      if (!imageFile) {
        setError('No image selected');
        setAnalyzing(false);
        return;
      }

      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await axios.post(
        `${backendUrl}/categorize-scrap`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setCategorization(response.data.categorization);
        setShowCustomForm(false);
        toast.success('Image analyzed successfully!');
      } else {
        setError(response.data.message || 'Failed to categorize image');
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error('Gemini API Error:', err);
      
      // Handle specific error cases
      if (err.response?.status === 401) {
        const errorMsg = 'Session expired. Please log in again.';
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = err.response?.data?.message || err.message || 'Failed to analyze image';
        setError(errorMsg);
        toast.error(errorMsg);
        console.error('Categorization error:', err);
      }
    } finally {
      setAnalyzing(false);
    }
  };

  // Handle accepting categorization
  const handleAccept = () => {
    if (categorization) {
      onAccept({
        item: categorization.material || '',
        category: categorization.category || '',
        description: categorization.description || '',
        weight: extractWeight(categorization.estimatedWeight),
        geminiCategorized: true,
        confidence: categorization.confidence,
        condition: categorization.condition,
        recyclability: categorization.recyclability,
      });
      onClose();
    }
  };

  // Extract numeric weight from estimated weight string
  const extractWeight = (weightStr) => {
    if (!weightStr) return '';
    const match = weightStr.match(/\d+/);
    return match ? match[0] : '';
  };

  // Handle custom input
  const handleCustomChange = (e) => {
    const { name, value } = e.target;
    setCustomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle custom form submission
  const handleCustomSubmit = () => {
    if (!customData.item || !customData.category) {
      toast.error('Please fill in item name and category');
      return;
    }

    onAccept({
      item: customData.item,
      category: customData.category,
      material: customData.material,
      weight: customData.weight,
      geminiCategorized: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-teal-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Scrap Categorization</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold hover:text-gray-200"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Image Preview
            </h3>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
              />
            )}
          </div>

          {/* Analysis Button (when no categorization yet) */}
          {!categorization && !showCustomForm && (
            <div className="mb-6">
              {!token ? (
                <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
                  <p className="font-semibold">⚠️ Authentication Required</p>
                  <p className="text-sm">You must be logged in to use Gemini Vision AI. Please log in and try again.</p>
                </div>
              ) : null}
              <button
                onClick={analyzeImage}
                disabled={analyzing || loading || !token}
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400 transition duration-200"
              >
                {!token ? 'Please Log In to Analyze' : analyzing ? 'Analyzing Image...' : 'Analyze with Gemini Vision'}
              </button>
              <button
                onClick={() => setShowCustomForm(true)}
                className="w-full mt-3 bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
              >
                Enter Details Manually
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-semibold">Analysis Failed</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Categorization Results */}
          {categorization && !showCustomForm && (
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <h3 className="font-bold text-green-800 mb-3">
                  ✓ Analysis Complete
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Category
                    </label>
                    <p className="text-lg text-gray-900 font-bold">
                      {categorization.category}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Material
                    </label>
                    <p className="text-lg text-gray-900 font-bold">
                      {categorization.material}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Confidence
                    </label>
                    <p className="text-gray-700">
                      {categorization.confidence}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Condition
                    </label>
                    <p className="text-gray-700">
                      {categorization.condition}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Est. Weight
                    </label>
                    <p className="text-gray-700">
                      {categorization.estimatedWeight}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Recyclability
                    </label>
                    <p className="text-gray-700">
                      {categorization.recyclability}
                    </p>
                  </div>
                </div>

                {categorization.description && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <p className="text-gray-700 text-sm">
                      {categorization.description}
                    </p>
                  </div>
                )}

                {categorization.notes && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> {categorization.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                >
                  ✓ Accept & Continue
                </button>
                <button
                  onClick={() => {
                    setCategorization(null);
                    setError(null);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                >
                  Re-Analyze
                </button>
                <button
                  onClick={() => setShowCustomForm(true)}
                  className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition duration-200"
                >
                  Edit Manually
                </button>
              </div>
            </div>
          )}

          {/* Manual Entry Form */}
          {showCustomForm && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Item Name *
                </label>
                <input
                  type="text"
                  name="item"
                  value={customData.item}
                  onChange={handleCustomChange}
                  placeholder="e.g., Laptop, Mobile, Copper Wire"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={customData.category}
                  onChange={handleCustomChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Brass">Brass</option>
                  <option value="Copper">Copper</option>
                  <option value="Iron">Iron</option>
                  <option value="Aluminum">Aluminum</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Paper">Paper</option>
                  <option value="Glass">Glass</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Material Type
                </label>
                <input
                  type="text"
                  name="material"
                  value={customData.material}
                  onChange={handleCustomChange}
                  placeholder="e.g., Aluminum Sheets, Copper Coils"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estimated Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={customData.weight}
                  onChange={handleCustomChange}
                  placeholder="e.g., 5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCustomSubmit}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                >
                  ✓ Confirm & Continue
                </button>
                <button
                  onClick={() => {
                    setShowCustomForm(false);
                    setCategorization(null);
                    setCustomData({ item: '', category: '', material: '', weight: '' });
                  }}
                  className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorizationModal;
