import { useEffect, useState } from "react";
import { GREETINGS } from "../constants/greeting";

const WelcomeMessage = () => {
const [message, setMessage] = useState("");

useEffect(() => {
    const randomIndex = Math.floor(Math.random() * GREETINGS.length);
    setMessage(GREETINGS[randomIndex]);
}, []);

return (
    <header>
    <div className="bg-gradient-to-r from-amber-500/90 to-pink-500/90 bg-clip-text text-transparent" style={{ fontSize: "3.5rem", padding: "20px" }}>{message}</div>
    </header>
);
};

export default WelcomeMessage;
