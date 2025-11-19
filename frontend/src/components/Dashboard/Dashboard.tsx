import React, { useState, useEffect } from 'react';
import { Candidate } from '../../types/candidate';
import styles from './Dashboard.module.css';

interface DashboardProps {
  onAddCandidate: () => void;
  onEditCandidate: (candidateId: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAddCandidate, onEditCandidate }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3010/api/candidates');

      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }

      const data = await response.json();
      setCandidates(data.candidates || []);
    } catch (err) {
      setError('Error loading candidates. Please try again later.');
      console.error('Error fetching candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Recruiter Dashboard</h1>
          <p className={styles.subtitle}>Manage your candidates and recruitment process</p>
        </div>
        <button
          className={styles.addButton}
          onClick={onAddCandidate}
          aria-label="Add new candidate"
        >
          <span className={styles.addIcon}>+</span>
          Add New Candidate
        </button>
      </div>

      {error && (
        <div className={styles.errorMessage} role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} role="status" aria-live="polite">
            <span className={styles.srOnly}>Loading candidates...</span>
          </div>
          <p>Loading candidates...</p>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.statsBar}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{candidates.length}</span>
              <span className={styles.statLabel}>Total Candidates</span>
            </div>
          </div>

          {candidates.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📋</div>
              <h2 className={styles.emptyTitle}>No candidates yet</h2>
              <p className={styles.emptyText}>
                Get started by adding your first candidate to the system
              </p>
              <button
                className={styles.emptyButton}
                onClick={onAddCandidate}
              >
                Add Your First Candidate
              </button>
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Recruiter</th>
                    <th>Added Date</th>
                    <th>CV</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr
                      key={candidate.id}
                      onClick={() => onEditCandidate(candidate.id)}
                      className={styles.clickableRow}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onEditCandidate(candidate.id);
                        }
                      }}
                      aria-label={`View details for ${candidate.firstName} ${candidate.lastName}`}
                    >
                      <td className={styles.nameCell}>
                        <div className={styles.candidateName}>
                          {candidate.firstName} {candidate.lastName}
                        </div>
                      </td>
                      <td>
                        <a
                          href={`mailto:${candidate.email}`}
                          className={styles.email}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {candidate.email}
                        </a>
                      </td>
                      <td>
                        <a
                          href={`tel:${candidate.phone}`}
                          className={styles.phone}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {candidate.phone}
                        </a>
                      </td>
                      <td>{candidate.recruiterName || '-'}</td>
                      <td>{formatDate(candidate.createdAt)}</td>
                      <td>
                        {candidate.cvFileName ? (
                          <span className={styles.cvBadge}>📄 {candidate.cvFileName}</span>
                        ) : (
                          <span className={styles.noCv}>No CV</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
