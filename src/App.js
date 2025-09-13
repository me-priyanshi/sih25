import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import QRCodeAttendance from './components/QRCodeAttendance';

// Student Components
import StudentDashboard from './components/StudentDashboard';
// import StudentTimetable from './components/StudentTimetable';
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
                            <QRCodeAttendance onAttendanceMarked={handleAttendanceMarked} />
                          </div>
                        )}
                        {/* {activeTab === 'timetable' && <StudentTimetable />} */}
                        {activeTab === 'tasks' && <StudentTasks />}
                        {activeTab === 'settings' && <Settings />}
                      </>
                    ) : (
                      <>
                        {activeTab === 'dashboard' && <FacultyDashboard />}
                        {activeTab === 'attendance' && <FacultyAttendance />}
                        {activeTab === 'students' && <FacultyStudents />}
                        {activeTab === 'settings' && <Settings />}
                      </>
                    )}
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
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
