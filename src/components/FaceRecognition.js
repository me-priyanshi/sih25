import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const FaceRecognition = ({ onAttendanceMarked }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsCapturing(true);
  }, [webcamRef]);

  const retakePhoto = () => {
    setCapturedImage(null);
    setIsCapturing(false);
    setVerificationResult(null);
    setError(null);
  };

  const verifyFace = async () => {
    setIsProcessing(true);
    setError(null);

    // Simulate face verification process
    setTimeout(() => {
      // Simulate 90% success rate
      const isVerified = Math.random() > 0.1;
      
      if (isVerified) {
        setVerificationResult({
          success: true,
          confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
          message: "Face verified successfully!"
        });
        
        // Call the callback after successful verification
        setTimeout(() => {
          onAttendanceMarked && onAttendanceMarked();
        }, 1500);
      } else {
        setVerificationResult({
          success: false,
          confidence: Math.floor(Math.random() * 30) + 40, // 40-69%
          message: "Face verification failed. Please try again."
        });
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  const resetComponent = () => {
    setCapturedImage(null);
    setIsCapturing(false);
    setVerificationResult(null);
    setError(null);
    setIsProcessing(false);
  };

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Face Recognition Attendance
        </h3>
        <p className="text-sm text-gray-600">
          Position your face in the camera and click capture to mark attendance
        </p>
      </div>

      <div className="space-y-4">
        {!capturedImage ? (
          // Camera View
          <div className="relative">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full rounded-lg border border-gray-200"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-2 border-white border-dashed rounded-full opacity-50"></div>
            </div>
          </div>
        ) : (
          // Captured Image View
          <div className="relative">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full rounded-lg border border-gray-200"
            />
            {verificationResult && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <div className="text-center text-white">
                  {verificationResult.success ? (
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-2" />
                  ) : (
                    <XCircle className="w-16 h-16 text-red-400 mx-auto mb-2" />
                  )}
                  <p className="text-lg font-semibold">{verificationResult.message}</p>
                  <p className="text-sm opacity-75">
                    Confidence: {verificationResult.confidence}%
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {!capturedImage ? (
            <button
              onClick={capture}
              className="flex-1 btn-primary flex items-center justify-center"
            >
              <Camera className="w-4 h-4 mr-2" />
              Capture Photo
            </button>
          ) : (
            <>
              {!verificationResult && (
                <button
                  onClick={verifyFace}
                  disabled={isProcessing}
                  className="flex-1 btn-primary flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify & Mark Attendance
                    </>
                  )}
                </button>
              )}
              <button
                onClick={retakePhoto}
                className="flex-1 btn-secondary flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Photo
              </button>
            </>
          )}
        </div>

        {/* Reset Button */}
        {verificationResult && (
          <button
            onClick={resetComponent}
            className="w-full btn-secondary flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </button>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Instructions:</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Ensure good lighting on your face</li>
            <li>• Look directly at the camera</li>
            <li>• Remove glasses or hats if possible</li>
            <li>• Keep your face centered in the frame</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
