import React from 'react';

const ModernLayout = ({ data }) => (
    <div className="bg-white w-[210mm] min-h-[297mm] mx-auto shadow-2xl flex text-sm font-sans text-gray-800">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-slate-900 text-white p-8 flex flex-col gap-8">
            <div className="flex flex-col items-center text-center">
                {data.profilePictureUrl && (
                    <img
                        src={data.profilePictureUrl}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-slate-700 shadow-lg mb-4"
                    />
                )}
                <h1 className="text-2xl font-bold tracking-tight mb-2">{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-6">Professional</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest border-b border-slate-700 pb-2 text-slate-400">Contact</h3>
                <div className="space-y-3 text-sm text-slate-300">
                    {data.personalInfo.email && <div className="break-all">✉ {data.personalInfo.email}</div>}
                    {data.personalInfo.phone && <div>📞 {data.personalInfo.phone}</div>}
                    {data.personalInfo.address && <div>📍 {data.personalInfo.address}</div>}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest border-b border-slate-700 pb-2 text-slate-400">Links</h3>
                <div className="space-y-3 text-sm text-slate-300">
                    {data.personalInfo.linkedin && <a href={data.personalInfo.linkedin} target="_blank" rel="noreferrer" className="block hover:text-white truncate">LinkedIn</a>}
                    {data.personalInfo.github && <a href={data.personalInfo.github} target="_blank" rel="noreferrer" className="block hover:text-white truncate">GitHub</a>}
                    {data.personalInfo.portfolio && <a href={data.personalInfo.portfolio} target="_blank" rel="noreferrer" className="block hover:text-white truncate">Portfolio</a>}
                </div>
            </div>

            {data.skills.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest border-b border-slate-700 pb-2 text-slate-400">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => (
                            <span key={index} className="bg-slate-800 text-slate-200 px-3 py-1 rounded text-xs">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-10 bg-white">
            {data.summary && (
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-4 border-b-2 border-slate-100 pb-2">Profile</h2>
                    <p className="text-slate-600 leading-relaxed text-justify">{data.summary}</p>
                </div>
            )}

            {data.experience.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 border-b-2 border-slate-100 pb-2">Experience</h2>
                    <div className="space-y-8">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="relative pl-6 border-l-2 border-slate-200">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-4 border-white"></div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-slate-800">{exp.jobTitle}</h3>
                                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-indigo-600 font-medium mb-2 text-sm">{exp.company}</div>
                                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {data.education.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 border-b-2 border-slate-100 pb-2">Education</h2>
                    <div className="space-y-6">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{edu.institution}</h3>
                                    <div className="text-slate-600">{edu.degree}</div>
                                </div>
                                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">{edu.startDate} - {edu.endDate}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

const ClassicLayout = ({ data }) => (
    <div className="bg-white w-[210mm] min-h-[297mm] mx-auto shadow-2xl p-12 text-gray-800 font-serif">
        <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
            <h1 className="text-4xl font-bold uppercase tracking-wide mb-2">{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
            <div className="flex justify-center gap-4 text-sm text-gray-600 flex-wrap">
                <span>{data.personalInfo.email}</span>
                <span>|</span>
                <span>{data.personalInfo.phone}</span>
                <span>|</span>
                <span>{data.personalInfo.address}</span>
            </div>
            <div className="flex justify-center gap-4 text-sm text-blue-800 mt-2 font-medium">
                {data.personalInfo.linkedin && <a href={data.personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                {data.personalInfo.github && <a href={data.personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>}
            </div>
        </div>

        {data.summary && (
            <div className="mb-8">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Professional Summary</h2>
                <p className="text-justify leading-relaxed">{data.summary}</p>
            </div>
        )}

        {data.experience.length > 0 && (
            <div className="mb-8">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Experience</h2>
                <div className="space-y-6">
                    {data.experience.map((exp, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-lg">{exp.jobTitle}, <span className="italic font-normal">{exp.company}</span></h3>
                                <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {data.education.length > 0 && (
            <div className="mb-8">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Education</h2>
                <div className="space-y-4">
                    {data.education.map((edu, index) => (
                        <div key={index} className="flex justify-between">
                            <div>
                                <h3 className="font-bold">{edu.institution}</h3>
                                <div>{edu.degree}</div>
                            </div>
                            <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {data.skills.length > 0 && (
            <div>
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Skills</h2>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {data.skills.map((skill, index) => (
                        <span key={index} className="text-sm">• {skill}</span>
                    ))}
                </div>
            </div>
        )}
    </div>
);

const MinimalistLayout = ({ data }) => (
    <div className="bg-white w-[210mm] min-h-[297mm] mx-auto shadow-2xl p-16 text-gray-700 font-sans">
        <div className="mb-12">
            <h1 className="text-5xl font-light text-gray-900 mb-4">{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
            <div className="text-sm text-gray-500 space-y-1">
                <p>{data.personalInfo.email}</p>
                <p>{data.personalInfo.phone}</p>
                <p>{data.personalInfo.address}</p>
            </div>
        </div>

        {data.summary && (
            <div className="mb-10">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Profile</h2>
                <p className="text-sm leading-loose text-gray-600">{data.summary}</p>
            </div>
        )}

        {data.experience.length > 0 && (
            <div className="mb-10">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Experience</h2>
                <div className="space-y-8">
                    {data.experience.map((exp, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="font-bold text-gray-900">{exp.jobTitle}</h3>
                                <span className="text-xs text-gray-400">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="text-xs font-medium text-gray-500 mb-2 uppercase">{exp.company}</div>
                            <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {data.education.length > 0 && (
            <div className="mb-10">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Education</h2>
                <div className="space-y-6">
                    {data.education.map((edu, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                                <span className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</span>
                            </div>
                            <div className="text-sm text-gray-600">{edu.degree}</div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {data.skills.length > 0 && (
            <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {data.skills.map((skill, index) => (
                        <span key={index}>{skill}</span>
                    ))}
                </div>
            </div>
        )}
    </div>
);

const ResumePreview = ({ data, layout }) => {
    if (layout === 'classic') return <ClassicLayout data={data} />;
    if (layout === 'minimalist') return <MinimalistLayout data={data} />;
    return <ModernLayout data={data} />;
};

export default ResumePreview;
