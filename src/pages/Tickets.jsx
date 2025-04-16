import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';


const Tickets = () => {
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 700,
            easing: 'ease-in-out',
        });
    }, []);
    return (
        <div>
            <div className="bg-black h-screen text-white px-6 md:px-12 py-8 font-sans">

                <Navbar />

                {/* Table Heading */}
                <div className="grid grid-cols-4 gap-4 text-primary font-semibold text-lg border-b border-primary pb-4 mb-8 text-center" data-aos="fade-down">
                    <p>Ticket ID</p>
                    <p>Event Name</p>
                    <p>Event Venue</p>
                    <p>Start Time</p>
                </div>

                {/* Ticket Cards */}
                <div className="space-y-6">
                    {[100, 200, 300, 400].map((delay, index) => (
                        <div key={index} className="grid grid-cols-4 items-center bg-cardbg rounded-xl p-6 shadow-neon border border-neon" data-aos="fade-up" data-aos-delay={delay}>
                            <p className="text-center font-semibold"></p>
                            <p className="text-center"></p>
                            <p className="text-center text-gray-300"></p>
                            <div className="flex justify-center items-center gap-4">
                                <p className="text-sm"></p>
                                <button className="bg-danger px-4 py-2 rounded-lg text-white font-bold shadow-redglow hover:scale-105 transition">
                                    Sell
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Tickets
