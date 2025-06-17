import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
  organizationType: Yup.string().required('Please select an organization type'),
  audienceTypes: Yup.array().min(1, 'Select at least one audience type'),
  budgetRange: Yup.string().required('Please select a budget range'),
  implementationTime: Yup.string().required('Please select an implementation timeframe'),
  engagementGoals: Yup.array().min(1, 'Select at least one engagement goal')
});

// Initial form values
const initialValues = {
  organizationType: '',
  audienceTypes: [],
  budgetRange: '',
  implementationTime: '',
  engagementGoals: [],
  currentChallenges: ''
};

// Options for form select fields
const formOptions = {
  organizationTypes: [
    { value: 'sportsTeam', label: 'Sports Team' },
    { value: 'league', label: 'Sports League' },
    { value: 'sportsBrand', label: 'Sports Brand' },
    { value: 'sportsMedia', label: 'Sports Media' },
    { value: 'venue', label: 'Venue or Stadium' }
  ],
  audienceTypes: [
    { value: 'fans', label: 'Casual Fans' },
    { value: 'die-hard fans', label: 'Die-hard Fans' },
    { value: 'younger audience', label: 'Youth/Teen Audience' },
    { value: 'families', label: 'Families' },
    { value: 'merchandise buyers', label: 'Merchandise Buyers' },
    { value: 'social media followers', label: 'Social Media Followers' },
    { value: 'gamers', label: 'Gamers' },
    { value: 'local fans', label: 'Local Community' },
    { value: 'remote fans', label: 'Remote/International Fans' }
  ],
  budgetRanges: [
    { value: 'low', label: 'Low (Under $5,000)' },
    { value: 'medium', label: 'Medium ($5,000 - $25,000)' },
    { value: 'high', label: 'High ($25,000+)' }
  ],
  implementationTimes: [
    { value: 'immediate', label: 'Immediate (< 2 weeks)' },
    { value: 'short', label: 'Short-term (2-4 weeks)' },
    { value: 'medium', label: 'Medium-term (1-3 months)' },
    { value: 'long', label: 'Long-term (3+ months)' }
  ],
  engagementGoals: [
    { value: 'increase_followers', label: 'Increase Social Following' },
    { value: 'boost_attendance', label: 'Boost Event Attendance' },
    { value: 'drive_merchandise', label: 'Drive Merchandise Sales' },
    { value: 'deepen_loyalty', label: 'Deepen Fan Loyalty' },
    { value: 'expand_audience', label: 'Expand to New Audiences' },
    { value: 'increase_content_consumption', label: 'Increase Content Consumption' },
    { value: 'community_building', label: 'Build Community' },
    { value: 'fan_data', label: 'Collect Fan Data' }
  ]
};

const InputForm = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    
    // Convert form values to criteria object expected by the filtering logic
    const criteria = {
      organizationType: values.organizationType,
      audienceTypes: values.audienceTypes,
      budgetRange: values.budgetRange,
      implementationTime: values.implementationTime,
      engagementGoals: values.engagementGoals,
      currentChallenges: values.currentChallenges
    };
    
    // Call the onSubmit function passed from parent component
    onSubmit(criteria);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Generate Fan Engagement Ideas</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form className="space-y-6">
            {/* Organization Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Type
              </label>
              <Field
                as="select"
                name="organizationType"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select organization type</option>
                {formOptions.organizationTypes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="organizationType" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            {/* Audience Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {formOptions.audienceTypes.map(option => (
                  <div key={option.value} className="flex items-center">
                    <Field
                      type="checkbox"
                      name="audienceTypes"
                      value={option.value}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <ErrorMessage name="audienceTypes" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget Range
              </label>
              <div className="grid grid-cols-3 gap-4">
                {formOptions.budgetRanges.map(option => (
                  <div key={option.value} className="flex items-center">
                    <Field
                      type="radio"
                      name="budgetRange"
                      value={option.value}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <ErrorMessage name="budgetRange" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            {/* Implementation Timeframe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Implementation Timeframe
              </label>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {formOptions.implementationTimes.map(option => (
                  <div key={option.value} className="flex items-center">
                    <Field
                      type="radio"
                      name="implementationTime"
                      value={option.value}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <ErrorMessage name="implementationTime" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            {/* Engagement Goals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Engagement Goals (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {formOptions.engagementGoals.map(option => (
                  <div key={option.value} className="flex items-center">
                    <Field
                      type="checkbox"
                      name="engagementGoals"
                      value={option.value}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <ErrorMessage name="engagementGoals" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            {/* Current Challenges */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Fan Engagement Challenges (Optional)
              </label>
              <Field
                as="textarea"
                name="currentChallenges"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe any specific challenges you're facing with fan engagement..."
              />
            </div>
            
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
              >
                {isSubmitting ? 'Generating Ideas...' : 'Generate Fan Engagement Ideas'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InputForm;