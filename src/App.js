import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import FaceRecognition from './components/FaceRecognition';

// Student Components
import StudentDashboard from './components/StudentDashboard';
import StudentTimetable from './components/StudentTimetable';
import StudentTasks from './components/StudentTasks';

// Faculty Components
import FacultyDashboard from './components/FacultyDashboard';
import FacultyStudents from './components/FacultyStudents';
import FacultyAttendance from './components/FacultyAttendance';

// Shared Components
import Settings from './components/Settings';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const handleAttendanceMarked = () => {
    setAttendanceMarked(true);
    setTimeout(() => setAttendanceMarked(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            user ? (
              <div className="min-h-screen bg-gray-50">
                <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="lg:ml-64 transition-all duration-300">
                  <main className="p-4 lg:p-8">
                    {user.role === 'student' ? (
                      <>
                        {activeTab === 'dashboard' && <StudentDashboard />}
                        {activeTab === 'attendance' && (
                          <div className="space-y-6">
                            {attendanceMarked && (
                              <div className="card bg-green-50 border-green-200">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-green-800">Attendance Marked Successfully!</h3>
                                    <p className="text-sm text-green-600">Your attendance has been recorded for today.</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            <FaceRecognition onAttendanceMarked={handleAttendanceMarked} />
                          </div>
                        )}
                        {activeTab === 'timetable' && <StudentTimetable />}
                        {activeTab === 'tasks' && <StudentTasks />}
                        {activeTab === 'settings' && <Settings />}
                      </>
                    ) : (
                      <>
                        {activeTab === 'dashboard' && <FacultyDashboard />}
                        {activeTab === 'attendance' && <FacultyAttendance />}
                        {activeTab === 'students' && <FacultyStudents />}
                        {activeTab === 'settings' && <Settings />}
                        {activeTab === 'reports' && (
                          <div className="space-y-6">
                            <div className="card">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                  </svg>
                                </div>
                                <div className="ml-3">
                                  <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                                  <p className="text-gray-600">Generate detailed attendance reports and analytics</p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Report</h3>
                                <p className="text-gray-600 mb-4">Generate attendance report for the current week</p>
                                <button className="btn-primary w-full">Generate Report</button>
                              </div>
                              <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Analytics</h3>
                                <p className="text-gray-600 mb-4">View detailed monthly attendance analytics</p>
                                <button className="btn-primary w-full">View Analytics</button>
                              </div>
                              <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Performance</h3>
                                <p className="text-gray-600 mb-4">Analyze individual student attendance patterns</p>
                                <button className="btn-primary w-full">View Performance</button>
                              </div>
                            </div>
                            <div className="card">
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div>
                                    <h4 className="font-medium text-gray-900">Weekly Attendance Report</h4>
                                    <p className="text-sm text-gray-600">Generated on Jan 15, 2024</p>
                                  </div>
                                  <button className="btn-secondary">Download</button>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div>
                                    <h4 className="font-medium text-gray-900">Monthly Analytics</h4>
                                    <p className="text-sm text-gray-600">Generated on Jan 1, 2024</p>
                                  </div>
                                  <button className="btn-secondary">Download</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
