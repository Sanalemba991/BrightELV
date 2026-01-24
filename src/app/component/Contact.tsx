"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

export default function Contact() {
  // --- Banner-specific vars ---
  const background =
    "/banner/contact.png";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
              filter: "brightness(0.9)",
            }}
          />
          {/* Dark overlay for better text visibility */}
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
                <h2 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">
                  Address
                </h2>

                <div className="h-px w-10 bg-blue-900 mb-4"></div>

                <p className="text-gray-900 text-sm font-medium leading-relaxed">
                  Bright ELV Technology LLC
                </p>

                <p className="text-gray-700 text-sm leading-relaxed mt-1">
                  UAE 381108, Satellite Market – 54, 10A Street
                  <br />
                  PB No: 381108, Showroom No: 4<br />
                  Mustafa Building, Naif
                  <br />
                  Dubai, United Arab Emirates
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
                   +971 466 52 233
                  </p>
                  
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-medium">
                  +971 56 5022960
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
                  href="mailto:sales@brightelv.com"
                  className="text-gray-800 text-base hover:text-blue-900 transition-colors"
                >
                 sales@brightelv.com
                </a>
              </div>

              {/* Follow Us Section */}
              <div>
                <h2 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-3">
                  FOLLOW US
                </h2>
                <div className="h-px w-10 bg-blue-900 mb-4"></div>
                <div className="flex flex-wrap ">
              <a
                href="https://www.facebook.com/brightelvtech/"
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/brightelv_technology_llc/"
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                </svg>
              </a>
              
              <a
                href="https://www.linkedin.com/company/brightelv-l-l-c/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a
                href="https://wa.me/971508813601"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="WhatsApp"
              >
                 <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
