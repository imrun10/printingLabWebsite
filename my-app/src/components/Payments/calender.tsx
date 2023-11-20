import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enUS from 'date-fns/locale/en-US';

registerLocale('en-US', enUS);

const GfgDatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        locale="en-US"
      />
    </div>
  );
};

export default GfgDatePicker;