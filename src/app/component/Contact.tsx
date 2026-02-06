"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Variants } from "framer-motion";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const bannerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Smoother easing
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.98 
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideInFromLeft: Variants = {
    hidden: { 
      x: -30, 
      opacity: 0,
      rotateX: 5 
    },
    visible: {
      x: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideInFromRight: Variants = {
    hidden: { 
      x: 30, 
      opacity: 0,
      rotateX: 5 
    },
    visible: {
      x: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const childItem: Variants = {
    hidden: { 
      y: 15, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const formItem: Variants = {
    hidden: { 
      y: 10, 
      opacity: 0,
      filter: "blur(2px)" 
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const mapVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!agreed) {
      alert("Please agree to the Terms and Privacy Policy");
      return;
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
        setAgreed(false);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="bg-[#060042] py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={bannerContainerVariants}
        className="max-w-5xl mx-auto relative"
      >
        {/* Title Section */}
        <motion.div
          variants={fadeInUp}
          className="relative h-40 sm:h-56 lg:h-72 flex items-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold uppercase text-white z-10">
            Contact us
          </h1>
        </motion.div>

        {/* Main Content Card */}
        <motion.div variants={fadeInUp} className="max-w-5xl mx-auto bg-blue-950 rounded-xl p-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column - Contact Info */}
            <motion.div
              variants={slideInFromLeft}
              className="p-4 lg:p-5"
            >
              <motion.div variants={staggerChildren}>
                {/* Company Name */}
                <motion.h1 variants={childItem} className="text-white text-xl lg:text-2xl font-bold mb-4">
                  Bright ELV Technology LLC
                </motion.h1>

                {/* Address Section */}
                <motion.div variants={childItem} className="mb-5 flex gap-2">
                  <svg
                    className="w-5 h-5 text-white flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-white text-xs leading-relaxed">
                    PB NO:381108, Showroom No:4, Mustafa Building,
                    <br />
                    Satellite Market, Naif, Deira, Dubai, UAE
                  </p>
                </motion.div>

                {/* Contact Details */}
                <motion.div variants={childItem} className="mb-5 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    <p className="text-white text-xs font-medium">+971 466 52 233</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z" />
                    </svg>
                    <p className="text-white text-xs font-medium">+971 56 5022960</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <a href="mailto:sales@brightelv.com" className="text-white text-xs font-medium hover:opacity-80 transition-opacity">
                      Sales@brightelv.Com
                    </a>
                  </div>
                </motion.div>

                {/* Message Section */}
                <motion.div variants={childItem} className="border-opacity-20 pt-4">
                  <p className="text-white text-base leading-relaxed mb-1">
                    If You Do Not Receive An Email Response Over 1 Working Day
                  </p>
                  <p className="text-white text-base font-semibold">
                    Please Contact Us
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              variants={slideInFromRight}
              className="p-2 lg:p-3"
            >
              <motion.h2 variants={childItem} className="text-white text-lg lg:text-xl font-bold mb-3">
                Get In Touch With Us
              </motion.h2>

              <motion.div variants={staggerChildren} className="space-y-2">
                {[
                  { name: "name", placeholder: "Your name", type: "text" },
                  { name: "phone", placeholder: "+351 XXX XXX XXX", type: "tel" },
                  { name: "email", placeholder: "your.email@example.com", type: "email" },
                  { name: "subject", placeholder: "How can we help?", type: "text" },
                ].map((field, index) => (
                  <motion.div key={field.name} custom={index} variants={formItem}>
                    <input
                      type={field.type as any}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 bg-transparent text-white
                        border border-white/40 rounded
                        placeholder-white/70 text-xs
                        focus:outline-none focus:ring-2 focus:ring-white/60
                        transition-all duration-300
                        hover:border-white/60"
                    />
                  </motion.div>
                ))}

                <motion.div custom={4} variants={formItem}>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-3 py-2 bg-transparent text-white
                      border border-white/40 rounded
                      placeholder-white/70 text-xs resize-none
                      focus:outline-none focus:ring-2 focus:ring-white/60
                      transition-all duration-300
                      hover:border-white/60"
                  />
                </motion.div>

                <motion.div custom={5} variants={formItem} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 bg-transparent border-white/50
                      text-white focus:ring-white cursor-pointer
                      transition-all duration-300
                      hover:border-white/70"
                  />
                  <label className="text-xs text-white/80 leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <a href="/terms" className="underline text-white hover:text-white/70 transition-colors">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="underline text-white hover:text-white/70 transition-colors">
                      Privacy Policy
                    </a>
                  </label>
                </motion.div>

                <motion.div custom={6} variants={formItem}>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-4 sm:px-6 py-1.5 bg-blue-900 text-white 
                      hover:bg-[#3a2b6b] font-semibold transition-all 
                      duration-300 text-sm sm:text-base cursor-pointer 
                      shadow-md hover:shadow-lg rounded-md sm:rounded-lg 
                      flex items-center justify-center gap-2 w-full sm:w-auto
                      transform hover:-translate-y-0.5 active:translate-y-0
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        SENDING...
                      </>
                    ) : (
                      "SEND MESSAGE"
                    )}
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          variants={mapVariants}
          className="mt-8 max-w-5xl mx-auto"
        >
          <div className="w-full h-80 overflow-hidden rounded-2xl shadow-lg bg-gray-200 transform hover:shadow-xl transition-shadow duration-300">
            <iframe
              title="Bright ELV Technology Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.725595242503!2d55.30617307437956!3d25.27285682863391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43284629a707%3A0x6b452aacbbc23ea0!2sBright%20ELV%20Technology-LLC!5e0!3m2!1sen!2sus!4v1767764472425"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}