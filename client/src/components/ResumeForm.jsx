import React, { useState } from 'react';
import axios from 'axios';
import ImageUpload from './ImageUpload';
import ResumePreview from './ResumePreview';
import PDFExport from './PDFExport';

const InputField = ({ label, ...props }) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            {...props}
        />
    </div>
);

const ResumeForm = () => {
    const [resumeData, setResumeData] = useState({
        personalInfo: {
            firstName: '', lastName: '', email: '', phone: '', address: '', linkedin: '', github: '', portfolio: ''
        },
        experience: [],
        education: [],
        skills: [],
        profilePictureUrl: '',
        summary: ''
    });
    const [activeStep, setActiveStep] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedLayout, setSelectedLayout] = useState('modern');

    const handlePersonalInfoChange = (e) => {
        setResumeData({
            ...resumeData,
            personalInfo: { ...resumeData.personalInfo, [e.target.name]: e.target.value }
        });
    };

    const handleImageSuccess = (res) => {
        setResumeData({ ...resumeData, profilePictureUrl: res.url });
    };

    const addExperience = () => {
        setResumeData({
            ...resumeData,
            experience: [...resumeData.experience, { jobTitle: '', company: '', startDate: '', endDate: '', description: '' }]
        });
    };

    const updateExperience = (index, field, value) => {
        const newExp = [...resumeData.experience];
        newExp[index][field] = value;
        setResumeData({ ...resumeData, experience: newExp });
    };

    const addEducation = () => {
        setResumeData({
            ...resumeData,
            education: [...resumeData.education, { degree: '', institution: '', startDate: '', endDate: '' }]
        });
    };

    const updateEducation = (index, field, value) => {
        const newEdu = [...resumeData.education];
        newEdu[index][field] = value;
        setResumeData({ ...resumeData, education: newEdu });
    };

    const handleSkillsChange = (e) => {
        const skillsArray = e.target.value.split(',').map(skill => skill.trim());
        setResumeData({ ...resumeData, skills: skillsArray });
    };

    const generateSummary = async () => {
        setIsGenerating(true);
        try {
            const res = await axios.post('http://localhost:5000/api/ai/generate-summary', {
                experience: resumeData.experience,
                skills: resumeData.skills
            });
            setResumeData({ ...resumeData, summary: res.data.summary });
        } catch (error) {
            console.error("Error generating summary:", error);
            alert("Failed to generate summary");
        } finally {
            setIsGenerating(false);
        }
    };

    const steps = ['Personal Info', 'Experience', 'Education', 'Skills', 'Preview & Export'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-2">
                        AI Resume Builder
                    </h1>
                    <p className="text-lg text-gray-600">Craft your professional story with the power of AI.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                    {/* Sidebar / Stepper */}
                    <div className="md:w-64 bg-slate-900 text-white p-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-3 cursor-pointer transition-colors ${index === activeStep ? 'text-indigo-400' : 'text-gray-400 hover:text-gray-200'}`}
                                    onClick={() => setActiveStep(index)}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${index === activeStep ? 'border-indigo-400 bg-indigo-400/10' : 'border-gray-600'}`}>
                                        {index + 1}
                                    </div>
                                    <span className="font-medium tracking-wide">{step}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-xs text-gray-500 mt-8">
                            &copy; 2025 AI Resume Builder
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                        <div className="max-w-3xl mx-auto">
                            {activeStep === 0 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Personal Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField label="First Name" name="firstName" placeholder="Jane" onChange={handlePersonalInfoChange} value={resumeData.personalInfo.firstName} />
                                        <InputField label="Last Name" name="lastName" placeholder="Doe" onChange={handlePersonalInfoChange} value={resumeData.personalInfo.lastName} />
                                        <InputField label="Email" name="email" type="email" placeholder="jane@example.com" onChange={handlePersonalInfoChange} value={resumeData.personalInfo.email} />
                                        <InputField label="Phone" name="phone" placeholder="+1 (555) 000-0000" onChange={handlePersonalInfoChange} value={resumeData.personalInfo.phone} />
                                        <InputField label="Address" name="address" placeholder="San Francisco, CA" onChange={handlePersonalInfoChange} value={resumeData.personalInfo.address} />
                                        <InputField label="LinkedIn" name="linkedin" placeholder="linkedin.com/in/jane" onChange={handlePersonalInfoChange} value={resumeData.personalInfo.linkedin} />
                                        <InputField label="GitHub" name="github" placeholder="github.com/jane" onChange={handlePersonalInfoChange} value={resumeData.personalInfo.github} />
                                        <InputField label="Portfolio" name="portfolio" placeholder="janedoe.com" onChange={handlePersonalInfoChange} value={resumeData.personalInfo.portfolio} />
                                    </div>
                                    <div className="mt-6">
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">Profile Picture</label>
                                        <ImageUpload onSuccess={handleImageSuccess} />
                                        {resumeData.profilePictureUrl && (
                                            <div className="mt-4 relative w-24 h-24">
                                                <img src={resumeData.profilePictureUrl} alt="Profile" className="w-full h-full rounded-full object-cover shadow-md border-2 border-white" />
                                                <div className="absolute inset-0 rounded-full ring-2 ring-indigo-100 ring-offset-2"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeStep === 1 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex justify-between items-center border-b pb-4">
                                        <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
                                        <button onClick={addExperience} className="text-sm bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-indigo-100 transition-colors">
                                            + Add Position
                                        </button>
                                    </div>
                                    {resumeData.experience.map((exp, index) => (
                                        <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm relative group">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <InputField label="Job Title" value={exp.jobTitle} onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)} placeholder="Senior Developer" />
                                                <InputField label="Company" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} placeholder="Tech Corp" />
                                                <InputField label="Start Date" value={exp.startDate} onChange={(e) => updateExperience(index, 'startDate', e.target.value)} placeholder="Jan 2020" />
                                                <InputField label="End Date" value={exp.endDate} onChange={(e) => updateExperience(index, 'endDate', e.target.value)} placeholder="Present" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    placeholder="Describe your responsibilities and achievements..."
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white h-32 resize-none"
                                                    value={exp.description}
                                                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {resumeData.experience.length === 0 && (
                                        <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                                            No experience added yet. Click the button above to start.
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeStep === 2 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex justify-between items-center border-b pb-4">
                                        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                                        <button onClick={addEducation} className="text-sm bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-indigo-100 transition-colors">
                                            + Add Education
                                        </button>
                                    </div>
                                    {resumeData.education.map((edu, index) => (
                                        <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField label="Degree" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} placeholder="BS Computer Science" />
                                                <InputField label="Institution" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} placeholder="University of Tech" />
                                                <InputField label="Start Date" value={edu.startDate} onChange={(e) => updateEducation(index, 'startDate', e.target.value)} placeholder="2016" />
                                                <InputField label="End Date" value={edu.endDate} onChange={(e) => updateEducation(index, 'endDate', e.target.value)} placeholder="2020" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeStep === 3 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Skills</h2>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Technical & Soft Skills</label>
                                        <textarea
                                            placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js, Leadership, Communication)"
                                            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white h-48 resize-none text-lg"
                                            value={resumeData.skills.join(', ')}
                                            onChange={handleSkillsChange}
                                        />
                                        <p className="text-sm text-gray-500">Tip: List your most relevant skills first.</p>
                                    </div>
                                </div>
                            )}

                            {activeStep === 4 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Finalize & Export</h2>

                                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                                        <h3 className="text-lg font-semibold text-indigo-900 mb-2">AI Professional Summary</h3>
                                        <p className="text-indigo-700 text-sm mb-4">Let our AI analyze your details and write a compelling summary for you.</p>
                                        <div className="flex gap-4 mb-4">
                                            <button
                                                onClick={generateSummary}
                                                disabled={isGenerating}
                                                className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                {isGenerating ? (
                                                    <>
                                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Generating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>✨</span> Generate Summary
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <textarea
                                            className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white h-32 resize-none text-gray-700"
                                            value={resumeData.summary}
                                            onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                                            placeholder="Your professional summary will appear here..."
                                        />
                                    </div>

                                    {/* Layout Selection */}
                                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose PDF Layout</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div
                                                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedLayout === 'modern' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                                                onClick={() => setSelectedLayout('modern')}
                                            >
                                                <div className="h-20 bg-slate-900 rounded mb-2 w-1/3"></div>
                                                <div className="font-medium text-center">Modern</div>
                                                <div className="text-xs text-gray-500 text-center">Dark Sidebar</div>
                                            </div>
                                            <div
                                                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedLayout === 'classic' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                                                onClick={() => setSelectedLayout('classic')}
                                            >
                                                <div className="h-4 bg-gray-800 rounded mb-2 w-full mx-auto"></div>
                                                <div className="font-medium text-center">Classic</div>
                                                <div className="text-xs text-gray-500 text-center">Traditional</div>
                                            </div>
                                            <div
                                                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedLayout === 'minimalist' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                                                onClick={() => setSelectedLayout('minimalist')}
                                            >
                                                <div className="h-20 bg-white border border-gray-200 rounded mb-2"></div>
                                                <div className="font-medium text-center">Minimalist</div>
                                                <div className="text-xs text-gray-500 text-center">Clean & Simple</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-8">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-bold text-gray-800">Live Preview</h3>
                                            <PDFExport data={resumeData} layout={selectedLayout} />
                                        </div>
                                        <div className="bg-gray-200 p-4 rounded-xl overflow-hidden shadow-inner">
                                            <div className="scale-[0.8] origin-top-left sm:scale-100 sm:origin-top">
                                                <ResumePreview data={resumeData} layout={selectedLayout} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="mt-12 flex justify-between pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                                    disabled={activeStep === 0}
                                    className="px-6 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Back
                                </button>
                                {activeStep < steps.length - 1 && (
                                    <button
                                        onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                                        className="bg-gray-900 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                                    >
                                        Next Step
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeForm;
