import { useEffect, useState } from "react";

const greetings = [
    "Welcome! We're glad you're here.",
    "Hello there! Ready to explore?",
    "Hi! Let's make something amazing together.",
    "Greetings! Hope you have a great experience.",
    "Hey! Thanks for stopping by 🖐🏻",
    "Welcome aboard! Let’s get started.",
    "Nice to see you! Let’s dive in.",
    "Hello! Your journey starts here.",
    "Hi there! We’re excited to have you.",
    "Welcome! Let’s make today productive.",
    "Hey there! Hope you're having a great day 👍🏻",
    "Hi! Just popping in to say hello 👋",
    "Good to see you! What’s new with you today?",
];

const WelcomeMessage = () => {
const [message, setMessage] = useState("");

useEffect(() => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setMessage(greetings[randomIndex]);
}, []);

return (
    <header>
    <div className="bg-gradient-to-r from-amber-500/90 to-pink-500/90 bg-clip-text text-transparent" style={{ fontSize: "3.5rem", padding: "20px" }}>{message}</div>
    </header>
);
};

export default WelcomeMessage;
