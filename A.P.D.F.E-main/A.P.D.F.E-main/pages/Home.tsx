
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Users, ShieldCheck, Activity, GraduationCap, ChevronLeft } from 'lucide-react';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    title: "Empowering Through Education",
    subtitle: "Building brighter futures by providing quality education and learning resources to children in underserved communities across Central Africa.",
    accent: "Education"
  },
  {
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
    title: "Healthcare for Every Mother",
    subtitle: "Ensuring safe delivery and postnatal care for women in conflict zones through our dedicated mobile health clinics.",
    accent: "Healthcare"
  },
  {
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop",
    title: " survivor-led Transformation",
    subtitle: "Turning pain into purpose. Our organization is led by survivors, for survivors, creating a legacy of resilience.",
    accent: "Resilience"
  }
];

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Slideshow Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className={`w-full h-full object-cover transition-transform duration-[10s] ease-linear ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}

        {/* Slideshow Content - Centered */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div key={currentSlide} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
              <Heart size={12} className="text-red-400" /> Making a difference since 2019
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              {slideContent(HERO_SLIDES[currentSlide])}
            </h1>
            <p className="text-base md:text-lg text-slate-200 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/donate" 
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-bold shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Make a Donation <ChevronRight size={16} />
              </Link>
              <Link 
                to="/about" 
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 md:left-8 z-20 p-2 rounded-full bg-black/20 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 md:right-8 z-20 p-2 rounded-full bg-black/20 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-10 flex gap-2 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-green-400' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:-mt-16 relative z-10 max-w-6xl mx-auto rounded-xl shadow-2xl px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Lives Impacted", value: "5000+", icon: <Heart className="text-red-500" /> },
          { label: "Active Programs", value: "25", icon: <Activity className="text-blue-500" /> },
          { label: "Volunteers", value: "500", icon: <Users className="text-green-500" /> },
          { label: "Countries Reached", value: "4", icon: <ShieldCheck className="text-amber-500" /> },
        ].map((stat, idx) => (
          <div key={idx} className="text-center group">
            <div className="flex justify-center mb-4 transition-transform group-hover:scale-110 duration-300">
              {React.cloneElement(stat.icon as React.ReactElement, { size: 32 })}
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">About A.P.D.F.E</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">Dedicated to creating sustainable change worldwide.</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              The Association for People Development and Future Enhancement is a non-profit organization founded in 2015. We believe that every person deserves access to quality education, healthcare, and opportunities for personal growth.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              {['Community Focused', 'Sustainable Solutions', 'Global Impact', 'Transparency'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-800 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  {item}
                </div>
              ))}
            </div>
            <Link to="/about" className="inline-block px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-bold transition-all shadow-lg">
              Learn More About Us
            </Link>
          </div>
          <div className="relative order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop" 
              alt="Child" 
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 hidden sm:block">
              <div className="text-4xl font-extrabold text-blue-600 mb-1">10+</div>
              <div className="text-sm font-bold text-slate-500 uppercase">Years of Dedicated Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="bg-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">How We're Making a Difference</h2>
              <p className="text-slate-600">Discover the various ways we're making a difference in communities around the world through our comprehensive programs.</p>
            </div>
            <Link to="/programs" className="px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg font-bold transition-all shadow-sm">
              View All Programs
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Education Initiative",
                desc: "Providing quality education and learning resources to children and adults in underserved communities.",
                icon: <GraduationCap size={24} />,
                color: "bg-blue-100 text-blue-600",
                img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
              },
              {
                title: "Healthcare Access",
                desc: "Bringing essential medical services to remote areas through mobile clinics and health centers.",
                icon: <Activity size={24} />,
                color: "bg-green-100 text-green-600",
                img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
              },
              {
                title: "Skills Development",
                desc: "Empowering individuals with vocational training and entrepreneurship skills to create sustainable livelihoods.",
                icon: <Users size={24} />,
                color: "bg-amber-100 text-amber-600",
                img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="h-64 overflow-hidden relative">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute top-4 left-4 p-3 rounded-full ${card.color}`}>
                    {card.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{card.desc}</p>
                  <Link to={`/programs`} className="flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all">
                    Learn More <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Stories Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Impact in Action</span>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Real Stories, Real Change</h2>
          <p className="text-slate-600">See the real-world impact of our programs through the communities we serve with these stories of transformation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { tag: "Community Building", title: "Revitalizing Local Infrastructure", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" },
            { tag: "Education", title: "A New School Year", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" },
            { tag: "Skills", title: "Women Entrepreneurs", img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop" },
            { tag: "Relief", title: "Emergency Food Relief", img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2031&auto=format&fit=crop" }
          ].map((story, idx) => (
            <div key={idx} className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
              <img src={story.img} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase rounded-md mb-3">{story.tag}</span>
                <h3 className="text-2xl font-bold text-white leading-tight">{story.title}</h3>
                <p className="text-slate-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Working hand-in-hand with locals to create safe spaces.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Hear From Our Community</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "The support from A.P.D.F.E changed my life. I was able to finish my education and start my own business. I am forever grateful.", author: "Sarah M.", role: "Program Beneficiary", img: "https://picsum.photos/seed/sarah/100/100" },
              { text: "Volunteering with this team has been the most rewarding experience of my life. The impact is visible and immediate.", author: "David K.", role: "Volunteer", img: "https://picsum.photos/seed/david/100/100" },
              { text: "Transparency and dedication define this organization. I trust them completely to make the most of my donations.", author: "Emily R.", role: "Regular Donor", img: "https://picsum.photos/seed/emily/100/100" }
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-slate-900">{t.author}</div>
                    <div className="text-xs text-slate-500 uppercase font-semibold">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to handle rich text in titles
const slideContent = (slide: typeof HERO_SLIDES[0]) => {
  const parts = slide.title.split(slide.accent);
  return (
    <>
      {parts[0]}
      <span className="text-green-400">{slide.accent}</span>
      {parts[1]}
    </>
  );
};
