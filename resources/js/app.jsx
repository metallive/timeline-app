import './bootstrap';
import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Timeline from './components/Timeline';

const timelineElement = document.getElementById('timeline');

if (timelineElement) {
    ReactDOM.createRoot(timelineElement).render(
        <React.StrictMode>
            <Timeline />
        </React.StrictMode>
    );
} else {
    console.error("Timeline element not found");
}