import { motion } from 'framer-motion';


function Hero() {
    return (
        <section className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-50 flex items-center justify-center">
            <div className="grid md:grid-cols-2 gap-8 p-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center text-left space-y-4"
                >
                    <h1 className="text-5xl font-bold text-blue-900">Welcome to Our To-Do List App!</h1>
                    <p className="text-lg text-gray-700">
                        Stay organized, productive, and stress-free with our powerful task management solution.
                    </p>
                    <button className="bg-blue-600 text-white w-fit px-4 py-2 rounded-lg">Learn More</button>
                </motion.div>

                <motion.img
                    src="https://img.freepik.com/free-photo/notebook-with-list-desk-with-cup-coffee-beside_23-2148938739.jpg?t=st=1738413948~exp=1738417548~hmac=3526d9603fb7f24afd124ef3d8366c723374f564715a4ed151bab623dafba355&w=1380"
                    alt="To-Do List Visual"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="rounded-2xl shadow-lg"
                />
            </div>
        </section>
    )
}

export default Hero