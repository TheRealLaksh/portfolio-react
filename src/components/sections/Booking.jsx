import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal } from '../ui/TextReveal';
import { Reveal } from '../ui/Reveal';
import { Parallax } from '../ui/Parallax';
import { GradientButton } from '../ui/GradientButton';
import { cn } from '../../utils/cn';

// --- Mock Data for Services & Time Slots ---
const bookingTypes = [
  {
    id: 'consultation',
    title: 'Free Discovery Call',
    duration: '15 Min',
    price: 'Free',
    description: 'Quick chat to see if we are a good fit.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
    )
  },
  {
    id: 'strategy',
    title: 'Strategy Session',
    duration: '60 Min',
    price: '$150',
    description: 'Deep dive into your project requirements.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
    )
  },
  {
    id: 'code-review',
    title: 'Code Review',
    duration: '45 Min',
    price: '$100',
    description: 'Reviewing your existing codebase.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    )
  }
];

const timeSlots = [
  "10:00 AM", "11:00 AM", "02:00 PM", "03:30 PM", "05:00 PM"
];

// --- Simple Calendar Generator (Next 7 Days) ---
const getNextDays = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 6; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      full: d,
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate()
    });
  }
  return dates;
};

const Booking = () => {
  const [step, setStep] = useState(1); // 1: Service, 2: Date/Time, 3: Details, 4: Success
  const [formData, setFormData] = useState({
    service: null,
    date: null,
    time: null,
    name: '',
    email: '',
    notes: ''
  });
  const [dates] = useState(getNextDays());

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Call
    setTimeout(() => {
        handleNext(); // Go to success
    }, 1000);
  };

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // --- Step Components ---

  const StepServices = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {bookingTypes.map((type) => (
        <div 
            key={type.id}
            onClick={() => { updateForm('service', type); handleNext(); }}
            className="cursor-pointer group relative bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative z-10">
                <div className="mb-4 bg-slate-800 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                    {type.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{type.title}</h3>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{type.duration}</span>
                    <span className="text-sky-400">{type.price}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{type.description}</p>
            </div>
        </div>
      ))}
    </div>
  );

  const StepDateTime = () => (
    <div className="space-y-8">
      {/* Date Selection */}
      <div>
        <h3 className="text-lg text-white font-medium mb-4">Select Date</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {dates.map((d, i) => {
                const isSelected = formData.date?.toDateString() === d.full.toDateString();
                return (
                    <button
                        key={i}
                        onClick={() => updateForm('date', d.full)}
                        className={cn(
                            "flex flex-col items-center justify-center min-w-[70px] h-[90px] rounded-xl border transition-all duration-300",
                            isSelected 
                                ? "bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-500/20" 
                                : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-800"
                        )}
                    >
                        <span className="text-xs uppercase font-bold tracking-wider mb-1 opacity-80">{d.day}</span>
                        <span className="text-2xl font-bold">{d.date}</span>
                    </button>
                )
            })}
        </div>
      </div>

      {/* Time Selection */}
      <div className="animate-fade-in">
        <h3 className="text-lg text-white font-medium mb-4">Select Time</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {timeSlots.map((time) => (
                <button
                    key={time}
                    disabled={!formData.date}
                    onClick={() => updateForm('time', time)}
                    className={cn(
                        "py-3 px-4 rounded-lg border text-sm font-medium transition-all",
                        !formData.date ? "opacity-50 cursor-not-allowed border-slate-800 text-slate-600" :
                        formData.time === time 
                            ? "bg-white text-slate-900 border-white shadow-lg"
                            : "bg-slate-900 border-slate-700 text-slate-300 hover:border-sky-500/50 hover:text-sky-400"
                    )}
                >
                    {time}
                </button>
            ))}
        </div>
      </div>
        
        <div className="flex justify-between pt-4 border-t border-slate-800">
            <button onClick={handleBack} className="text-slate-500 hover:text-white transition-colors">Back</button>
            <GradientButton 
                onClick={handleNext}
                disabled={!formData.date || !formData.time}
                className={cn("w-auto px-8", (!formData.date || !formData.time) && "opacity-50 pointer-events-none")}
            >
                Continue
            </GradientButton>
        </div>
    </div>
  );

  const StepDetails = () => (
    <form onSubmit={handleSubmit} className="space-y-5">
         <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800/50 mb-6 flex items-center justify-between">
            <div>
                <div className="text-sm text-slate-400">You are booking:</div>
                <div className="text-white font-medium flex items-center gap-2">
                    {formData.service?.title} 
                    <span className="text-slate-600">•</span> 
                    {formData.duration}
                </div>
                <div className="text-sky-400 text-sm mt-1">
                    {formData.date?.toLocaleDateString()} at {formData.time}
                </div>
            </div>
            <button type="button" onClick={() => setStep(1)} className="text-xs text-slate-500 hover:text-white underline">Change</button>
         </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
                <label className="text-sm text-slate-400 ml-1">Name</label>
                <input required type="text" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all" 
                    value={formData.name} onChange={(e) => updateForm('name', e.target.value)} placeholder="John Doe" />
            </div>
            <div className="space-y-2">
                <label className="text-sm text-slate-400 ml-1">Email</label>
                <input required type="email" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all" 
                    value={formData.email} onChange={(e) => updateForm('email', e.target.value)} placeholder="john@example.com" />
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-sm text-slate-400 ml-1">Additional Notes</label>
            <textarea rows="3" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all" 
                value={formData.notes} onChange={(e) => updateForm('notes', e.target.value)} placeholder="Anything specific you want to discuss?"></textarea>
        </div>

        <div className="flex justify-between pt-4">
            <button type="button" onClick={handleBack} className="text-slate-500 hover:text-white transition-colors">Back</button>
            <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-sky-900/20 transition-all transform active:scale-95">
                Confirm Booking
            </button>
        </div>
    </form>
  );

  const StepSuccess = () => (
    <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
        <p className="text-slate-400 max-w-md mx-auto mb-8">
            Thanks {formData.name}, your <strong>{formData.service?.title}</strong> is scheduled for <strong>{formData.date?.toLocaleDateString()} at {formData.time}</strong>. Check your email for the invite.
        </p>
        <GradientButton onClick={() => window.location.reload()} className="w-auto px-8">
            Back to Home
        </GradientButton>
    </div>
  );

  // --- Main Render ---
  return (
    <section id="booking" className="my-16 sm:my-32 relative z-10 w-full scroll-mt-20">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Parallax speed={-0.2} className="absolute top-0 right-10 text-slate-800/30 text-[8rem] font-bold font-mono opacity-20">
          BOOK
        </Parallax>
      </div>

      <div className="w-full px-6 md:px-12 max-w-[1000px] mx-auto relative z-10">
        
        <TextReveal className="flex flex-col items-center mb-12 text-center">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-white mb-4">
                Book a Session
            </h2>
            <p className="text-slate-400 max-w-lg">
                Schedule a call to discuss your project, code review, or just to say hi. 
                Select a slot below.
            </p>
        </TextReveal>

        <Reveal>
            <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50"></div>
                
                {/* Progress Bar (Optional) */}
                {step < 4 && (
                    <div className="flex justify-between mb-8 relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10"></div>
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 border-4",
                                step >= s ? "bg-sky-500 border-slate-900 text-white" : "bg-slate-900 border-slate-900 text-slate-600"
                            )}>
                                {s}
                            </div>
                        ))}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {step === 1 && <StepServices />}
                        {step === 2 && <StepDateTime />}
                        {step === 3 && <StepDetails />}
                        {step === 4 && <StepSuccess />}
                    </motion.div>
                </AnimatePresence>

            </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Booking;