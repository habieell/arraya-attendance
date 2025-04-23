"use client";

import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { DayPicker } from "react-day-picker";
import { createPortal } from "react-dom";
import "react-day-picker/dist/style.css";

interface Props {
  onChange: (value: string) => void;
}

export function HeroUIDatePicker({ onChange }: Props) {
  const [selected, setSelected] = useState<Date>();
  const [showCalendar, setShowCalendar] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const toggleCalendar = () => setShowCalendar((prev) => !prev);
  const closeCalendar = () => setShowCalendar(false);

  const handleSelect = (date: Date | undefined) => {
    setSelected(date);
    if (date) {
      onChange(format(date, "yyyy-MM"));
    }
    closeCalendar();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !buttonRef.current?.contains(target) &&
        !calendarRef.current?.contains(target)
      ) {
        closeCalendar();
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleCalendar}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-md text-sm shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
        {selected ? format(selected, "MMMM yyyy") : "Pilih Bulan"}
      </button>

      {showCalendar &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div
              ref={calendarRef}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 ring-1 ring-black/10"
            >
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleSelect}
                captionLayout="dropdown"
                fromYear={2020}
                toYear={2030}
              />
              <div className="text-center mt-3">
                <button
                  onClick={closeCalendar}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
