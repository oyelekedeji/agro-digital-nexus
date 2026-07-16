import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { CONTACT, BRAND_SHORT } from "../constants";

const OFFICES = [
  {
    city: "Lagos, Nigeria",
    address: "Victoria Island, Lagos",
    phone: "+234 800 AYO SCEND",
    email: "lagos@ayoscend.com",
    hours: "Mon–Fri, 8:00 AM – 6:00 PM WAT",
  },
  {
    city: "London, UK",
    address: "Canary Wharf, London E14",
    phone: "+44 20 7946 0958",
    email: "london@ayoscend.com",
    hours: "Mon–Fri, 9:00 AM – 5:00 PM GMT",
  },
  {
    city: "Dubai, UAE",
    address: "Business Bay, Dubai",
    phone: "+971 4 123 4567",
    email: "dubai@ayoscend.com",
    hours: "Sun–Thu, 9:00 AM – 6:00 PM GST",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you! We'll be in touch within 24 hours.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-gold">
                Get in Touch
              </span>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-semibold text-charcoal tracking-tight leading-[1.1]">
              Let's Build <span className="gold-text-gradient">Something Remarkable</span>
            </h1>
            <p className="mt-6 text-lg text-charcoal/60 leading-relaxed">
              Whether you're planning a commercial farm, designing a landscape, or seeking expert agricultural advisory — our team is ready to help you succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Offices */}
      <Section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div variants={fadeUp} custom={0} className="lg:col-span-3">
              {submitted ? (
                <div className="text-center py-16 px-8 rounded-xl border border-border/50 bg-zinc-50/50">
                  <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" strokeWidth={1} />
                  <h2 className="font-display text-2xl font-semibold text-charcoal mb-3">
                    Message Received
                  </h2>
                  <p className="text-charcoal/60 max-w-md mx-auto mb-6">
                    Thank you for reaching out. A member of our team will respond within 24 hours to discuss your project.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", company: "", phone: "", service: "", message: "" });
                    }}
                    className="text-gold font-medium text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Full Name <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-md border border-border bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Email Address <span className="text-gold">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-md border border-border bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company name"
                        className="w-full px-4 py-3 rounded-md border border-border bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        className="w-full px-4 py-3 rounded-md border border-border bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Service of Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-border bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-sm"
                    >
                      <option value="">Select a service</option>
                      <option value="horticulture">Horticulture & Landscape Design</option>
                      <option value="farm-setup">Farm Setup & Management</option>
                      <option value="consultancy">Agricultural Consultancy</option>
                      <option value="procurement">Agro Procurement & Supply</option>
                      <option value="digital">Digital & Workforce Infrastructure</option>
                      <option value="advisory">Agribusiness Advisory</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Message <span className="text-gold">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your project, goals, and timeline..."
                      className="w-full px-4 py-3 rounded-md border border-border bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-charcoal text-white text-sm font-medium rounded-md hover:bg-charcoal/90 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Offices */}
            <motion.div variants={fadeUp} custom={1} className="lg:col-span-2">
              <h2 className="font-display text-xl font-semibold text-charcoal mb-8">
                Our Offices
              </h2>
              <div className="space-y-8">
                {OFFICES.map((office) => (
                  <div key={office.city} className="pb-8 border-b border-border/50 last:border-0 last:pb-0">
                    <h3 className="font-display font-semibold text-charcoal text-lg mb-3">
                      {office.city}
                    </h3>
                    <div className="space-y-2.5 text-sm text-charcoal/60">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>{office.email}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* General Contact */}
              <div className="mt-8 p-6 rounded-lg bg-zinc-50/80 border border-border/50">
                <h3 className="font-display font-semibold text-charcoal mb-3">General Inquiries</h3>
                <div className="space-y-2 text-sm text-charcoal/60">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{CONTACT.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{CONTACT.phone}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CTA Band */}
      <Section className="py-20 lg:py-28 bg-charcoal">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} custom={0}>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4">
              Ready to Transform Your Vision?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8">
              From concept to harvest, {BRAND_SHORT} delivers excellence at every stage. Let's start the conversation.
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-white text-sm font-medium rounded-md hover:bg-gold/90 transition-colors"
            >
              Email Us Directly
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
