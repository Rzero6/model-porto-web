"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    label?: string
    value?: Date
    onChange?: (date: Date) => void
    className?: string
    buttonClassName?: string
    required?: boolean
}

export function DatePicker({
    label = "Select date",
    value,
    onChange,
    className,
    buttonClassName,
    required = false,
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value)

    const handleSelect = (date: Date | undefined) => {
        setSelectedDate(date)
        setOpen(false)
        onChange?.(date!)
    }

    React.useEffect(() => {
        if (value) setSelectedDate(value)
    }, [value])

    return (
        <div>
            {label && (
                <Label htmlFor="date-picker" className="px-1">
                    {label}
                </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date-picker"
                        className={`w-48 justify-between font-normal ${buttonClassName || ""}`}
                    >
                        {selectedDate ? selectedDate.toLocaleDateString() : label}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={`w-auto overflow-hidden p-0 ${className || ""}`}
                    align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        captionLayout="dropdown"
                        onSelect={handleSelect}
                        required={required}
                    />
                </PopoverContent>
            </Popover>
        </div >
    )
}
