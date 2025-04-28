
import React from 'react';
import { addDays, format, isSameDay } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FixtureCalendarProps {
  selected: Date;
  onSelect: (date: Date) => void;
}

const FixtureCalendar: React.FC<FixtureCalendarProps> = ({ 
  selected,
  onSelect,
}) => {
  return (
    <div className="mb-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selected && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? (
              isSameDay(selected, new Date()) ? 
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
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FixtureCalendar;
