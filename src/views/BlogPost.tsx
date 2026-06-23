'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react';
import Link from 'next/link';
import { BlogPost as BlogPostType } from '@/lib/blogData';

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="fixed inset-0 -z-10 theme-page-bg"></div>
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blog" className="inline-flex items-center text-emerald-600 font-semibold hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 flex-wrap">
            <span className="flex items-center"><Tag className="w-4 h-4 mr-1" /> {post.category}</span>
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {post.readTime}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold theme-text-secondary mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-3 mb-10 pb-10 border-b theme-border-secondary">
            <div className="w-12 h-12 rounded-full theme-bg-secondary text-white flex items-center justify-center font-bold text-xl">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500">ASG Solutions Expert</p>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700 prose-headings:theme-text-secondary prose-a:text-emerald-600">
            {/* Extremely simple markdown rendering for the placeholder content */}
            {post.content.split('\\n').map((line, i) => {
              if (line.startsWith('### ')) {
                return <h3 key={i} className="text-2xl font-bold mt-8 mb-4">{line.replace('### ', '')}</h3>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="ml-6 mb-2">{line.replace('- ', '')}</li>;
              }
              if (line.trim() === '') {
                return <br key={i} />;
              }
              return <p key={i} className="mb-4 leading-relaxed">{line}</p>;
            })}
          </div>
        </motion.div>
        
        <div className="mt-16 pt-10 border-t theme-border-secondary text-center">
          <h3 className="text-2xl font-bold theme-text-secondary mb-4">Want to implement this in your business?</h3>
          <Link href="/contact" className="inline-block px-8 py-4 theme-bg-secondary text-white rounded-3xl font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Talk to an Expert
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
