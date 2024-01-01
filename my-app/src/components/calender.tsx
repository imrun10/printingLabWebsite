import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enUS from 'date-fns/locale/en-US';
import { addDays } from 'date-fns';

registerLocale('en-US', enUS);

interface GfgDatePickerProps {
  setSelectedDate: (date: Date | null) => void;
}

const GfgDatePicker: React.FC<GfgDatePickerProps> = ({ setSelectedDate }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    setSelectedDate(date);
  };

  const minSelectableDate = addDays(new Date(), 1); // Set minimum selectable date to tomorrow

  return (
    <div>
      <label className="block text-gray-700 font-bold mb-2">Select a Date:</label>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        locale="en-US"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
        minDate={minSelectableDate}
      />
    </div>
  );
};

export default GfgDatePicker;