import React from "react";
import { motion } from "framer-motion";
import { Briefcase, ShoppingCart, Image, Utensils, Dumbbell, BookOpen, HeartPulse, Home, FileText, LayoutTemplate, UserCircle, Code } from "lucide-react";

const categories = [
  { name: "Business Website", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "eCommerce Store", icon: ShoppingCart, color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "Portfolio", icon: Image, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Restaurant", icon: Utensils, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Gym", icon: Dumbbell, color: "text-slate-500", bg: "bg-slate-50" },
  { name: "Tuition Center", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Hospital/Clinic", icon: HeartPulse, color: "text-red-500", bg: "bg-red-50" },
  { name: "Real Estate", icon: Home, color: "text-cyan-500", bg: "bg-cyan-50" },
  { name: "Blog", icon: FileText, color: "text-pink-500", bg: "bg-pink-50" },
  { name: "Landing Page", icon: LayoutTemplate, color: "text-violet-500", bg: "bg-violet-50" },
  { name: "Personal Brand", icon: UserCircle, color: "text-yellow-500", bg: "bg-yellow-50" },
  { name: "Custom Website", icon: Code, color: "text-blue-600", bg: "bg-blue-50" },
];

export function CategoriesSection() {
  return (
    <section id="services" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Kind of Website Do You Need?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Select from our specialized categories, each built with industry-best practices.</p>
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <div className="group cursor-pointer rounded-2xl border border-border bg-white/70 backdrop-blur-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 p-6 flex flex-col items-center text-center gap-4 h-full justify-center">
                <div className={`p-4 rounded-2xl ${cat.bg} group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className={`w-8 h-8 ${cat.color}`} />
                </div>
                <h3 className="font-semibold text-lg">{cat.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
                    }
