import { useState } from "react";
import { database } from "/src/firebaseConfig";
import { ref, push } from "firebase/database"; // ✅ استيراد وظائف Realtime Database
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import Navbar from "../navBar/NavBar";

const Contact = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // 🔹 تحديث بيانات النموذج عند الكتابة
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ حفظ بيانات المستخدم في Firebase Realtime Database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await push(ref(database, "contactMessages"), formData); // ✅ حفظ البيانات في Realtime Database
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // ✅ إعادة تعيين الحقول بعد الإرسال
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // ✅ إعداد خطوات الشات بوت بدون تكرار الإجابات
  const steps = [
    { id: "1", message: "Hello! How can I assist you today? 😊", trigger: "2" },
    {
      id: "2",
      options: [
        { value: "buy", label: "🔎 Looking to buy an apartment", trigger: "3" },
        { value: "rent", label: "🏠 Looking to rent an apartment", trigger: "4" },
        { value: "support", label: "⚙️ Technical support", trigger: "5" },
        { value: "other", label: "❓ Other questions", trigger: "6" },
      ],
    },
    { id: "3", message: "What is your budget range?", trigger: "askAgain" },
    { id: "4", message: "Are you looking for a furnished or unfurnished apartment?", trigger: "askAgain" },
    { id: "5", message: "Please send us the details, and we will assist you immediately!", trigger: "askAgain" },
    { id: "6", message: "Please type your question:", trigger: "userInput" },
    { id: "userInput", user: true, trigger: "7" },
    { id: "7", message: "Thank you for your message! We will get back to you soon.", trigger: "askAgain" },
    { id: "askAgain", message: "Would you like to ask another question?", trigger: "endChat" },
    { id: "endChat", options: [{ value: "yes", label: "Yes", trigger: "userInput" }, { value: "no", label: "No", trigger: "closeChat" }] },
    { id: "closeChat", message: "Thank you for reaching out! Closing chat now...", end: true },
  ];

  const theme = {
    background: "#f0f7ff",
    fontFamily: "Arial",
    headerBgColor: "#004aad",
    headerFontColor: "#fff",
    botBubbleColor: "#004aad",
    botFontColor: "#fff",
    userBubbleColor: "#1a73e8",
    userFontColor: "#fff",
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  // ✅ إغلاق الشات بوت باستخدام زر "X" مباشرة
  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div
    className="bg-blue-50"
    style={{
      backgroundImage: "url('/api/placeholder/400/320')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
    >
      <Navbar />

      <div className="min-h-screen flex flex-col items-center py-20 px-5">
        <div className="w-full max-w-4xl space-y-8">
          {/* 📩 Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">📩 Contact Us</h2>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <label className="text-lg font-semibold text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="✍️ Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <label className="text-lg font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="📧 Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <label className="text-lg font-semibold text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                placeholder="📝 Write your message..."
                value={formData.message}
                onChange={handleChange}
                className="p-3 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>

              <button className="bg-blue-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">
                🚀 Send Message
              </button>
            </form>
          </div>

          {/* 📞 Contact Buttons */}
          <div className="flex justify-center space-x-4">
            <a href="mailto:support@example.com" className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">
              📧 Email Us
            </a>
            <a href="https://wa.me/1234567890" className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-green-600 transition duration-300">
              💬 WhatsApp
            </a>
          </div>
        </div>

        {/* 🗺️ Google Map */}
        <div className="w-full mt-8">
          <iframe
            src="https://maps.google.com/maps?q=your-location&output=embed"
            className="w-full h-96 rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>

      {/* 🤖 ChatBot Button */}
      <div onClick={toggleChat} className="fixed bottom-10 right-10 bg-blue-600 p-4 rounded-full shadow-lg cursor-pointer transition duration-300 hover:bg-blue-700">
        <span className="text-white text-xl">🤖</span>
      </div>

      {/* 🤖 ChatBot */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-10 w-80 h-96 bg-white rounded-lg shadow-lg z-50">
          <ThemeProvider theme={theme}>
            <div className="flex justify-end p-2">
              <button
                onClick={closeChat}
                className="text-black text-2xl font-bold p-2"
              >
                X
              </button>
            </div>
            <ChatBot steps={steps} handleEnd={closeChat} />
          </ThemeProvider>
        </div>
      )}
    </div>
  );
};

export default Contact;
