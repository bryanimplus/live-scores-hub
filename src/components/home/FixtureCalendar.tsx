
import React, { useState } from 'react';
import { format, isSameDay, addDays, subDays, isToday } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface FixtureCalendarProps {
  selected: Date;
  onSelect: (date: Date) => void;
  compact?: boolean;
}

const FixtureCalendar: React.FC<FixtureCalendarProps> = ({ 
  selected,
  onSelect,
  compact = false
}) => {
  const formatDate = (date: Date) => {
    if (isToday(date)) {
      return "Today";
    }
    if (isSameDay(addDays(new Date(), 1), date)) {
      return "Tomorrow";
    }
    return format(date, "E, MMM d");
  };
  
  const goToToday = () => onSelect(new Date());
  
  const goToNextDay = () => onSelect(addDays(selected, 1));
  
  const goToPrevDay = () => onSelect(subDays(selected, 1));
  
  return (
    <div className={cn("mb-6", compact ? "flex justify-between items-center" : "")}>
      {compact ? (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={goToPrevDay}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "flex items-center gap-2 px-3 py-1",
                  "border-primary/20 hover:bg-primary/5",
                  isToday(selected) ? "bg-primary/10 text-primary font-medium" : ""
                )}
              >
                <CalendarIcon className="h-4 w-4 opacity-70" />
                <span className="font-medium">{formatDate(selected)}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selected}
                onSelect={(date) => date && onSelect(date)}
                initialFocus
                disabled={{ after: addDays(new Date(), 30) }}
                className={cn("p-3 pointer-events-auto")}
              />
              <div className="border-t border-border p-3">
                <Button variant="ghost" size="sm" className="w-full" onClick={goToToday}>Go to Today</Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={goToNextDay}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal flex items-center",
                !selected && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selected ? (
                isToday(selected) ? 
                  "Today's Fixtures" : 
                  format(selected, "MMMM d, yyyy")
              ) : (
                "Pick a date"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selected}
              onSelect={(date) => date && onSelect(date)}
              initialFocus
              disabled={{ after: addDays(new Date(), 30) }}
              className={cn("p-3 pointer-events-auto")}
            />
            <div className="border-t border-border p-2 flex justify-between">
              <Button variant="ghost" size="sm" onClick={goToToday}>Today</Button>
              <Button variant="ghost" size="sm" onClick={() => onSelect(addDays(new Date(), 1))}>Tomorrow</Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  // Find the next Saturday
                  const now = new Date();
                  const daysToWeekend = (6 - now.getDay() + 7) % 7 || 7;
                  onSelect(addDays(now, daysToWeekend));
                }}
              >
                Weekend
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default FixtureCalendar;
