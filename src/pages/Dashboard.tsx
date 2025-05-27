
import React from 'react';
import { UserProfile } from '../components/UserProfile';
import { ConversationViewer } from '../components/ConversationViewer';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            API Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your user profile and view conversation details
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UserProfile />
          <ConversationViewer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
