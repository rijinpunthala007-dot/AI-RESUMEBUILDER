import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image, Link, Font } from '@react-pdf/renderer';

// Register a nice font (optional, using Helvetica for now as it's standard)
// In a real app, you'd register Inter or Roboto here.

const styles = StyleSheet.create({
    page: { flexDirection: 'row', backgroundColor: '#FFFFFF' },
    sidebar: { width: '33%', backgroundColor: '#0f172a', padding: 20, color: 'white' },
    main: { width: '67%', padding: 30 },

    // Sidebar Styles
    profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 20, borderWidth: 3, borderColor: '#334155' },
    name: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, color: '#FFFFFF' },
    role: { fontSize: 10, textAlign: 'center', color: '#94a3b8', letterSpacing: 2, marginBottom: 30, textTransform: 'uppercase' },

    sidebarSection: { marginBottom: 25 },
    sidebarTitle: { fontSize: 10, fontWeight: 'bold', color: '#94a3b8', borderBottomWidth: 1, borderBottomColor: '#334155', paddingBottom: 5, marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase' },
    sidebarText: { fontSize: 9, color: '#cbd5e1', marginBottom: 5 },
    link: { fontSize: 9, color: '#cbd5e1', textDecoration: 'none', marginBottom: 5 },

    skillBadge: { backgroundColor: '#1e293b', padding: '4 8', borderRadius: 4, marginBottom: 5, fontSize: 9, color: '#e2e8f0' },

    // Main Content Styles
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

const ResumeDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Left Sidebar */}
            <View style={styles.sidebar}>
                {data.profilePictureUrl && (
                    <Image src={data.profilePictureUrl} style={styles.profileImage} />
                )}
                <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
                <Text style={styles.role}>Professional</Text>

                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>Contact</Text>
                    <Text style={styles.sidebarText}>{data.personalInfo.email}</Text>
                    <Text style={styles.sidebarText}>{data.personalInfo.phone}</Text>
                    <Text style={styles.sidebarText}>{data.personalInfo.address}</Text>
                </View>

                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>Links</Text>
                    {data.personalInfo.linkedin && <Link src={data.personalInfo.linkedin} style={styles.link}>LinkedIn</Link>}
                    {data.personalInfo.github && <Link src={data.personalInfo.github} style={styles.link}>GitHub</Link>}
                    {data.personalInfo.portfolio && <Link src={data.personalInfo.portfolio} style={styles.link}>Portfolio</Link>}
                </View>

                {data.skills.length > 0 && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>Skills</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                            {data.skills.map((skill, index) => (
                                <Text key={index} style={styles.skillBadge}>{skill}</Text>
                            ))}
                        </View>
                    </View>
                )}
            </View>

            {/* Right Main Content */}
            <View style={styles.main}>
                {data.summary && (
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>Profile</Text>
                        <Text style={styles.summaryText}>{data.summary}</Text>
                    </View>
                )}

                {data.experience.length > 0 && (
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>Experience</Text>
                        {data.experience.map((exp, index) => (
                            <View key={index} style={styles.expItem}>
                                <View style={styles.expHeader}>
                                    <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                                    <Text style={styles.dateBadge}>{exp.startDate} - {exp.endDate}</Text>
                                </View>
                                <Text style={styles.company}>{exp.company}</Text>
                                <Text style={styles.description}>{exp.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {data.education.length > 0 && (
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>Education</Text>
                        {data.education.map((edu, index) => (
                            <View key={index} style={styles.eduItem}>
                                <View>
                                    <Text style={styles.eduSchool}>{edu.institution}</Text>
                                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                                </View>
                                <Text style={styles.dateBadge}>{edu.startDate} - {edu.endDate}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </Page>
    </Document>
);

const PDFExport = ({ data }) => (
    <PDFDownloadLink document={<ResumeDocument data={data} />} fileName="resume.pdf">
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
