import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import CandidateForm from './components/CandidateForm/CandidateForm';
import './App.css';

type View = 'dashboard' | 'form';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingCandidateId, setEditingCandidateId] = useState<number | null>(null);

  const handleAddCandidate = () => {
    setEditingCandidateId(null);
    setCurrentView('form');
  };

  const handleEditCandidate = (candidateId: number) => {
    setEditingCandidateId(candidateId);
    setCurrentView('form');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setEditingCandidateId(null);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="App">
      {currentView === 'dashboard' ? (
        <Dashboard
          key={refreshKey}
          onAddCandidate={handleAddCandidate}
          onEditCandidate={handleEditCandidate}
        />
      ) : (
        <CandidateForm
          candidateId={editingCandidateId}
          onSuccess={handleBackToDashboard}
          onCancel={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;
