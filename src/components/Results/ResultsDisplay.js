import React, { useState } from 'react';
import { groupIdeasByCategory, calculateRelevanceScore } from '../../utils/filterIdeas';

// IdeaCard component to display individual ideas
const IdeaCard = ({ idea, userPreferences }) => {
  const [expanded, setExpanded] = useState(false);
  const relevanceScore = calculateRelevanceScore(idea, userPreferences);
  
  // Determine relevance level based on score
  const getRelevanceLevel = (score) => {
    if (score >= 80) return { text: 'High Match', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { text: 'Good Match', color: 'bg-blue-100 text-blue-800' };
    if (score >= 40) return { text: 'Fair Match', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Basic Match', color: 'bg-gray-100 text-gray-800' };
  };
  
  const relevanceLevel = getRelevanceLevel(relevanceScore);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{idea.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${relevanceLevel.color}`}>
            {relevanceLevel.text}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{idea.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
            {idea.category}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            {idea.budgetRange === 'low' ? 'Low Budget' : idea.budgetRange === 'medium' ? 'Medium Budget' : 'High Budget'}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800">
            {idea.complexity === 'low' ? 'Low Complexity' : idea.complexity === 'medium' ? 'Medium Complexity' : 'High Complexity'}
          </span>
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
        
        {expanded && (
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <h4 className="font-medium text-gray-800">Implementation:</h4>
              <p className="text-gray-600">{idea.implementation}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800">Benefits:</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {idea.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800">Example:</h4>
              <p className="text-gray-600">{idea.example}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800">Resources Needed:</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {idea.requiredResources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800">Implementation Time:</h4>
              <p className="text-gray-600">{idea.timeToImplement}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800">Target Audience:</h4>
              <p className="text-gray-600">{idea.audienceTypes.join(', ')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// No Results component
const NoResults = () => (
  <div className="text-center py-12 bg-gray-50 rounded-lg">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No matching ideas</h3>
    <p className="mt-1 text-sm text-gray-500">
      Try adjusting your filters to see more results.
    </p>
  </div>
);

// Main ResultsDisplay component
const ResultsDisplay = ({ filteredIdeas, userPreferences, sortBy = 'relevance' }) => {
  // Group ideas by category
  const groupedIdeas = groupIdeasByCategory(filteredIdeas);
  const categories = Object.keys(groupedIdeas);
  
  // Sort categories by number of ideas (most ideas first)
  categories.sort((a, b) => groupedIdeas[b].length - groupedIdeas[a].length);
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">
        {filteredIdeas.length > 0 
          ? `${filteredIdeas.length} Fan Engagement Ideas Found`
          : 'No Ideas Match Your Criteria'}
      </h2>
      
      {filteredIdeas.length === 0 ? (
        <NoResults />
      ) : (
        <div className="space-y-8">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {category} <span className="text-sm font-normal text-gray-500">({groupedIdeas[category].length} ideas)</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedIdeas[category].map(idea => (
                  <IdeaCard 
                    key={idea.id} 
                    idea={idea} 
                    userPreferences={userPreferences}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;