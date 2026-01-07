"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

export default function Contact() {
  // --- Banner-specific vars ---
  const background =
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&fit=crop";

  const bannerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const bannerTitleVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const bannerFadeInUpVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const bannerSlideInRightVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const entrance = {
    initial: { opacity: 0, y: 16, scale: 0.995 },
    inView: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: 0.6,
      ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
    },
  };

  return (
    <>
      {/* Inlined Banner with bg-fixed (no scroll movement) */}
      <div className="relative mb-16 w-full h-96 md:h-screen bg-black overflow-hidden">
        {/* Background Image with Fixed Positioning */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('${background}')`,
              filter: "brightness(0.4)",
            }}
          />
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </motion.div>

        {/* Content Container */}
        <motion.div
          className="relative z-10 h-full flex flex-col"
          variants={bannerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.h1
              className="text-white text-5xl md:text-9xl font-light tracking-tight text-center px-6 md:px-0 leading-tight md:leading-normal"
              variants={bannerTitleVariants}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Get in
              </motion.span>
              <motion.span
                className="ml-4 md:ml-8 inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Touch
              </motion.span>
            </motion.h1>

            {/* Mobile-only description */}
            <motion.div
              className="md:hidden mt-8 px-6 flex flex-col items-center gap-3 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.p className="text-white/70 text-sm text-center max-w-sm">
                Have questions or need more information? We're here to help.
                Reach out to us and our team will get back to you as soon as
                possible.
              </motion.p>
              <motion.div
                className="h-0.5 w-32 bg-white/30"
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ duration: 1, delay: 2 }}
              />
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="pb-12 px-6 md:px-12 hidden md:flex flex-col items-start md:items-end md:flex-row md:justify-between gap-4 md:gap-0">
            <motion.div
              className="flex gap-2"
              variants={bannerFadeInUpVariants}
            ></motion.div>

            <motion.div
              className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto"
              variants={bannerSlideInRightVariants}
            >
              <motion.p
                className="text-white/70 text-sm max-w-md text-left md:text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                Have questions or need more information? We're here to help.
                Reach out to us and our team will get back to you as soon as
                possible.
              </motion.p>

              <motion.div
                className="h-0.5 w-32 bg-white/30"
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ duration: 1, delay: 1.8 }}
              />

              <div className="h-14" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={entrance.initial}
              whileInView={entrance.inView}
              transition={entrance.transition}
              viewport={{ once: true, amount: 0.18 }}
              className="bg-gray-100 p-6 lg:p-8 rounded-lg shadow-sm"
            >
              {/* Address Section */}
              <div className="mb-8">
                <h2 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-3">
                  ADDRESS
                </h2>
                <div className="h-px w-10 bg-blue-900 mb-4"></div>
                <p className="text-gray-800 text-base mb-0">Quinta do Paral,</p>
                <p className="text-gray-800 text-base mb-3">
                  Apartado 31 P, 7960-131
                </p>
              </div>

              {/* Contacts Section */}
              <div className="mb-8">
                <h2 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-3">
                  CONTACTS
                </h2>
                <div className="h-px w-10 bg-blue-900 mb-4"></div>
                <div className="mb-3">
                  <p className="text-gray-800 text-sm font-medium">
                    +351 284 441 620
                  </p>
                  <p className="text-gray-600 text-xs">
                    National fixed network call
                  </p>
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-medium">
                    +351 963 831 891
                  </p>
                  <p className="text-gray-600 text-xs">
                    National mobile network call
                  </p>
                </div>
              </div>

              {/* Email Section */}
              <div className="mb-8">
                <h2 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-3">
                  EMAIL
                </h2>
                <div className="h-px w-10 bg-blue-900 mb-4"></div>
                <a
                  href="mailto:loja@quintadoparal.com"
                  className="text-gray-800 text-base hover:text-blue-900 transition-colors"
                >
                  loja@quintadoparal.com
                </a>
              </div>

              {/* Follow Us Section */}
              <div>
                <h2 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-3">
                  FOLLOW US
                </h2>
                <div className="h-px w-10 bg-blue-900 mb-4"></div>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://www.facebook.com/yourpage"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-gray-600 hover:text-blue-900 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.2c0-2.2 1.3-3.4 3.2-3.4.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.5h2.3l-.4 2.9h-1.9v7A10 10 0 0022 12z" />
                    </svg>
                  </a>

                  <a
                    href="https://wa.me/351963831891?text=Hello"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.5 3.5A11 11 0 103.7 20.3L2 22l1.7-.5A11 11 0 0020.5 3.5zm-8.4 15.1c-1.8 0-3.5-.5-5-1.5l-.4-.3-3.1.8.8-3.1-.3-.4A7.9 7.9 0 0111.1 6.9c4.5 0 8.1 3.6 8.1 8.1 0 4.4-3.6 8-8.1 8zM17 14.4c-.2-.1-1.1-.6-1.2-.7-.2-.1-.3-.1-.5.1-.2.3-.7.7-.8.8-.2.1-.4.1-.7 0-1.1-.6-2-1.4-2.8-2.5-.2-.3 0-.5.1-.6.1-.2.2-.4.3-.5.1-.1.1-.3 0-.5-.1-.3-.7-1.6-1-2.1-.3-.5-.6-.4-.8-.4-.2 0-.5 0-.8 0-.3 0-.7.1-1 .1-.3 0-.6.2-.8.6-.2.4-.8 1.4-.8 3 0 1.6 1.6 3.2 1.8 3.4.2.2 3.1 4.6 7.8 4.6 4.7 0 4.8-3.1 4.8-3.4 0-.3-.2-.5-.4-.6z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-gray-600 hover:text-blue-900 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm6.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0zM12 9.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={entrance.initial}
              whileInView={entrance.inView}
              transition={{ ...entrance.transition, delay: 0.08 }}
              viewport={{ once: true, amount: 0.18 }}
              className="bg-white p-6 lg:p-8 rounded-lg shadow-sm"
            >
              <h2 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">
                CONTACT US
              </h2>
              <p className="text-gray-700 mb-6 text-sm">
                Thank you for your interest in Quinta do Paral. If you have any
                questions, please fill out the form below and we'll get back to
                you shortly.
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-black placeholder-gray-500 placeholder-opacity-100"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-black placeholder-gray-500 placeholder-opacity-100"
                    placeholder="+351 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-black placeholder-gray-500 placeholder-opacity-100"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-black placeholder-gray-500 placeholder-opacity-100"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-sm text-black placeholder-gray-500 placeholder-opacity-100"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-900 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label
                    htmlFor="agree"
                    className="text-xs text-gray-600 leading-relaxed cursor-pointer"
                  >
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-blue-900 hover:text-blue-700 underline"
                    >
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-blue-900 hover:text-blue-700 underline"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white py-3 rounded text-sm font-semibold tracking-wider hover:bg-gray-800 active:bg-gray-950 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    "SUBMIT MESSAGE"
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={entrance.initial}
            whileInView={entrance.inView}
            transition={{ ...entrance.transition, delay: 0.16 }}
            viewport={{ once: true, amount: 0.18 }}
            className="mt-12"
          >
            <div className="w-full h-96 overflow-hidden shadow-md bg-gray-200">
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
        </div>
      </div>
    </>
  );
}
