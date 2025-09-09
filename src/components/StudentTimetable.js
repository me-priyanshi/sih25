import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, BookOpen } from 'lucide-react';
import timetableData from '../data/timetable.json';

const StudentTimetable = () => {
  const [selectedDay, setSelectedDay] = useState(
    new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  );

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getClassTypeColor = (type) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'practical':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'tutorial':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getClassTypeIcon = (type) => {
    switch (type) {
      case 'lecture':
        return <BookOpen className="w-4 h-4" />;
      case 'practical':
        return <BookOpen className="w-4 h-4" />;
      case 'tutorial':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-gray-900">Weekly Timetable</h1>
              <p className="text-gray-600">View your class schedule for the week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          {days.map((day, index) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedDay === day
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {dayNames[index]}
            </button>
          ))}
        </div>
      </div>

      {/* Timetable for Selected Day */}
      <div className="card">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 capitalize">
            {dayNames[days.indexOf(selectedDay)]} Schedule
          </h2>
          <p className="text-gray-600 mt-1">
            {timetableData[selectedDay]?.length || 0} classes scheduled
          </p>
        </div>

        {timetableData[selectedDay] && timetableData[selectedDay].length > 0 ? (
          <div className="space-y-4">
            {timetableData[selectedDay].map((cls, index) => (
              <div
                key={cls.id}
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all duration-200 bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg ${getClassTypeColor(cls.type)}`}>
                        {getClassTypeIcon(cls.type)}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {cls.subject}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <User className="w-4 h-4 mr-1" />
                          {cls.teacher}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">{cls.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">{cls.room}</span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getClassTypeColor(cls.type)}`}>
                      {cls.type.charAt(0).toUpperCase() + cls.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Classes Scheduled</h3>
            <p className="text-gray-600">
              Enjoy your free day! Use this time for self-study or personal activities.
            </p>
          </div>
        )}
      </div>

      {/* Weekly Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {days.map((day, index) => (
            <div
              key={day}
              className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                selectedDay === day
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => setSelectedDay(day)}
            >
              <h4 className="font-medium text-gray-900 mb-2">{dayNames[index]}</h4>
              <div className="space-y-2">
                {timetableData[day]?.slice(0, 3).map((cls) => (
                  <div key={cls.id} className="text-sm">
                    <p className="font-medium text-gray-700">{cls.subject}</p>
                    <p className="text-gray-500">{cls.time}</p>
                  </div>
                ))}
                {timetableData[day]?.length > 3 && (
                  <p className="text-xs text-gray-500">
                    +{timetableData[day].length - 3} more classes
                  </p>
                )}
                {(!timetableData[day] || timetableData[day].length === 0) && (
                  <p className="text-xs text-gray-500">No classes</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTimetable;
