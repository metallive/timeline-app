'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

export default function Timeline() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [zoomLevel, setZoomLevel] = useState(1)
    const scrollAreaRef = useRef(null)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollPosition = ((currentTime.getHours() - startHour) * 60 + currentTime.getMinutes()) / (totalHours * 60) * scrollAreaRef.current.scrollHeight
            scrollAreaRef.current.scrollTop = scrollPosition - scrollAreaRef.current.clientHeight / 2
        }
    }, [currentTime])

    const startHour = 8
    const endHour = 22
    const totalHours = endHour - startHour
    const timeMarkers = Array.from({ length: totalHours * 12 * zoomLevel }, (_, i) => {
        const hour = Math.floor(i / (12 * zoomLevel)) + startHour
        const minute = (i % (12 * zoomLevel)) * (5 / zoomLevel)
        return { hour, minute }
    })

    const currentHour = currentTime.getHours()
    const currentMinute = currentTime.getMinutes()
    const progress = currentHour < startHour || currentHour >= endHour
        ? null
        : ((currentHour - startHour) * 60 + currentMinute) / (totalHours * 60) * 100

    const events = [
        {
            time: "08:30",
            description: "Entrance of employee",
            extraInfo: ["Employee: John Doe", "Department: Marketing", "ID: 12345"]
        },
        {
            time: "12:00",
            description: "Lunch break",
            extraInfo: ["Duration: 1 hour", "Location: Cafeteria", "Menu: Vegetarian options available"]
        },
        {
            time: "15:00",
            description: "Team meeting",
            extraInfo: ["Room: Conference Room A", "Duration: 1 hour", "Agenda: Q2 Planning"]
        },
        {
            time: "15:00",
            description: "Client call",
            extraInfo: ["Client: Acme Corp", "Duration: 30 minutes", "Platform: Zoom"]
        },
        {
            time: "17:00",
            description: "End of workday",
            extraInfo: ["Total hours: 8.5", "Overtime: None", "Next shift: Tomorrow 08:30"]
        }
    ]

    const formatTime = (hour, minute) => `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev * 2, 4))
    }

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev / 2, 1))
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative w-96 h-[80vh] bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="absolute top-2 right-2 z-10 flex space-x-2">
                    <Button variant="outline" size="icon" onClick={handleZoomIn}>
                        <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleZoomOut}>
                        <Minus className="h-4 w-4" />
                    </Button>
                </div>
                <ScrollArea className="h-full" ref={scrollAreaRef}>
                    <div className="p-4">
                        <div className="relative">
                            {timeMarkers.map(({ hour, minute }, index) => {
                                const timeString = formatTime(hour, minute)
                                const timeEvents = events.filter(e => e.time === timeString)

                                return (
                                    <div key={index} className="flex items-start justify-start pl-2 min-h-[1.5rem] py-1" style={{ height: `${1.5 * zoomLevel}rem` }}>
                                        <div className="flex items-center h-6">
                                            <div className={`h-0.5 ${minute === 0 ? 'w-3 bg-gray-400' : minute % 15 === 0 ? 'w-2 bg-gray-300' : 'w-1 bg-gray-200'}`} />
                                            <span className={`ml-1 text-xs ${minute === 0 ? 'text-gray-700' : minute % 15 === 0 ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {minute === 0 || (zoomLevel > 1 && minute % 15 === 0) || (zoomLevel > 2 && minute % 5 === 0) ? timeString : ''}
                                            </span>
                                        </div>
                                        {timeEvents.length > 0 && (
                                            <div className="flex flex-wrap gap-1 ml-2">
                                                {timeEvents.map((event, eventIndex) => (
                                                    <Dialog key={eventIndex}>
                                                        <DialogTrigger asChild>
                                                            <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-secondary/80">
                                                                {event.description}
                                                            </Badge>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>{event.description} - {event.time}</DialogTitle>
                                                            </DialogHeader>
                                                            <div className="mt-4">
                                                                <ul className="list-disc pl-5 space-y-2">
                                                                    {event.extraInfo.map((info, infoIndex) => (
                                                                        <li key={infoIndex} className="text-sm">{info}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                            {progress !== null && (
                                <>
                                    <div
                                        className="absolute left-4 right-4 bg-blue-500 opacity-30 transition-all duration-1000 ease-linear rounded-full"
                                        style={{ top: `${progress}%`, height: '6px' }}
                                        aria-hidden="true"
                                    />
                                    <div
                                        className="absolute left-4 right-4 h-6 bg-blue-600 opacity-70 flex items-center justify-center text-white text-xs font-bold rounded-full"
                                        style={{ top: `${progress}%`, transform: 'translateY(-50%)' }}
                                        aria-live="polite"
                                    >
                                        {currentTime.toLocaleTimeString()}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
