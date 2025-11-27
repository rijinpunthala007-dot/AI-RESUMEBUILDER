import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image, Link } from '@react-pdf/renderer';

// --- STYLES FOR DIFFERENT LAYOUTS ---

// 1. MODERN LAYOUT (Dark Sidebar)
const modernStyles = StyleSheet.create({
    page: { flexDirection: 'row', backgroundColor: '#FFFFFF' },
    sidebar: { width: '33%', backgroundColor: '#0f172a', padding: 20, color: 'white' },
    main: { width: '67%', padding: 30 },
    profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 20, borderWidth: 3, borderColor: '#334155' },
    name: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, color: '#FFFFFF' },
    role: { fontSize: 10, textAlign: 'center', color: '#94a3b8', letterSpacing: 2, marginBottom: 30, textTransform: 'uppercase' },
    sidebarSection: { marginBottom: 25 },
    sidebarTitle: { fontSize: 10, fontWeight: 'bold', color: '#94a3b8', borderBottomWidth: 1, borderBottomColor: '#334155', paddingBottom: 5, marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase' },
    sidebarText: { fontSize: 9, color: '#cbd5e1', marginBottom: 5 },
    link: { fontSize: 9, color: '#cbd5e1', textDecoration: 'none', marginBottom: 5 },
    skillBadge: { backgroundColor: '#1e293b', padding: '4 8', borderRadius: 4, marginBottom: 5, fontSize: 9, color: '#e2e8f0' },
    mainSection: { marginBottom: 25 },
    mainTitle: { fontSize: 14, fontWeight: 'bold', color: '#0f172a', borderBottomWidth: 2, borderBottomColor: '#f1f5f9', paddingBottom: 5, marginBottom: 15, letterSpacing: 1, textTransform: 'uppercase' },
    summaryText: { fontSize: 10, color: '#475569', lineHeight: 1.6, textAlign: 'justify' },
    expItem: { marginBottom: 15, paddingLeft: 10, borderLeftWidth: 2, borderLeftColor: '#e2e8f0' },
    expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 2 },
    jobTitle: { fontSize: 12, fontWeight: 'bold', color: '#1e293b' },
    dateBadge: { fontSize: 8, backgroundColor: '#f1f5f9', padding: '2 6', borderRadius: 4, color: '#64748b' },
    company: { fontSize: 10, color: '#4f46e5', fontWeight: 'bold', marginBottom: 5 },
    description: { fontSize: 9, color: '#475569', lineHeight: 1.5 },
    eduItem: { marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
    eduSchool: { fontSize: 11, fontWeight: 'bold', color: '#1e293b' },
    eduDegree: { fontSize: 10, color: '#475569' },
});

// 2. CLASSIC LAYOUT (Single Column, Centered Header)
const classicStyles = StyleSheet.create({
    page: { padding: 40, backgroundColor: '#FFFFFF' },
    header: { alignItems: 'center', marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 20 },
    name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, textTransform: 'uppercase' },
    contactRow: { flexDirection: 'row', gap: 10, fontSize: 10, color: '#333' },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 2 },
    summaryText: { fontSize: 10, lineHeight: 1.5, textAlign: 'justify' },
    expItem: { marginBottom: 15 },
    expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    jobTitle: { fontSize: 11, fontWeight: 'bold' },
    company: { fontSize: 11, fontStyle: 'italic' },
    date: { fontSize: 10, color: '#666' },
    description: { fontSize: 10, marginTop: 3, lineHeight: 1.4 },
    skillList: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
    skill: { fontSize: 10, marginRight: 10 },
});

// 3. MINIMALIST LAYOUT (Clean, Left Aligned)
const minimalistStyles = StyleSheet.create({
    page: { padding: 50, backgroundColor: '#FFFFFF' },
    header: { marginBottom: 40 },
    name: { fontSize: 30, fontWeight: 'light', marginBottom: 10, color: '#333' },
    contact: { fontSize: 10, color: '#666', marginBottom: 2 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 10, fontWeight: 'bold', color: '#999', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 15 },
    content: { marginLeft: 0 },
    summaryText: { fontSize: 10, lineHeight: 1.8, color: '#444' },
    expItem: { marginBottom: 20 },
    expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    jobTitle: { fontSize: 12, fontWeight: 'bold', color: '#222' },
    company: { fontSize: 10, color: '#666' },
    date: { fontSize: 10, color: '#999' },
    description: { fontSize: 10, color: '#555', lineHeight: 1.6 },
    skill: { fontSize: 10, color: '#444', marginBottom: 3 },
});

// --- RENDERERS ---

const ModernLayout = ({ data }) => (
    <Page size="A4" style={modernStyles.page}>
        <View style={modernStyles.sidebar}>
            {data.profilePictureUrl && <Image src={data.profilePictureUrl} style={modernStyles.profileImage} />}
            <Text style={modernStyles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
            <Text style={modernStyles.role}>Professional</Text>
            <View style={modernStyles.sidebarSection}>
                <Text style={modernStyles.sidebarTitle}>Contact</Text>
                <Text style={modernStyles.sidebarText}>{data.personalInfo.email}</Text>
                <Text style={modernStyles.sidebarText}>{data.personalInfo.phone}</Text>
                <Text style={modernStyles.sidebarText}>{data.personalInfo.address}</Text>
            </View>
            <View style={modernStyles.sidebarSection}>
                <Text style={modernStyles.sidebarTitle}>Links</Text>
                {data.personalInfo.linkedin && <Link src={data.personalInfo.linkedin} style={modernStyles.link}>LinkedIn</Link>}
                {data.personalInfo.github && <Link src={data.personalInfo.github} style={modernStyles.link}>GitHub</Link>}
                {data.personalInfo.portfolio && <Link src={data.personalInfo.portfolio} style={modernStyles.link}>Portfolio</Link>}
            </View>
            {data.skills.length > 0 && (
                <View style={modernStyles.sidebarSection}>
                    <Text style={modernStyles.sidebarTitle}>Skills</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                        {data.skills.map((skill, index) => <Text key={index} style={modernStyles.skillBadge}>{skill}</Text>)}
                    </View>
                </View>
            )}
        </View>
        <View style={modernStyles.main}>
            {data.summary && (
                <View style={modernStyles.mainSection}>
                    <Text style={modernStyles.mainTitle}>Profile</Text>
                    <Text style={modernStyles.summaryText}>{data.summary}</Text>
                </View>
            )}
            {data.experience.length > 0 && (
                <View style={modernStyles.mainSection}>
                    <Text style={modernStyles.mainTitle}>Experience</Text>
                    {data.experience.map((exp, index) => (
                        <View key={index} style={modernStyles.expItem}>
                            <View style={modernStyles.expHeader}>
                                <Text style={modernStyles.jobTitle}>{exp.jobTitle}</Text>
                                <Text style={modernStyles.dateBadge}>{exp.startDate} - {exp.endDate}</Text>
                            </View>
                            <Text style={modernStyles.company}>{exp.company}</Text>
                            <Text style={modernStyles.description}>{exp.description}</Text>
                        </View>
                    ))}
                </View>
            )}
            {data.education.length > 0 && (
                <View style={modernStyles.mainSection}>
                    <Text style={modernStyles.mainTitle}>Education</Text>
                    {data.education.map((edu, index) => (
                        <View key={index} style={modernStyles.eduItem}>
                            <View>
                                <Text style={modernStyles.eduSchool}>{edu.institution}</Text>
                                <Text style={modernStyles.eduDegree}>{edu.degree}</Text>
                            </View>
                            <Text style={modernStyles.dateBadge}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    </Page>
);

const ClassicLayout = ({ data }) => (
    <Page size="A4" style={classicStyles.page}>
        <View style={classicStyles.header}>
            <Text style={classicStyles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
            <View style={classicStyles.contactRow}>
                <Text>{data.personalInfo.email}</Text>
                <Text>|</Text>
                <Text>{data.personalInfo.phone}</Text>
                <Text>|</Text>
                <Text>{data.personalInfo.address}</Text>
            </View>
            <View style={{ ...classicStyles.contactRow, marginTop: 5 }}>
                {data.personalInfo.linkedin && <Link src={data.personalInfo.linkedin} style={{ color: '#000' }}>LinkedIn</Link>}
                {data.personalInfo.github && <Link src={data.personalInfo.github} style={{ color: '#000' }}>GitHub</Link>}
            </View>
        </View>

        {data.summary && (
            <View style={classicStyles.section}>
                <Text style={classicStyles.sectionTitle}>Professional Summary</Text>
                <Text style={classicStyles.summaryText}>{data.summary}</Text>
            </View>
        )}

        {data.experience.length > 0 && (
            <View style={classicStyles.section}>
                <Text style={classicStyles.sectionTitle}>Experience</Text>
                {data.experience.map((exp, index) => (
                    <View key={index} style={classicStyles.expItem}>
                        <View style={classicStyles.expHeader}>
                            <Text style={classicStyles.jobTitle}>{exp.jobTitle}, <Text style={classicStyles.company}>{exp.company}</Text></Text>
                            <Text style={classicStyles.date}>{exp.startDate} - {exp.endDate}</Text>
                        </View>
                        <Text style={classicStyles.description}>{exp.description}</Text>
                    </View>
                ))}
            </View>
        )}

        {data.education.length > 0 && (
            <View style={classicStyles.section}>
                <Text style={classicStyles.sectionTitle}>Education</Text>
                {data.education.map((edu, index) => (
                    <View key={index} style={classicStyles.expItem}>
                        <View style={classicStyles.expHeader}>
                            <Text style={classicStyles.jobTitle}>{edu.institution}</Text>
                            <Text style={classicStyles.date}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                        <Text style={classicStyles.company}>{edu.degree}</Text>
                    </View>
                ))}
            </View>
        )}

        {data.skills.length > 0 && (
            <View style={classicStyles.section}>
                <Text style={classicStyles.sectionTitle}>Skills</Text>
                <View style={classicStyles.skillList}>
                    {data.skills.map((skill, index) => (
                        <Text key={index} style={classicStyles.skill}>• {skill}</Text>
                    ))}
                </View>
            </View>
        )}
    </Page>
);

const MinimalistLayout = ({ data }) => (
    <Page size="A4" style={minimalistStyles.page}>
        <View style={minimalistStyles.header}>
            <Text style={minimalistStyles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
            <Text style={minimalistStyles.contact}>{data.personalInfo.email}</Text>
            <Text style={minimalistStyles.contact}>{data.personalInfo.phone}</Text>
            <Text style={minimalistStyles.contact}>{data.personalInfo.address}</Text>
        </View>

        {data.summary && (
            <View style={minimalistStyles.section}>
                <Text style={minimalistStyles.sectionTitle}>Profile</Text>
                <Text style={minimalistStyles.summaryText}>{data.summary}</Text>
            </View>
        )}

        {data.experience.length > 0 && (
            <View style={minimalistStyles.section}>
                <Text style={minimalistStyles.sectionTitle}>Experience</Text>
                {data.experience.map((exp, index) => (
                    <View key={index} style={minimalistStyles.expItem}>
                        <View style={minimalistStyles.expHeader}>
                            <Text style={minimalistStyles.jobTitle}>{exp.jobTitle}</Text>
                            <Text style={minimalistStyles.date}>{exp.startDate} - {exp.endDate}</Text>
                        </View>
                        <Text style={minimalistStyles.company}>{exp.company}</Text>
                        <Text style={minimalistStyles.description}>{exp.description}</Text>
                    </View>
                ))}
            </View>
        )}

        {data.education.length > 0 && (
            <View style={minimalistStyles.section}>
                <Text style={minimalistStyles.sectionTitle}>Education</Text>
                {data.education.map((edu, index) => (
                    <View key={index} style={minimalistStyles.expItem}>
                        <View style={minimalistStyles.expHeader}>
                            <Text style={minimalistStyles.jobTitle}>{edu.institution}</Text>
                            <Text style={minimalistStyles.date}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                        <Text style={minimalistStyles.company}>{edu.degree}</Text>
                    </View>
                ))}
            </View>
        )}

        {data.skills.length > 0 && (
            <View style={minimalistStyles.section}>
                <Text style={minimalistStyles.sectionTitle}>Skills</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {data.skills.map((skill, index) => (
                        <Text key={index} style={minimalistStyles.skill}>{skill}   </Text>
                    ))}
                </View>
            </View>
        )}
    </Page>
);

const ResumeDocument = ({ data, layout }) => (
    <Document>
        {layout === 'classic' && <ClassicLayout data={data} />}
        {layout === 'minimalist' && <MinimalistLayout data={data} />}
        {(!layout || layout === 'modern') && <ModernLayout data={data} />}
    </Document>
);

const PDFExport = ({ data, layout }) => (
    <PDFDownloadLink document={<ResumeDocument data={data} layout={layout} />} fileName="resume.pdf">
        {({ blob, url, loading, error }) =>
            loading ? (
                <button className="bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium cursor-not-allowed shadow-md">Preparing PDF...</button>
            ) : (
                <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                    Download PDF
                </button>
            )
        }
    </PDFDownloadLink>
);

export default PDFExport;
