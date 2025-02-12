// CalendarSection.jsx
import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import { FaCalendarAlt } from "react-icons/fa";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Example property booking data: propertyId -> array of booked dates
const propertyBookings = {
  101: ["2025-03-10", "2025-03-12", "2025-03-20"],
  102: ["2025-03-08", "2025-03-15"],
  103: ["2025-03-01", "2025-03-02", "2025-03-20"],
};

export default function CalendarSection() {
  // Let's default to property 101 (Beach House).
  // Or you can default to "" meaning "All" if you want a combined view.
  const [selectedProperty, setSelectedProperty] = useState("101");

  // We'll default to the current month
  const [currentDate, setCurrentDate] = useState(dayjs());

  // 1) Figure out the "bookedDates" for the selected property
  const bookedDates = propertyBookings[selectedProperty] || [];

  // 2) Generate the days for the current month
  const calendarMatrix = useMemo(() => {
    const startOfMonth = currentDate.startOf("month");
    const startDay = startOfMonth.day();
    const daysInMonth = currentDate.daysInMonth();

    let calendarDays = [];
    // Fill in days from previous month so the first row is complete
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }
    // Fill in actual days for this month
    for (let d = 1; d <= daysInMonth; d++) {
      calendarDays.push(currentDate.date(d));
    }
    return calendarDays;
  }, [currentDate]);

  // Go prev/next month
  const goToPrevMonth = () => setCurrentDate((prev) => prev.subtract(1, "month"));
  const goToNextMonth = () => setCurrentDate((prev) => prev.add(1, "month"));

  // 3) Check if date is booked for the currently selected property
  const isBooked = (dateObj) => {
    if (!dateObj) return false; // filler day from prev month
    const formatted = dateObj.format("YYYY-MM-DD");
    return bookedDates.includes(formatted);
  };

  return (
    <section
      id="calendar"
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaCalendarAlt className="text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            Availability Calendar
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevMonth}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
          >
            Prev
          </button>
          <p className="font-semibold text-gray-700">
            {currentDate.format("MMMM YYYY")}
          </p>
          <button
            onClick={goToNextMonth}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>

      {/* Property Filter */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 font-medium mb-1">
          Select Property:
        </label>
        <select
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="101">Beach House</option>
          <option value="102">City Apartment</option>
          <option value="103">Mountain Cabin</option>
        </select>
      </div>

      {/* Weekday Row */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm font-semibold text-gray-600">
        {WEEKDAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarMatrix.map((dayObj, idx) => {
          if (!dayObj) {
            return <div key={idx} className="h-16 bg-gray-50" />;
          }
          const dayNum = dayObj.date();
          const formatted = dayObj.format("YYYY-MM-DD");
          const booked = isBooked(dayObj);

          return (
            <div
              key={formatted}
              className={`border h-16 flex flex-col items-center justify-center rounded
                ${
                  booked
                    ? "bg-red-100 border-red-300"
                    : "bg-green-50 border-green-200"
                }`}
            >
              <span className="font-semibold text-gray-700">{dayNum}</span>
              {booked ? (
                <span className="text-xs text-red-600">Booked</span>
              ) : (
                <span className="text-xs text-green-600">Available</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-4 text-gray-600 text-sm">
        <p>
          This monthly view updates based on the{" "}
          <strong>selected property</strong>. Booked dates are marked in{" "}
          <span className="text-red-600 font-semibold">red</span>, while
          available dates are marked in{" "}
          <span className="text-green-600 font-semibold">green</span>.
        </p>
      </div>
    </section>
  );
}
