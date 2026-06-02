'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

const FALAH_TRIPS_VIDEO_PATH = '/videos/tripAi.mp4';
const ERP_AI_VIDEO_PATH = '/videos/erpAi.mp4';
const LEAD_AI_VIDEO_PATH = '/videos/leadAi.mp4';
const GATHERLY_VIDEO_PATH = '/videos/gatherly.mp4';

type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  videoPath?: string;
  liveUrl: string;
  industry: string;
  technologies: string[];
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'FallahTrips: AI Trip Planner',
    description: 'A fully AI-powered travel planning engine tailored for the UAE. Generates personalized itineraries using a multi-step LangChain pipeline backed by Google Gemini 1.5 Flash.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Modern city skyline representing AI-powered travel planning',
    videoPath: FALAH_TRIPS_VIDEO_PATH,
    liveUrl: 'https://fallah-trips.vercel.app',
    industry: 'TRAVEL AI',
    technologies: ['React', 'Supabase', 'LangChain', 'FastAPI', 'Gemini AI', 'Tailwind'],
  },
  {
    id: 2,
    title: 'Aetheris ERP AI',
    description: 'An enterprise-grade AI ERP automation platform with HRMS, CRM, finance, inventory, workflow automation, document OCR, RAG chat, SQL insights, and a multi-agent orchestrator for business operations.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Enterprise analytics dashboard with charts and operational data',
    videoPath: ERP_AI_VIDEO_PATH,
    liveUrl: 'https://erp-ai-eta.vercel.app/dashboard',
    industry: 'ENTERPRISE ERP AI',
    technologies: ['Next.js 15', 'FastAPI', 'Aiven', 'LangChain', 'Groq', 'Celery', 'Redis'],
  },
  {
    id: 3,
    title: 'Lead Magnet AI',
    description: 'An AI-powered technical lead generation platform that runs deep company audits, researches competitors and LinkedIn signals, generates PDF reports, supports CSV bulk analysis, and manages subscriptions with Razorpay token limits.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Team reviewing lead generation strategy and technical audit insights',
    videoPath: LEAD_AI_VIDEO_PATH,
    liveUrl: 'https://lead-ai-smoky.vercel.app/#/',
    industry: 'LEAD GENERATION AI',
    technologies: ['React', 'Vite', 'Render', 'FastAPI', 'LangChain', 'Groq', 'Razorpay'],
  },
  {
    id: 4,
    title: 'Gatherly',
    description: 'A professional social networking app where users can connect, chat anonymously in private rooms, and run end-to-end meetings with realtime collaboration support.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Professional networking meetup and collaborative social session',
    videoPath: GATHERLY_VIDEO_PATH,
    liveUrl: 'https://gatherly-phi-six.vercel.app/login',
    industry: 'SOCIAL COLLABORATION',
    technologies: ['React', 'Node.js', 'Socket.IO', 'LiveKit', 'Supabase', 'Redis'],
  },
];





const VideoModal = ({ videoPath, isOpen, onClose }: { videoPath?: string; isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && videoPath && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden z-10 shadow-2xl">
            <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"><X className="w-6 h-6" /></button>
            <video src={videoPath} className="w-full h-full" controls autoPlay />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);

  const currentProject = portfolioItems[currentIndex];
  const hasVideo = Boolean(currentProject.videoPath);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 theme-page-bg">
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoPath={currentProject.videoPath} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex} // Using index as key ensures the transition triggers on every change
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="rounded-[3rem] overflow-hidden shadow-sm border"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                {/* VIDEO SECTION */}
                <div
                  className="relative aspect-video lg:aspect-auto bg-slate-900 cursor-pointer overflow-hidden m-4 lg:m-6 rounded-[2.5rem]"
                  onMouseEnter={() => setIsHoveringVideo(true)}
                  onMouseLeave={() => setIsHoveringVideo(false)}
                  onClick={() => hasVideo && setIsModalOpen(true)}
                >
                  <img
                    src={currentProject.imageUrl}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${isHoveringVideo && hasVideo ? 'opacity-0' : 'opacity-100'}`}
                    alt={currentProject.imageAlt}
                  />
                  {hasVideo && <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHoveringVideo ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-xl">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>}
                  {isHoveringVideo && currentProject.videoPath && (
                    <video
                      src={currentProject.videoPath}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  )}
                </div>

                {/* CONTENT SECTION */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block w-fit px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest bg-[#0C4B2A]/10 text-[#0C4B2A] mb-6">
                    {currentProject.industry}
                  </span>

                  <h2 className="text-4xl lg:text-5xl font-bold text-[#0C4B2A] mb-6">{currentProject.title}</h2>

                  <p className="text-lg text-gray-600 leading-relaxed mb-6">{currentProject.description}</p>

                  {/* NEW: Technology Tags Chips */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {currentProject.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 border text-xs font-medium rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center px-8 py-4 bg-[#0C4B2A] text-white rounded-full font-bold hover:bg-[#08361e] transition-all">
                      View Live Project <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                    <Link href="/contact" className="flex items-center px-8 py-4 border border-[#0C4B2A] rounded-full font-semibold text-[#0C4B2A] hover:bg-[#0C4B2A] hover:text-white transition-all ease-in-out">
                      <MessageSquare className="w-4 h-4 mr-2" /> Discuss Similar Work
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CONTROLS & PAGINATION */}
          <div className="mt-12 w-full flex items-center justify-center">
            {/* Changed: Removed w-full here and added justify-center */}
            <div className="flex gap-6 justify-center">
              <button
                onClick={prevProject}
                className="p-5 rounded-full border hover:cursor-pointer hover:theme-bg-secondary transition-all ease-in-out"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextProject}
                className="p-5 rounded-full border hover:cursor-pointer hover:theme-bg-secondary transition-all ease-in-out"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Portfolio;
