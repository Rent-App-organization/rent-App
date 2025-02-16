import { motion } from 'framer-motion';


function Hero() {
    return (
        <section className="min-h-screen bg-white flex items-center justify-center">
            <div className="grid md:grid-cols-2 gap-8 p-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center text-left space-y-4"
                >
                    <h1 className="text-5xl font-bold text-[#4A403A]">Welcome to Our Rental Website</h1>
                    <p className="text-lg text-[#5E564B]">
                        Discover your dream getaway with our exclusive villa rentals. Experience luxury, comfort, and breathtaking views in your perfect vacation home.
                    </p>
                    <button className="bg-[#756B5E] text-white w-fit px-4 py-2 rounded-lg shadow-md hover:bg-[#5E564B] transition">
                        Learn More
                    </button>
                </motion.div>

                <motion.img
                    src="src/components/about/lily-tran-0bESYmQLn5M-unsplash.jpg"
                    alt="To-Do List Visual"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-150 h-150 rounded-2xl shadow-lg -mt-15"
                />
            </div>
        </section>
    );
}

export default Hero;
