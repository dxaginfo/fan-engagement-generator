import React, { useState, useEffect } from 'react';
import InputForm from './components/Form/InputForm';
import ResultsDisplay from './components/Results/ResultsDisplay';
import { filterEngagementIdeas, sortEngagementIdeas } from './utils/filterIdeas';
import engagementIdeasData from './data/engagementIdeas.json';

function App() {
  const [userCriteria, setUserCriteria] = useState(null);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [sortOption, setSortOption] = useState('relevance');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Handle form submission
  const handleFormSubmit = (criteria) => {
    setUserCriteria(criteria);
    
    // Filter ideas based on user criteria
    const filtered = filterEngagementIdeas(engagementIdeasData, criteria);
    
    // Sort filtered results
    const sorted = sortEngagementIdeas(filtered, sortOption, sortDirection);
    
    setFilteredIdeas(sorted);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  // Re-sort when sort options change
  useEffect(() => {
    if (filteredIdeas.length > 0) {
      const sorted = sortEngagementIdeas(filteredIdeas, sortOption, sortDirection);
      setFilteredIdeas(sorted);
    }
  }, [sortOption, sortDirection]);
  
  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  // Handle sort direction change
  const handleDirectionChange = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  // Reset filters and return to form
  const handleReset = () => {
    setShowResults(false);
    setUserCriteria(null);
    setFilteredIdeas([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Fan Engagement Idea Generator</h1>
          <p className="mt-2 text-blue-200">
            Generate customized fan engagement strategies for your sports organization
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {!showResults ? (
          <section className="max-w-3xl mx-auto">
            <InputForm onSubmit={handleFormSubmit} />
          </section>
        ) : (
          <section id="results-section">
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Form
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-sm text-gray-600">Sort by:</label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded-md text-sm p-1"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="complexity">Complexity</option>
                    <option value="budget">Budget</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
                
                <button
                  onClick={handleDirectionChange}
                  className="p-1 border border-gray-300 rounded-md"
                  title={sortDirection === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
                >
                  {sortDirection === 'asc' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <ResultsDisplay 
              filteredIdeas={filteredIdeas} 
              userPreferences={userCriteria}
              sortBy={sortOption}
            />
          </section>
        )}
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            Fan Engagement Idea Generator © {new Date().getFullYear()} | Helping sports organizations connect with fans
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;