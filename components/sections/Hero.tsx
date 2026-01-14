'use client';

import Image from 'next/image';
import Link from 'next/link';
import profilePic from '../../public/Nikhil_image.png'; // Import the file

export default function Hero() {  
  return (
    <section className="relative  max-w-4xl mx-auto px-6 py-20 md:py-32">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Nikhil Patil
          </h1>
          
          <div className="space-y-4">
            <p className="text-xl md:text-2xl font-medium text-muted-foreground">
              Building <span className="text-foreground border-b-2 border-primary/50">X Code Reviewer AI</span> 
              <span className="mx-2 text-muted-foreground/40">&</span> 
              scalable MERN solutions.
            </p>
            
            <p className="max-w-[600px] text-lg text-muted-foreground leading-relaxed">
              Senior Full-Stack Developer specializing in high-performance SaaS products, 
              AI integrations, and modern web architectures.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
            <Link 
              href="https://twitter.com/yourhandle" 
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all shadow-lg"
            >
              Follow on Twitter
            </Link>
            <button className="px-6 py-3 rounded-full border border-input bg-background hover:bg-accent transition-all">
              View Projects
            </button>
          </div>
        </div>

        {/* Right Side: Professional Image Section */}
        <div className="relative group">
          {/* Shadcn-style decorative background glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative flex items-center justify-center bg-card border border-border p-2 rounded-2xl shadow-2xl overflow-hidden">
            <div className="relative w-28 h-28 md:w-34 md:h-34 rounded-xl overflow-hidden bg-muted">
              {/* Replace '/profile.jpg' with your actual image path */}
              <Image
                src={profilePic}
                alt="Manu Arora - Full Stack Developer"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                priority
              />
              {/* Overlay for depth */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-xl" />
            </div>
          </div>
          
          {/* Floating Badge (Optional) */}
          <div className="absolute -bottom-4 -right-4 bg-background border border-border px-4 py-2 rounded-lg shadow-xl hidden md:block">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Available for Hire</p>
          </div>
        </div>

      </div>
    </section>
  );
}