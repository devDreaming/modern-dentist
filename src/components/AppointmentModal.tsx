"use client";

import { useState, useEffect, useRef } from "react";
import {
  DatePicker,
  Calendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  CalendarCell,
  Heading,
  Button,
  Dialog,
  Popover,
  Group,
  DateInput,
  DateSegment,
  Label as AriaLabel,
} from "react-aria-components";
import {
  today,
  getLocalTimeZone,
  isWeekend,
} from "@internationalized/date";
import type { DateValue } from "@internationalized/date";
import Select, { StylesConfig } from "react-select";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SelectOption {
  value: string;
  label: string;
}

const timeOptions: SelectOption[] = (() => {
  const options: SelectOption[] = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (const min of [0, 30]) {
      if (hour === 18 && min === 30) break;
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const label = `${displayHour}:${min.toString().padStart(2, "0")} ${period}`;
      options.push({ value: `${hour}:${min.toString().padStart(2, "0")}`, label });
    }
  }
  return options;
})();

const serviceOptions: SelectOption[] = [
  { value: "teeth-whitening", label: "Teeth Whitening" },
  { value: "routine-checkup", label: "Routine Checkup" },
  { value: "dental-implants", label: "Dental Implants" },
  { value: "orthodontic-braces", label: "Orthodontic Braces" },
  { value: "dental-crowns", label: "Dental Crowns" },
  { value: "tooth-filling", label: "Tooth Filling" },
  { value: "other", label: "Other Service" },
];

// Custom styles to match datepicker
const selectStyles: StylesConfig<SelectOption, false> = {
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

function FormLabel({ htmlFor, required, children }: { htmlFor?: string; required?: boolean; children: string }) {
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
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const [selectedTime, setSelectedTime] = useState<SelectOption | null>(null);
  const [selectedService, setSelectedService] = useState<SelectOption | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    // Focus the first input when the modal opens
    setTimeout(() => nameInputRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
    }, 4000);
  };

  const isDateUnavailable = (date: DateValue) => isWeekend(date, "en-US");

  if (!isOpen) return null;

  const minDate = today(getLocalTimeZone());
  const maxDate = minDate.add({ months: 12 });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div role="dialog" aria-modal="true" aria-labelledby="appointment-modal-title" className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          aria-label="Close form"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          <h2 id="appointment-modal-title" className="text-2xl font-bold text-[#0D6D6E] mb-2">
            Request an Appointment
          </h2>

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
              <p className="text-sm text-gray-600 mb-6">
                Fill out the form below and we&apos;ll contact you to confirm your appointment.
              </p>
              <div>
                <FormLabel htmlFor="name" required>Full Name</FormLabel>
                <input
                  type="text"
                  ref={nameInputRef}
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
                  <FormLabel htmlFor="email" required>Email</FormLabel>
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
                  <FormLabel htmlFor="phone" required>Phone</FormLabel>
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
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  minValue={minDate}
                  maxValue={maxDate}
                  isDateUnavailable={isDateUnavailable}
                  granularity="day"
                >
                  <AriaLabel className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date<span className="text-red-500 ml-1">*</span>
                  </AriaLabel>
                  <Group className="flex w-full px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#0D6D6E] focus-within:border-transparent bg-white">
                    <DateInput className="flex flex-1 items-center">
                      {(segment) => (
                        <DateSegment
                          segment={segment}
                          className="px-0.5 rounded outline-none focus:bg-[#0D6D6E] focus:text-white data-placeholder:text-gray-400"
                        />
                      )}
                    </DateInput>
                    <Button aria-label="Open calendar date picker" className="ml-2 text-gray-500 hover:text-[#0D6D6E] outline-none focus:text-[#0D6D6E]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v9.75" />
                      </svg>
                    </Button>
                  </Group>
                  <Popover className="z-60">
                    <Dialog className="p-4 bg-white rounded-xl shadow-2xl border border-gray-200 outline-none">
                      <Calendar>
                        <header className="flex items-center justify-between mb-2">
                          <Button slot="previous" aria-label="Previous month" className="p-1 rounded hover:bg-gray-100 outline-none focus:ring-2 focus:ring-[#0D6D6E]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#0D6D6E]">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                          </Button>
                          <Heading className="text-sm font-semibold text-[#0D6D6E]" />
                          <Button slot="next" aria-label="Next month" className="p-1 rounded hover:bg-gray-100 outline-none focus:ring-2 focus:ring-[#0D6D6E]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#0D6D6E]">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                          </Button>
                        </header>
                        <CalendarGrid>
                          <CalendarGridHeader>
                            {(day) => (
                              <CalendarHeaderCell className="text-xs font-medium text-gray-500 pb-2 w-9">
                                {day}
                              </CalendarHeaderCell>
                            )}
                          </CalendarGridHeader>
                          <CalendarGridBody>
                            {(date) => (
                              <CalendarCell
                                date={date}
                                className="w-9 h-9 flex items-center justify-center rounded-full text-sm outline-none cursor-pointer
                                  hover:bg-[#B8E8E8]
                                  data-selected:bg-[#0D6D6E] data-selected:text-white
                                  data-disabled:text-gray-300 data-disabled:cursor-default data-disabled:hover:bg-transparent
                                  data-unavailable:text-gray-300 data-unavailable:cursor-default data-unavailable:hover:bg-transparent data-unavailable:line-through
                                  data-focused:ring-2 data-focused:ring-[#0D6D6E]
                                  data-outside-month:hidden"
                              />
                            )}
                          </CalendarGridBody>
                        </CalendarGrid>
                      </Calendar>
                    </Dialog>
                  </Popover>
                </DatePicker>

                <div>
                  <FormLabel htmlFor="time" required>Preferred Time</FormLabel>
                  <Select
                    inputId="time"
                    options={timeOptions}
                    value={selectedTime}
                    onChange={(option) => setSelectedTime(option)}
                    placeholder="Select a time"
                    styles={selectStyles}
                    isSearchable
                  />
                </div>
              </div>

              <div>
                <FormLabel htmlFor="service" required>Service</FormLabel>
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
                <FormLabel htmlFor="message">Additional Notes</FormLabel>
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
                aria-label="Request appointment"
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
