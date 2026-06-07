'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase, MapPin, DollarSign, ArrowRight, Cpu, Globe, Code,
    BarChart, User, Mail, GraduationCap, Link as LinkIcon,
    Clock, ChevronRight, Layout, Upload, X, CheckCircle2, ChevronDown,
} from 'lucide-react';

// Utility to normalize URLs
const normalizeUrl = (value: string): string => {
    const v = value.trim();
    if (!v) return '';
    if (/^https?:\/\//i.test(v)) return v;
    return `https://${v}`;
};

const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result;
            if (typeof result !== 'string') {
                reject(new Error('Unable to read resume file.'));
                return;
            }

            resolve(result.split(',')[1] || '');
        };

        reader.onerror = () => reject(new Error('Unable to read resume file.'));
        reader.readAsDataURL(file);
    });
};



//Custom themed input with icon
const IconInput = ({
    icon: Icon,
    ...props
}: { icon: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 theme-text-secondary pointer-events-none">
            <Icon className="w-4 h-4" />
        </span>
        <input
            {...props}
            className={`theme-input w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-all cursor-pointer ${props.className ?? ''}`}
        />
    </div>
);



// roles for dropdown
const roles = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'AI/ML Engineer', 'UI/UX Designer', 'Product Manager',
];



// Custom dropdown for role selection
const RoleSelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="theme-input w-full rounded-xl px-4 py-3 focus:outline-none transition-all flex items-center justify-between text-left text-sm"
            >
                <span className="text-gray-700">{value}</span>
                <ChevronDown className={`w-4 h-4 theme-text-secondary transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown panel */}
            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 shadow-lg overflow-hidden"
                        style={{ background: 'var(--color-page-bg, #dce8df)' }}
                    >
                        {roles.map(r => (
                            <li
                                key={r}
                                onClick={() => { onChange(r); setOpen(false); }}
                                className={`theme-dropdown-option px-4 py-3 text-sm cursor-pointer transition-colors
                                    ${r === value
                                        ? 'theme-dropdown-option-active font-semibold'
                                        : ''
                                    }`}
                            >
                                {r}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

//Main component
const OpenPositions = () => {

    interface JobOpening {
        id: string; title: string; description: string; department: string;
        location: string; salary: string; type: string; required: string[]; icon: any;
    }

    const [hasOpenings, setHasOpenings] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [portfolio, setPortfolio] = useState('');
    const [github, setGithub] = useState('');
    const [role, setRole] = useState(roles[0]);
    const fileInputRef = useRef<HTMLInputElement>(null);



    // load resume from localStorage
    useEffect(() => {
        const storedResume = localStorage.getItem('resume');
        const storedName = localStorage.getItem('resumeName');

        if (storedResume && storedName) {
            fetch(storedResume)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], storedName, { type: 'application/pdf' });
                    setResumeFile(file);
                });
        }
    }, []);


    // Sample job openings data

    const jobOpenings: JobOpening[] = [
        {
            id: '1', title: 'Senior Full Stack Developer',
            description: 'Lead our web infrastructure using React, Node.js, and specialized AI APIs.',
            department: 'Engineering', location: 'Remote / San Francisco',
            salary: '$140k - $180k', type: 'Full-time',
            required: ['React', 'Node.js', 'PostgreSQL', 'Cloud Architecture'], icon: Code,
        },
        {
            id: '2', title: 'AI/ML Engineer',
            description: 'Design and fine-tune custom LLM models for our enterprise clients.',
            department: 'AI & Data', location: 'New York, NY',
            salary: '$150k - $200k', type: 'Full-time',
            required: ['Python', 'PyTorch', 'NLP', 'Data Science'], icon: Cpu,
        },
        {
            id: '3', title: 'UX/UI Product Designer',
            description: 'Create intuitive dashboards and interfaces for complex AI automation workflows.',
            department: 'Product', location: 'Remote',
            salary: '$110k - $150k', type: 'Contract',
            required: ['Figma', 'Prototyping', 'Design Systems', 'User Research'], icon: Globe,
        },
    ];


    // For demo purposes, toggle openings after 3 seconds
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };


    // handle PDF file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setResumeFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                localStorage.setItem('resume', reader.result as string);
                localStorage.setItem('resumeName', file.name);
            };
            reader.readAsDataURL(file);
        }
    };


    // handle drag and drop for PDF upload
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type === 'application/pdf') {
            setResumeFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                localStorage.setItem('resume', reader.result as string);
                localStorage.setItem('resumeName', file.name);
            };
            reader.readAsDataURL(file);
        }
    };


    // handle drag over and leave for styling
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = () => setIsDragging(false);
    const removeFile = () => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; };


    // handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError('');
        setIsSubmitting(true);

        try {
            const form = e.currentTarget;
            const fd = new FormData(form);
            const resumeBase64 = resumeFile ? await fileToBase64(resumeFile) : '';

            fd.set('portfolio', normalizeUrl(portfolio));
            fd.set('github', normalizeUrl(github));
            fd.set('role', role);

           
            const res = await fetch('/api/v1/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: fd.get('name'),
                    email: fd.get('email'),
                    college: fd.get('college'),
                    graduationYear: fd.get('graduation_year'),
                    role,
                    experience: fd.get('experience'),
                    portfolio: normalizeUrl(portfolio),
                    github: normalizeUrl(github),
                    resume: {
                        fileName: resumeFile?.name,
                        mimeType: resumeFile?.type,
                        size: resumeFile?.size,
                        base64: resumeBase64,
                    },
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                localStorage.removeItem('resume');
                localStorage.removeItem('resumeName');

                setIsSubmitted(true);
            } else {
                setSubmitError(
                    data?.message
                    ?? (data?.errors as any[])?.map((e: any) => e.message).join(', ')
                    ?? 'Submission failed. Please try again.'
                );
            }
        } catch {
            setSubmitError('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };



    // Reset form to initial state
    const resetForm = () => {
        setIsSubmitted(false); setSubmitError(''); setResumeFile(null);
        setPortfolio(''); setGithub(''); setRole(roles[0]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="min-h-screen theme-page-bg pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* header  */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl text-gray-900 mb-6 font-bold">
                        Build the Future <span className="theme-text-secondary">at ASG Solutions</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        We're looking for visionary creators, engineers, and designers to help us bridge
                        the gap between human potential and artificial intelligence.
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {hasOpenings ? (
                        // Open Positions List 
                        <motion.div
                            key="openings"
                            variants={containerVariants} initial="hidden" animate="visible"
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Current Openings</h2>
                                <div className="flex items-center gap-2 text-sm font-medium theme-text-secondary">
                                    <Clock className="w-4 h-4" /><span>Latest update: Today</span>
                                </div>
                            </div>

                            {jobOpenings.map((job) => {
                                const JobIcon = job.icon;
                                return (
                                    <motion.div key={job.id} variants={itemVariants}
                                        className="rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <div className="p-6 md:p-10">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                                <div className="flex items-start gap-5">
                                                    <div className="p-4 theme-input rounded-2xl">
                                                        <JobIcon className="w-8 h-8 theme-text-secondary" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h3>
                                                        <p className="text-gray-500 max-w-lg leading-relaxed">{job.description}</p>
                                                    </div>
                                                </div>
                                                <span className="px-4 py-1.5 theme-text-secondary border rounded-full text-xs font-bold tracking-wide uppercase">
                                                    {job.type}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 mt-8 border-t border-b border-gray-100">
                                                {[
                                                    { icon: Briefcase, text: job.department },
                                                    { icon: MapPin, text: job.location },
                                                    { icon: DollarSign, text: job.salary },
                                                    { icon: Clock, text: 'Posted 2d ago' },
                                                ].map(({ icon: Icon, text }, i) => (
                                                    <div key={i} className="flex items-center gap-3 text-gray-600">
                                                        <Icon className="w-5 h-5 theme-text-secondary" />
                                                        <span className="text-sm font-semibold">{text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                                <div className="flex flex-wrap gap-2">
                                                    {job.required.map((req, index) => (
                                                        <span key={index} className="px-3 py-1 theme-text-secondary border rounded-3xl text-[11px] font-bold uppercase tracking-tight">
                                                            {req}
                                                        </span>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => setHasOpenings(false)}
                                                    className="w-full sm:w-auto px-8 py-3.5 theme-bg-secondary text-white rounded-3xl font-bold flex items-center justify-center gap-2 cursor-pointer"
                                                >
                                                    Apply Now <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        // Talent Pool Form 
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="max-w-3xl mx-auto rounded-2xl shadow-xl overflow-hidden border"
                        >
                            {isSubmitted ? (
                                // Success Message
                                <div className="p-12 text-center py-24">
                                    <div className="w-20 h-20 theme-input rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10 theme-text-secondary" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Received!</h2>
                                    <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                                        Thank you for showing interest in ASG Solutions. We've added you to our talent pool
                                        and will reach out if a matching position opens up.
                                    </p>
                                    <button onClick={resetForm}
                                        className="px-8 py-3 theme-bg-secondary text-white rounded-xl font-bold cursor-pointer transition-all hover:scale-105"
                                    >
                                        Done
                                    </button>
                                </div>
                            ) : (
                                //
                                <div className="p-8 md:p-12">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="p-4 theme-input rounded-2xl">
                                            <User className="w-8 h-8 theme-text-secondary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">ASG Talent Pool</h2>
                                            <p className="text-gray-500 text-sm">No direct openings match? Tell us about yourself.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">

                                        {/* Row 1 — Name + Email */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Full Name</label>
                                                <IconInput icon={User} required type="text" name="name" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Email Address</label>
                                                <IconInput icon={Mail} required type="email" name="email" placeholder="john@example.com" />
                                            </div>
                                        </div>

                                        {/* Row 2 — College + Graduation */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">College / University</label>
                                                <IconInput icon={GraduationCap} required type="text" name="college" placeholder="University Name" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Year of Graduation</label>
                                                <IconInput icon={Clock} required type="text" name="graduation_year" placeholder="e.g. 2024" />
                                            </div>
                                        </div>

                                        {/* Row 3 — Role (custom) + Experience */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Role You're Good At</label>
                                                <RoleSelect value={role} onChange={setRole} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Years of Experience</label>
                                                <IconInput icon={BarChart} required type="text" name="experience" placeholder="e.g. 2+ years / Fresher" />
                                            </div>
                                        </div>

                                        {/* Row 4 — Portfolio + GitHub */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Portfolio / Personal Link</label>
                                                <IconInput
                                                    icon={LinkIcon} type="text" name="portfolio"
                                                    value={portfolio} onChange={e => setPortfolio((e.target as HTMLInputElement).value)}
                                                    placeholder="samad.portfolio or https://..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">GitHub Profile</label>
                                                <IconInput
                                                    icon={Layout} type="text" name="github"
                                                    value={github} onChange={e => setGithub((e.target as HTMLInputElement).value)}
                                                    placeholder="github.com/username"
                                                />
                                            </div>
                                        </div>

                                        {/* PDF Upload */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Resume / CV (PDF)</label>
                                            <input ref={fileInputRef} id="resume-upload" type="file"
                                                accept="application/pdf" onChange={handleFileChange}
                                                className="hidden" required
                                            />
                                            {resumeFile ? (
                                                <div className="theme-input flex items-center justify-between rounded-xl px-4 py-3 border theme-border-secondary">
                                                    <div className="flex items-center gap-3">
                                                        <CheckCircle2 className="w-5 h-5 theme-text-secondary shrink-0" />
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-800 truncate max-w-xs">{resumeFile.name}</p>
                                                            <p className="text-xs text-gray-500">{(resumeFile.size / 1024).toFixed(0)} KB · PDF</p>
                                                        </div>
                                                    </div>
                                                    <button type="button" onClick={removeFile}
                                                        className="p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-gray-500"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label htmlFor="resume-upload"
                                                    onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
                                                    className={`flex flex-col items-center justify-center gap-2 rounded-xl px-4 py-8 border-2 border-dashed cursor-pointer transition-all text-center
                                                        ${isDragging ? 'theme-bg-secondary border-transparent' : 'theme-input hover:border-emerald-500'}`}
                                                >
                                                    <Upload className={`w-6 h-6 ${isDragging ? 'text-white' : 'theme-text-secondary'}`} />
                                                    <span className={`text-sm font-semibold ${isDragging ? 'text-white' : 'text-gray-700'}`}>
                                                        {isDragging ? 'Drop your PDF here' : 'Click to upload or drag & drop'}
                                                    </span>
                                                    <span className={`text-xs ${isDragging ? 'text-green-100' : 'text-gray-400'}`}>
                                                        PDF only · Max 10MB
                                                    </span>
                                                </label>
                                            )}
                                        </div>

                                        {/* Error */}
                                        {submitError && (
                                            <div className="rounded-xl px-4 py-3 border text-red-600 text-sm font-medium">
                                                {submitError}
                                            </div>
                                        )}

                                        {/* Submit */}
                                        <div className="pt-2">
                                            <button type="submit" disabled={isSubmitting}
                                                className="w-full py-4 theme-bg-secondary text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 cursor-pointer group transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        <span>Submitting...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Submit Application</span>
                                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OpenPositions;
