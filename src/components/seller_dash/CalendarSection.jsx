// npm install dayjs  
import React, { useState, useMemo } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";

// A small helper to get the days of the week
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarSection() {
    // For demonstration, let’s define some booked dates as strings: "YYYY-MM-DD"
    const [bookedDates] = useState(["2025-03-10", "2025-03-12", "2025-03-20"]);

    // We'll default to the current month. You can allow the user to navigate months, etc.
    const [currentDate, setCurrentDate] = useState(dayjs());

    // Generate a matrix of days for the current month
    const calendarMatrix = useMemo(() => {
        // Start of the first day in the current month
        const startOfMonth = currentDate.startOf("month");
        // Day of the week for that first day (0 = Sunday, 1 = Monday, etc.)
        const startDay = startOfMonth.day();

        // We’ll build an array of dayjs objects representing each day in the month view
        // Potentially including some days from the previous/next month to fill the squares
        const daysInMonth = currentDate.daysInMonth();

        let calendarDays = [];
        // Fill in days from previous month so the first row is complete
        for (let i = 0; i < startDay; i++) {
            calendarDays.push(null);
        }

        // Fill in the actual days of this month
        for (let d = 1; d <= daysInMonth; d++) {
            calendarDays.push(currentDate.date(d));
        }

        return calendarDays;
    }, [currentDate]);

    // Move to previous or next month
    const goToPrevMonth = () => {
        setCurrentDate((prev) => prev.subtract(1, "month"));
    };

    const goToNextMonth = () => {
        setCurrentDate((prev) => prev.add(1, "month"));
    };

    // Utility to check if a date is in the bookedDates array
    const isBooked = (dateObj) => {
        if (!dateObj) return false; // null for days outside current month
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

            {/* Weekday Row */}
            <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm font-semibold text-gray-600">
                {WEEKDAYS.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
                {calendarMatrix.map((dayObj, idx) => {
                    // If dayObj is null, it's a placeholder for days in prev month
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
                ${booked
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
                    This simple monthly view is generated with <strong>dayjs</strong>. Booked dates are marked
                    in <span className="text-red-600 font-semibold">red</span>, while available dates are
                    marked in <span className="text-green-600 font-semibold">green</span>.
                </p>
            </div>
        </section>
    );
}
