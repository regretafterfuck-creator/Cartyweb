import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick, FileSpreadsheet, Users, Rocket } from "lucide-react";

const steps = [
  { title: "Choose Website Type", description: "Browse our categories and select the one that fits your needs.", icon: MousePointerClick },
  { title: "Submit Requirements", description: "Fill out a brief form with your content, colors, and preferences.", icon: FileSpreadsheet },
  { title: "Get Matched", description: "We pair you with a verified expert for your niche.", icon: Users },
  { title: "Review & Receive", description: "Review, request revisions, and get your live site.", icon: Rocket },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">From idea to live website in four simple steps.</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gray-200" />
          <div className="grid lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white border border-gray-200 shadow-lg flex items-center justify-center mb-6 relative">
                  <step.icon className="w-8 h-8 text-primary" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm border-2 border-white">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
