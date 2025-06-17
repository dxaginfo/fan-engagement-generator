/**
 * Filter engagement ideas based on user criteria
 * @param {Array} ideas - Array of engagement ideas
 * @param {Object} criteria - User selected filters
 * @param {string} criteria.budgetRange - Budget range (low, medium, high)
 * @param {Array} criteria.audienceTypes - Target audience types
 * @param {string} criteria.complexity - Desired complexity (low, medium, high)
 * @param {Array} criteria.categories - Desired categories
 * @returns {Array} - Filtered list of engagement ideas
 */
export const filterEngagementIdeas = (ideas, criteria) => {
  // If no criteria provided, return all ideas
  if (!criteria || Object.keys(criteria).length === 0) {
    return ideas;
  }

  return ideas.filter(idea => {
    // Budget compatibility
    if (criteria.budgetRange && criteria.budgetRange !== 'any') {
      if (criteria.budgetRange === 'low' && idea.budgetRange === 'high') return false;
      if (criteria.budgetRange === 'medium' && idea.budgetRange === 'high') return false;
      // If user selects high budget, show all ideas
    }
    
    // Complexity filter
    if (criteria.complexity && criteria.complexity !== 'any') {
      if (criteria.complexity === 'low' && idea.complexity !== 'low') return false;
      if (criteria.complexity === 'medium' && idea.complexity === 'high') return false;
      // If user selects high complexity, show all ideas
    }
    
    // Audience type overlap check
    if (criteria.audienceTypes && criteria.audienceTypes.length > 0) {
      const hasTargetAudience = criteria.audienceTypes.some(type => 
        idea.audienceTypes.includes(type)
      );
      if (!hasTargetAudience) return false;
    }
    
    // Category filter
    if (criteria.categories && criteria.categories.length > 0) {
      if (!criteria.categories.includes(idea.category)) return false;
    }
    
    return true;
  });
};

/**
 * Sort engagement ideas based on specified criteria
 * @param {Array} ideas - Array of filtered engagement ideas
 * @param {string} sortBy - Sort criteria (e.g. 'complexity', 'budget', 'popularity')
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {Array} - Sorted list of engagement ideas
 */
export const sortEngagementIdeas = (ideas, sortBy = 'relevance', direction = 'desc') => {
  const sortedIdeas = [...ideas];
  
  switch(sortBy) {
    case 'complexity':
      return sortedIdeas.sort((a, b) => {
        const complexityValues = { 'low': 1, 'medium': 2, 'high': 3 };
        const valueA = complexityValues[a.complexity];
        const valueB = complexityValues[b.complexity];
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      });
      
    case 'budget':
      return sortedIdeas.sort((a, b) => {
        const budgetValues = { 'low': 1, 'medium': 2, 'high': 3 };
        const valueA = budgetValues[a.budgetRange];
        const valueB = budgetValues[b.budgetRange];
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      });
      
    case 'alphabetical':
      return sortedIdeas.sort((a, b) => {
        return direction === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
      
    default: // relevance - default option that can use a weighted scoring system
      return sortedIdeas;
  }
};

/**
 * Group ideas by their category
 * @param {Array} ideas - Array of engagement ideas
 * @returns {Object} - Object with category keys and arrays of ideas as values
 */
export const groupIdeasByCategory = (ideas) => {
  return ideas.reduce((grouped, idea) => {
    const category = idea.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(idea);
    return grouped;
  }, {});
};

/**
 * Calculate relevance score for an idea based on user criteria
 * @param {Object} idea - Engagement idea
 * @param {Object} userPreferences - User preferences
 * @returns {number} - Relevance score (0-100)
 */
export const calculateRelevanceScore = (idea, userPreferences) => {
  let score = 0;
  const maxScore = 100;
  
  // Budget match (30 points max)
  if (userPreferences.budgetRange) {
    const budgetValues = { 'low': 1, 'medium': 2, 'high': 3 };
    const userBudget = budgetValues[userPreferences.budgetRange] || 0;
    const ideaBudget = budgetValues[idea.budgetRange] || 0;
    
    // Perfect match
    if (userBudget === ideaBudget) {
      score += 30;
    } 
    // User budget is higher than idea budget
    else if (userBudget > ideaBudget) {
      score += 25;
    }
    // Idea is slightly above user budget
    else if (ideaBudget - userBudget === 1) {
      score += 15;
    }
    // Idea is significantly above user budget
    else {
      score += 5;
    }
  }
  
  // Audience match (40 points max)
  if (userPreferences.audienceTypes && userPreferences.audienceTypes.length > 0) {
    const matchCount = userPreferences.audienceTypes.filter(type => 
      idea.audienceTypes.includes(type)
    ).length;
    
    const matchPercentage = matchCount / userPreferences.audienceTypes.length;
    score += Math.round(matchPercentage * 40);
  }
  
  // Complexity match (30 points max)
  if (userPreferences.complexity) {
    const complexityValues = { 'low': 1, 'medium': 2, 'high': 3 };
    const userComplexity = complexityValues[userPreferences.complexity] || 0;
    const ideaComplexity = complexityValues[idea.complexity] || 0;
    
    // Perfect match
    if (userComplexity === ideaComplexity) {
      score += 30;
    } 
    // User prefers more complex than idea
    else if (userComplexity > ideaComplexity) {
      score += 25;
    }
    // Idea is slightly more complex than user preference
    else if (ideaComplexity - userComplexity === 1) {
      score += 15;
    }
    // Idea is significantly more complex than user preference
    else {
      score += 5;
    }
  }
  
  return Math.min(score, maxScore);
};

export default {
  filterEngagementIdeas,
  sortEngagementIdeas,
  groupIdeasByCategory,
  calculateRelevanceScore
};