'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';

const Blog = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="fixed inset-0 -z-10 theme-page-bg"></div>
      
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-bold theme-text-secondary mb-6 leading-tight">
              Insights & Engineering
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Expert perspectives on AI, cloud infrastructure, data engineering, and modern software development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.div 
                key={post.slug}
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="theme-card rounded-2xl border theme-border-secondary shadow-lg overflow-hidden flex flex-col"
              >
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center"><Tag className="w-4 h-4 mr-1" /> {post.category}</span>
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-2xl font-bold theme-text-secondary mb-3 hover:text-emerald-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 mb-6 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t theme-border-secondary">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                      <User className="w-4 h-4 text-emerald-600" />
                      {post.author}
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-emerald-600 font-bold hover:underline flex items-center">
                      Read <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
