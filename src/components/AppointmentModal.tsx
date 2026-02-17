"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import Select, { StylesConfig } from "react-select";
import { addMonths, isWeekend } from "date-fns";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceOption {
  value: string;
  label: string;
}

const serviceOptions: ServiceOption[] = [
  { value: "teeth-whitening", label: "Teeth Whitening" },
  { value: "routine-checkup", label: "Routine Checkup" },
  { value: "dental-implants", label: "Dental Implants" },
  { value: "orthodontic-braces", label: "Orthodontic Braces" },
  { value: "dental-crowns", label: "Dental Crowns" },
  { value: "tooth-filling", label: "Tooth Filling" },
  { value: "other", label: "Other Service" },
];

// Custom styles to match datepicker
const selectStyles: StylesConfig<ServiceOption, false> = {
  control: (base, state) => ({
    ...base,
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#0D6D6E" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px #0D6D6E" : "none",
    padding: "2px 4px",
    "&:hover": {
      borderColor: "#0D6D6E",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#0D6D6E"
      : state.isFocused
      ? "#B8E8E8"
      : "white",
    color: state.isSelected ? "white" : "#333",
    "&:active": {
      backgroundColor: "#0D6D6E",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    zIndex: 60,
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#333",
  }),
};

function Label({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedService(null);
      onClose();
    }, 2000);
  };

  // Filter out weekends
  const isWeekday = (date: Date) => !isWeekend(date);

  if (!isOpen) return null;

  const minDate = new Date();
  const maxDate = addMonths(new Date(), 12);

  // Create clean time values with seconds/milliseconds set to 0
  const minTime = new Date();
  minTime.setHours(8, 0, 0, 0);  // 8:00 AM
  const maxTime = new Date();
  maxTime.setHours(18, 0, 0, 0); // 6:00 PM

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0D6D6E] mb-2">
            Request an Appointment
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Fill out the form below and we&apos;ll contact you to confirm your appointment.
          </p>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#22c55e" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
              <p className="text-gray-600">We&apos;ll be in touch shortly to confirm your appointment.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" required>Full Name</Label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D6D6E] focus:border-transparent outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" required>Email</Label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D6D6E] focus:border-transparent outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" required>Phone</Label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D6D6E] focus:border-transparent outline-none"
                    placeholder="(555) 555-5555"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" required>Preferred Date</Label>
                  <DatePicker
                    id="date"
                    selected={selectedDate}
                    onChange={(date: Date | null) => setSelectedDate(date)}
                    filterDate={isWeekday}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Select a date"
                    wrapperClassName="w-full"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D6D6E] focus:border-transparent outline-none"
                    dateFormat="MMMM d, yyyy"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time" required>Preferred Time</Label>
                  <DatePicker
                    id="time"
                    selected={selectedTime}
                    onChange={(time: Date | null) => setSelectedTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    minTime={minTime}
                    maxTime={maxTime}
                    placeholderText="Select a time"
                    wrapperClassName="w-full"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D6D6E] focus:border-transparent outline-none"
                    timeFormat="h:mm aa"
                    dateFormat="h:mm aa"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="service" required>Service</Label>
                <Select
                  inputId="service"
                  options={serviceOptions}
                  value={selectedService}
                  onChange={(option) => setSelectedService(option)}
                  placeholder="Select a service"
                  styles={selectStyles}
                  isSearchable={false}
                />
              </div>

              <div>
                <Label htmlFor="message">Additional Notes</Label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D6D6E] focus:border-transparent outline-none resize-none"
                  placeholder="Any additional information..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !selectedDate || !selectedTime || !selectedService}
                className="w-full bg-[#0D6D6E] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#0a5a5b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Request Appointment"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
