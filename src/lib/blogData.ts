export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'nextjs-future-enterprise-web',
    title: 'Why Next.js is the Future of Enterprise Web Development',
    excerpt: 'Discover why Fortune 500 companies are migrating to Next.js for better performance, SEO, and developer experience.',
    content: `Next.js has rapidly become the standard for modern web development, particularly in the enterprise space. Here is why... \n\n### 1. Server-Side Rendering (SSR)\nNext.js makes it incredibly easy to render pages on the server, which is crucial for SEO and initial load performance.\n\n### 2. Static Site Generation (SSG)\nFor pages that don't change often, Next.js can pre-render them at build time, resulting in lightning-fast delivery via CDN.\n\n### 3. Developer Experience\nWith built-in routing, API routes, and zero configuration required to get started, Next.js empowers teams to ship faster.`,
    date: '2026-06-20',
    author: 'Ayan Bytes',
    readTime: '5 min read',
    category: 'Software Engineering',
  },
  {
    slug: 'reduce-aws-costs',
    title: 'How to Reduce AWS Costs by 30% Without Losing Performance',
    excerpt: 'Practical strategies for optimizing your cloud infrastructure spend through right-sizing, reserved instances, and waste removal.',
    content: `Cloud costs can easily spiral out of control if not managed properly. Here are our top strategies for keeping AWS bills in check:\n\n### 1. Right-size Your EC2 Instances\nMany teams over-provision servers "just in case". By analyzing CloudWatch metrics, you can downsize instances without affecting performance.\n\n### 2. Leverage Reserved Instances & Savings Plans\nIf you know your baseline compute usage, commit to a 1 or 3-year plan to save up to 72% compared to On-Demand prices.\n\n### 3. Setup Automated Scheduling\nTurn off non-production environments during nights and weekends. A simple Lambda function can save you ~70% on development server costs.`,
    date: '2026-06-15',
    author: 'Sarah Martinez',
    readTime: '7 min read',
    category: 'Cloud Infrastructure',
  },
  {
    slug: 'roi-custom-software-vs-saas',
    title: 'The ROI of Custom Software vs Off-the-Shelf SaaS',
    excerpt: 'When does it make sense to build rather than buy? We break down the long-term ROI of custom enterprise software.',
    content: `The "build vs buy" debate is as old as software itself. While SaaS is great for generic processes, custom software shines when your workflow is your competitive advantage.\n\n### The Hidden Costs of SaaS\nPer-user licensing fees scale linearly with your team. A $50/mo SaaS costs $60k/year for 100 employees.\n\n### The Custom Advantage\nWith custom software, you own the IP, there are no per-user fees, and the system works exactly the way your team does—not the other way around.`,
    date: '2026-06-10',
    author: 'Alex Thompson',
    readTime: '6 min read',
    category: 'Business Strategy',
  },
  {
    slug: 'getting-started-rag-pipelines',
    title: 'Getting Started with RAG Pipelines for Business Documents',
    excerpt: 'A non-technical guide to Retrieval-Augmented Generation and how it can unlock the knowledge trapped in your PDFs.',
    content: `LLMs are powerful, but they hallucinate and lack knowledge of your specific business. Enter RAG (Retrieval-Augmented Generation).\n\n### What is RAG?\nRAG connects an LLM to your internal documents. When you ask a question, it searches your documents first, then uses that specific context to generate a factual answer.\n\n### Business Applications\n- Customer support bots that actually know your manuals\n- Internal knowledge bases for faster onboarding\n- Automated contract analysis`,
    date: '2026-06-05',
    author: 'David Kim',
    readTime: '8 min read',
    category: 'AI & Automation',
  },
  {
    slug: 'signs-you-need-data-warehouse',
    title: '5 Signs Your Business Needs a Custom Data Warehouse',
    excerpt: 'Are you outgrowing Excel and fragmented dashboards? Here are the key indicators that it\'s time for a data warehouse.',
    content: `Data is only valuable if you can act on it. If you're experiencing these signs, it's time to upgrade your data stack:\n\n### 1. "Spreadsheet Hell"\nYour team spends more time combining CSVs than actually analyzing the data.\n\n### 2. Conflicting Metrics\nMarketing says you have 100 new customers, Sales says 80. Without a single source of truth, trust in data breaks down.\n\n### 3. Slow Queries\nYour dashboards take minutes to load, frustrating users and delaying decisions. A modern data warehouse like Snowflake or BigQuery solves this instantly.`,
    date: '2026-06-01',
    author: 'Emma Wilson',
    readTime: '5 min read',
    category: 'Data Analytics',
  },
];
