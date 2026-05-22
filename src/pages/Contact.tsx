import { FormEvent, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CalendarCheck, CheckCircle, X } from 'lucide-react';
// Old Formspree integration kept for reference during backend migration.
// import { useForm, ValidationError } from '@formspree/react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

type SubmitState = {
  submitting: boolean;
  error: string;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
};

const ThemedSelect = ({
  name,
  value,
  options,
  placeholder,
  onChange,
}: {
  name: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <input name={name} value={value} required readOnly className="sr-only" />
      <button
        type="button"
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onClick={() => setOpen((current) => !current)}
        className="theme-input w-full rounded-xl px-4 py-3 focus:outline-none theme-focus-secondary transition-all flex items-center justify-between text-left cursor-pointer"
      >
        <span className={value ? 'theme-text-secondary' : 'text-gray-500'}>{value || placeholder}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 shadow-lg overflow-hidden"
            style={{ background: 'var(--color-page-bg, #dce8df)' }}
          >
            <li
              onMouseDown={() => handleSelect('')}
              className={`theme-dropdown-option px-4 py-3 text-sm cursor-pointer transition-colors ${!value ? 'theme-dropdown-option-active font-semibold' : ''}`}
            >
              {placeholder}
            </li>
            {options.map((option) => (
              <li
                key={option}
                onMouseDown={() => handleSelect(option)}
                className={`theme-dropdown-option px-4 py-3 text-sm cursor-pointer transition-colors ${option === value ? 'theme-dropdown-option-active font-semibold' : ''}`}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

// Success popup component
const SuccessPopup = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 24 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="relative bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center z-10"
      style={{ border: '1px solid rgba(12,75,42,0.15)' }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 18 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: 'rgba(12,75,42,0.1)' }}
      >
        <CheckCircle className="w-10 h-10" style={{ color: '#0C4B2A' }} />
      </motion.div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3">Success!</h3>
      <p className="text-gray-600 leading-relaxed">{message}</p>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClose}
        className="mt-8 w-full py-3 rounded-xl text-white font-semibold transition-all"
        style={{ background: '#0C4B2A', boxShadow: '0 4px 14px rgba(12,75,42,0.35)' }}
      >
        Done
      </motion.button>
    </motion.div>
  </div>
);



// Contact Form Component
const ContactForm = () => {
  // Old Formspree API code:
  // const [state, handleSubmit, reset] = useForm('xlgalrdq');
  const [state, setState] = useState<SubmitState>({ submitting: false, error: '' });
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Old Formspree success handling:
  // useEffect(() => {
  //   if (state.succeeded) {
  //     formRef.current?.reset();
  //     reset();
  //     setShowPopup(true);
  //   }
  // }, [state.succeeded]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ submitting: true, error: '' });

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch(`${API_BASE_URL}/api/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send your message right now.');
      }

      formRef.current?.reset();
      setShowPopup(true);
      setState({ submitting: false, error: '' });
    } catch (error) {
      setState({ submitting: false, error: getErrorMessage(error) });
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="theme-card rounded-3xl p-8 lg:p-10 shadow-xl border theme-border-secondary">
      <AnimatePresence>
        {showPopup && (
          <SuccessPopup
            message="Your message has been sent! We'll get back to you within 24 hours."
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      <h2 className="text-3xl font-bold theme-text-secondary mb-6">Send Us a Message</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium theme-text-secondary mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 theme-input rounded-xl focus:outline-none theme-focus-secondary transition-all"
            placeholder="John Doe"
          />
          {/* <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" /> */}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 theme-input rounded-xl focus:outline-none theme-focus-secondary transition-all"
            placeholder="john@example.com"
          />
          {/* <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" /> */}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 theme-input rounded-xl focus:outline-none theme-focus-secondary transition-all resize-none"
            placeholder="Tell us about your project..."
          />
          {/* <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" /> */}
        </div>

        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full px-6 py-4 theme-bg-secondary text-white rounded-xl font-semibold shadow-lg theme-shadow-secondary hover:shadow-xl hover:cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {state.submitting ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};


// Appointment Form Component
const AppointmentForm = () => {
  // Old Formspree API code:
  // const [state, handleSubmit, reset] = useForm('xnjlzajl');
  const [state, setState] = useState<SubmitState>({ submitting: false, error: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // Old Formspree success handling:
  // useEffect(() => {
  //   if (state.succeeded) {
  //     formRef.current?.reset();
  //     reset();
  //     setShowPopup(true);
  //   }
  // }, [state.succeeded]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ submitting: true, error: '' });

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch(`${API_BASE_URL}/api/v1/consultation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: formData.get('service'),
          date: formData.get('date'),
          time: formData.get('time'),
          email: formData.get('email'),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to book your appointment right now.');
      }

      formRef.current?.reset();
      setSelectedService('');
      setSelectedTime('');
      setShowPopup(true);
      setState({ submitting: false, error: '' });
    } catch (error) {
      setState({ submitting: false, error: getErrorMessage(error) });
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const services = [
    'Cloud Solutions',
    'AI & Automation',
    'Data Analytics',
    'Web Development',
    'General Inquiry',
  ];

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ];

  return (
    <div className="theme-card rounded-3xl p-8 lg:p-10 shadow-2xl border theme-border-secondary">
      <AnimatePresence>
        {showPopup && (
          <SuccessPopup
            message="Appointment booked successfully! We will confirm your slot shortly."
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      <h2 className="text-3xl font-bold theme-text-secondary mb-6">Book an Appointment</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="service" className="block text-sm font-medium theme-text-secondary mb-2">
            Select Service
          </label>
          <ThemedSelect
            name="service"
            value={selectedService}
            options={services}
            placeholder="Choose a service"
            onChange={setSelectedService}
          />
          {/* <ValidationError prefix="Service" field="service" errors={state.errors} className="text-red-500 text-sm mt-1" /> */}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium theme-text-secondary mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            min={new Date().toISOString().split('T')[0]}
            onClick={(event) => event.currentTarget.showPicker?.()}
            onFocus={(event) => event.currentTarget.showPicker?.()}
            className="w-full px-4 py-3 theme-input appointment-native-date rounded-xl focus:outline-none theme-focus-secondary transition-all cursor-pointer"
          />
          {/* <ValidationError prefix="Date" field="date" errors={state.errors} className="text-red-500 text-sm mt-1" /> */}
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium theme-text-secondary mb-2">
            Preferred Time
          </label>
          <ThemedSelect
            name="time"
            value={selectedTime}
            options={timeSlots}
            placeholder="Select time"
            onChange={setSelectedTime}
          />
          {/* <ValidationError prefix="Time" field="time" errors={state.errors} className="text-red-500 text-sm mt-1" /> */}
        </div>

        <div>
          <label htmlFor="appt-email" className="block text-sm font-medium text-gray-700 mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="appt-email"
            name="email"
            required
            className="w-full px-4 py-3 theme-input rounded-xl focus:outline-none theme-focus-secondary transition-all"
            placeholder="john@example.com"
          />
          {/* <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" /> */}
        </div>

        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full px-6 py-4 theme-bg-secondary text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:cursor-pointer transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {state.submitting ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span>Booking...</span>
            </>
          ) : (
            <>
              <span>Book Appointment</span>
              <CalendarCheck className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 p-6 theme-card rounded-2xl border theme-border-secondary">
        <h3 className="font-semibold mb-2 theme-text-secondary">Business Hours</h3>
        <p className="text-sm text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
        <p className="text-sm text-secondary">Saturday: 10:00 AM - 4:00 PM EST</p>
        <p className="text-sm text-secondary">Sunday: Closed</p>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="fixed inset-0 -z-10 theme-page-bg"></div>

      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold theme-text-secondary mb-6">
              Let's Start a
              <span className="block bg-clip-text">
                Conversation
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              Have a question or ready to transform your business? We're here to help.
              Reach out to us and let's create something amazing together.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: 'Email Us', content: 'nexora.solution@outlook.com', link: 'mailto:nexora.solution@outlook.com' },
              { icon: Phone, title: 'Call Us', content: '+91 8878858338', link: 'tel:+918878858338' },
              { icon: MapPin, title: 'Visit Us', content: 'Bhopal, Madhya Pradesh', link: '#map' },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="theme-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border theme-border-secondary group"
              >
                <div className="w-14 h-14 theme-bg-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              id="message"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>
            <motion.div
              id="appointment"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AppointmentForm />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="map" className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="theme-card rounded-3xl overflow-hidden shadow-xl border theme-border-secondary"
          >
            <div className="p-6 flex items-center gap-3 border-b theme-border-secondary">
              <MapPin className="w-5 h-5 theme-text-secondary" />
              <h3 className="text-lg font-bold theme-text-secondary">Our Office Location</h3>
              <span className="text-sm text-gray-500 ml-1">— Bhopal, Madhya Pradesh</span>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234700.34596126707!2d77.24107873999023!3d23.19963946618557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1776887217843!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0, display: 'block' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};




export default Contact;
