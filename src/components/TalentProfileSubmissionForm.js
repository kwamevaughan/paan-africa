import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Validation schema
const profileSchema = z.object({
  // Basic Information
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  user_type: z.enum(['creative', 'agency']),
  
  // Profile Details
  tagline: z.string().min(10, 'Tagline must be at least 10 characters').max(200, 'Tagline cannot exceed 200 characters'),
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(1000, 'Bio cannot exceed 1000 characters'),
  
  // Location
  country: z.string().min(1, 'Please select a country'),
  city: z.string().min(1, 'Please select a city'),
  
  // Contact & Links
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  
  // Agency-specific fields
  company_name: z.string().optional(),
  company_size: z.string().optional(),
  founded_year: z.number().min(1900).max(new Date().getFullYear()).optional(),
  
  // Skills
  skills: z.array(z.string()).min(3, 'Please select at least 3 skills').max(15, 'Maximum 15 skills allowed'),
  
  // Portfolio
  portfolio_description: z.string().min(20, 'Portfolio description must be at least 20 characters').optional(),
});

// Mock data - in real app, fetch from Supabase
const mockCountries = [
  { name: 'Nigeria', cities: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt'] },
  { name: 'South Africa', cities: ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria'] },
  { name: 'Kenya', cities: ['Nairobi', 'Mombasa', 'Kisumu'] },
  { name: 'Ghana', cities: ['Accra', 'Kumasi', 'Tamale'] },
  { name: 'Egypt', cities: ['Cairo', 'Alexandria'] },
  { name: 'Morocco', cities: ['Casablanca', 'Rabat', 'Marrakech'] },
];

const skillCategories = {
  'Design': ['Logo Design', 'Brand Identity', 'UI/UX Design', 'Web Design', 'Print Design', 'Packaging Design', 'Illustration', 'Icon Design'],
  'Development': ['Frontend Development', 'Backend Development', 'Full Stack Development', 'Mobile App Development', 'WordPress Development', 'E-commerce Development'],
  'Marketing': ['Digital Marketing Strategy', 'Social Media Marketing', 'SEO', 'PPC Advertising', 'Email Marketing', 'Influencer Marketing', 'Brand Strategy'],
  'Content': ['Copywriting', 'Content Strategy', 'Blog Writing', 'Technical Writing', 'Social Media Content', 'Script Writing'],
  'Video & Animation': ['Video Editing', 'Motion Graphics', '2D Animation', '3D Animation', 'Video Production', 'Explainer Videos'],
  'Photography': ['Portrait Photography', 'Product Photography', 'Event Photography', 'Fashion Photography', 'Food Photography'],
  'Strategy': ['Business Strategy', 'Market Research', 'Business Development', 'Management Consulting', 'Product Strategy'],
  'Audio': ['Music Production', 'Sound Design', 'Voiceover', 'Audio Editing', 'Podcast Production']
};

// File upload component
const FileUpload = ({ onUpload, accept, maxFiles = 1, label, description }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
    setFiles(newFiles);
    onUpload(newFiles);
  }, [files, maxFiles, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - files.length,
  });

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onUpload(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-paan-blue bg-paan-blue/5' 
            : 'border-gray-300 hover:border-paan-blue hover:bg-paan-blue/5'
        }`}
      >
        <input {...getInputProps()} />
        <Icon icon="lucide:upload" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon icon="lucide:file" className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Icon icon="lucide:x" className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Skills selector component
const SkillsSelector = ({ selectedSkills, onSkillsChange }) => {
  const [activeCategory, setActiveCategory] = useState('Design');

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 15) {
      onSkillsChange([...selectedSkills, skill]);
    } else {
      toast.error('Maximum 15 skills allowed');
    }
  };

  return (
    <div className="space-y-4">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(skillCategories).map(category => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeCategory === category
                ? 'bg-paan-blue text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {skillCategories[activeCategory]?.map(skill => (
          <button
            key={skill}
            type="button"
            onClick={() => toggleSkill(skill)}
            className={`p-2 text-sm rounded-lg border text-left transition-colors ${
              selectedSkills.includes(skill)
                ? 'bg-paan-blue text-white border-paan-blue'
                : 'bg-white text-gray-700 border-gray-200 hover:border-paan-blue'
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Selected skills count */}
      <div className="text-sm text-gray-600">
        Selected: {selectedSkills.length}/15 skills
      </div>

      {/* Selected skills display */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
          {selectedSkills.map(skill => (
            <span
              key={skill}
              className="inline-flex items-center space-x-1 bg-paan-blue text-white text-xs px-2 py-1 rounded-full"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => toggleSkill(skill)}
                className="hover:text-red-200"
              >
                <Icon icon="lucide:x" className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Main form component
const TalentProfileSubmissionForm = ({ onSubmit, isLoading = false }) => {
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [avatarFiles, setAvatarFiles] = useState([]);
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    trigger
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      user_type: 'creative',
      skills: []
    }
  });

  const userType = watch('user_type');
  const country = watch('country');

  // Update skills in form when selectedSkills changes
  React.useEffect(() => {
    setValue('skills', selectedSkills);
  }, [selectedSkills, setValue]);

  // Update cities when country changes
  React.useEffect(() => {
    if (country !== selectedCountry) {
      setSelectedCountry(country);
      setValue('city', '');
    }
  }, [country, selectedCountry, setValue]);

  const nextStep = async () => {
    const fieldsToValidate = {
      1: ['full_name', 'username', 'email', 'user_type'],
      2: ['tagline', 'bio', 'country', 'city'],
      3: ['skills']
    };

    const isValid = await trigger(fieldsToValidate[step]);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onFormSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        avatar_files: avatarFiles,
        portfolio_files: portfolioFiles,
        skills: selectedSkills
      };
      
      await onSubmit(formData);
      toast.success('Profile submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit profile. Please try again.');
    }
  };

  const selectedCountryData = mockCountries.find(c => c.name === country);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
          <span className="text-sm text-gray-500">{Math.round((step / 4) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-paan-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                <p className="text-gray-600">Tell us about yourself and your professional focus.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    {...register('full_name')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                  {errors.full_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username *
                  </label>
                  <input
                    {...register('username')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                    placeholder="Choose a unique username"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I am a *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="cursor-pointer">
                    <input
                      {...register('user_type')}
                      type="radio"
                      value="creative"
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg text-center transition-colors ${
                      userType === 'creative' 
                        ? 'border-paan-blue bg-paan-blue/5' 
                        : 'border-gray-200 hover:border-paan-blue'
                    }`}>
                      <Icon icon="lucide:user" className="w-8 h-8 mx-auto mb-2 text-paan-blue" />
                      <h3 className="font-medium text-gray-900">Creative Professional</h3>
                      <p className="text-sm text-gray-600 mt-1">Individual freelancer or creative</p>
                    </div>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      {...register('user_type')}
                      type="radio"
                      value="agency"
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg text-center transition-colors ${
                      userType === 'agency' 
                        ? 'border-paan-yellow bg-paan-yellow/5' 
                        : 'border-gray-200 hover:border-paan-yellow'
                    }`}>
                      <Icon icon="lucide:building" className="w-8 h-8 mx-auto mb-2 text-paan-yellow" />
                      <h3 className="font-medium text-gray-900">Agency/Studio</h3>
                      <p className="text-sm text-gray-600 mt-1">Creative agency or studio</p>
                    </div>
                  </label>
                </div>
                {errors.user_type && (
                  <p className="mt-1 text-sm text-red-600">{errors.user_type.message}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Profile Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Details</h2>
                <p className="text-gray-600">Share your professional story and location.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Tagline *
                </label>
                <input
                  {...register('tagline')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                  placeholder="e.g., Brand Designer & Visual Storyteller"
                />
                {errors.tagline && (
                  <p className="mt-1 text-sm text-red-600">{errors.tagline.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Bio *
                </label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                  placeholder="Tell us about your experience, specializations, and what makes you unique..."
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <select
                    {...register('country')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                  >
                    <option value="">Select your country</option>
                    {mockCountries.map(country => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <select
                    {...register('city')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                    disabled={!selectedCountryData}
                  >
                    <option value="">Select your city</option>
                    {selectedCountryData?.cities.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>
              </div>

              {/* Agency-specific fields */}
              {userType === 'agency' && (
                <div className="space-y-4 p-4 bg-paan-yellow/5 rounded-lg">
                  <h3 className="font-medium text-gray-900">Agency Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        {...register('company_name')}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                        placeholder="Enter company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Size
                      </label>
                      <select
                        {...register('company_size')}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                      >
                        <option value="">Select company size</option>
                        <option value="1-5">1-5 employees</option>
                        <option value="6-20">6-20 employees</option>
                        <option value="21-50">21-50 employees</option>
                        <option value="51-100">51-100 employees</option>
                        <option value="100+">100+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Founded Year
                    </label>
                    <input
                      {...register('founded_year', { valueAsNumber: true })}
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                      placeholder="e.g., 2020"
                    />
                  </div>
                </div>
              )}

              {/* Contact Links */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Professional Links</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      {...register('website')}
                      type="url"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                    {errors.website && (
                      <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <input
                      {...register('linkedin')}
                      type="url"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                    {errors.linkedin && (
                      <p className="mt-1 text-sm text-red-600">{errors.linkedin.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter Handle
                    </label>
                    <input
                      {...register('twitter')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                      placeholder="@yourhandle"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instagram Handle
                    </label>
                    <input
                      {...register('instagram')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                      placeholder="@yourhandle"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Skills */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Skills & Expertise</h2>
                <p className="text-gray-600">Select the skills that best represent your expertise. Choose 3-15 skills.</p>
              </div>

              <SkillsSelector
                selectedSkills={selectedSkills}
                onSkillsChange={setSelectedSkills}
              />
              
              {errors.skills && (
                <p className="text-sm text-red-600">{errors.skills.message}</p>
              )}
            </motion.div>
          )}

          {/* Step 4: Portfolio & Media */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio & Media</h2>
                <p className="text-gray-600">Upload your profile image and showcase your best work.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Profile Picture
                </label>
                <FileUpload
                  onUpload={setAvatarFiles}
                  accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }}
                  maxFiles={1}
                  label="Upload Profile Picture"
                  description="JPG, PNG, or WebP. Max 5MB."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Portfolio Images
                </label>
                <FileUpload
                  onUpload={setPortfolioFiles}
                  accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }}
                  maxFiles={10}
                  label="Upload Portfolio Images"
                  description="JPG, PNG, or WebP. Max 5MB each. Up to 10 images."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio Description
                </label>
                <textarea
                  {...register('portfolio_description')}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-blue focus:border-transparent"
                  placeholder="Describe your portfolio and highlight your best projects..."
                />
                {errors.portfolio_description && (
                  <p className="mt-1 text-sm text-red-600">{errors.portfolio_description.message}</p>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your profile will be reviewed by our team</li>
                  <li>• You'll receive a confirmation email within 24-48 hours</li>
                  <li>• Once approved, your profile will appear on the talent map</li>
                  <li>• Clients can then discover and contact you directly</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6 border-t">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-2 rounded-lg transition-colors ${
              step === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-paan-blue text-white rounded-lg hover:bg-paan-blue/90 transition-colors"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-paan-green text-white rounded-lg hover:bg-paan-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading && <Icon icon="lucide:loader-2" className="w-4 h-4 animate-spin" />}
              <span>{isLoading ? 'Submitting...' : 'Submit Profile'}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TalentProfileSubmissionForm;
