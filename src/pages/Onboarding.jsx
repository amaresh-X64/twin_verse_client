import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
const navigate = useNavigate();
  const avatarOptions = [
    "https://api.dicebear.com/7.x/bottts/svg?seed=1",
    "https://api.dicebear.com/7.x/bottts/svg?seed=2",
    "https://api.dicebear.com/7.x/bottts/svg?seed=3",
    "https://api.dicebear.com/7.x/bottts/svg?seed=4",
    "https://api.dicebear.com/7.x/bottts/svg?seed=5",
    "https://api.dicebear.com/7.x/bottts/svg?seed=6",
    "https://api.dicebear.com/7.x/bottts/svg?seed=7",
    "https://api.dicebear.com/7.x/bottts/svg?seed=8",
    "https://api.dicebear.com/7.x/bottts/svg?seed=9",
    "https://api.dicebear.com/7.x/bottts/svg?seed=10",
    "https://api.dicebear.com/7.x/bottts/svg?seed=11",
    "https://api.dicebear.com/7.x/bottts/svg?seed=12",
  ];



  const [twin, setTwin] = useState(null);
  // Steps: 0: Name & Tagline, 1: Style, 2: Interests, 3: Shopping & Reaction, 4: Fav Category, 5: Base Avatar
  const [currentStep, setCurrentStep] = useState(0);
  // Using slower transitions (2000ms)
  const [animateStep, setAnimateStep] = useState("opacity-0 translate-x-10");

  useEffect(() => {
    setTimeout(() => {
      setAnimateStep("opacity-100 translate-x-0");
    }, 150);
  }, []);

  const [form, setForm] = useState({
    name: "",
    catchphrase: "",
    style: "Minimalist",
    interests: [],
    shoppingTime: [],
    reaction: "analytical", // represents psychological reaction
    favCategory: "Electronics",
    avatar: "",
  });

  const goToStep = (newStep) => {
    setAnimateStep("opacity-0 translate-x-10");
    setTimeout(() => {
      setCurrentStep(newStep);
      setTimeout(() => setAnimateStep("opacity-100 translate-x-0"), 150);
    }, 700);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if ((name === "interests" || name === "shoppingTime") && type === "checkbox") {
      const newValues = checked
        ? [...form[name], value]
        : form[name].filter((item) => item !== value);
      setForm({ ...form, [name]: newValues });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    goToStep(currentStep + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    goToStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const finalTwin = { ...form, avatar: form.avatar };
  setTwin(finalTwin);

  // 🧠 Save to localStorage for later usage in recommendations
  localStorage.setItem("twinProfile", JSON.stringify(finalTwin));
};


  // When editing the avatar, go back to the avatar selection step (step 5)
  const handleEditAvatar = () => {
    setTwin(null);
    goToStep(5);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center">What's your name?</h2>
            <input
              name="name"
              placeholder="Enter your name..."
              className="border-2 border-gray-300 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={handleChange}
              required
            />
            <div>
              <label className="block text-base font-medium mb-1">
                A catchy tagline for your twin:
              </label>
              <input
                name="catchphrase"
                placeholder="E.g. 'Always ahead of the trends!'"
                className="border-2 border-gray-300 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center">How would you describe your style?</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Minimalist", "Trendy", "Avant-garde", "Casual", "Luxury", "Premium"].map((option) => (
                <div
                  key={option}
                  onClick={() => setForm({ ...form, style: option })}
                  className={`border-2 rounded-lg p-4 text-center cursor-pointer hover:scale-105 transition transform 
                    ${form.style === option ? "bg-blue-600 text-white shadow-2xl" : "bg-white"}`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center">What are you into?</h2>
            <p className="text-center text-lg">Select a few interests that best describe you.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {["Tech", "Gaming", "Music", "Travel", "Art", "Fitness"].map((interest) => {
                const selected = form.interests.includes(interest);
                return (
                  <div
                    key={interest}
                    onClick={() =>
                      setForm({
                        ...form,
                        interests: selected ? form.interests.filter((i) => i !== interest) : [...form.interests, interest],
                      })
                    }
                    className={`px-4 py-2 rounded-full border cursor-pointer hover:scale-105 transition transform 
                      ${selected ? "bg-blue-600 text-white shadow-xl scale-105" : "bg-gray-100"}`}
                  >
                    {interest}
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center">When do you usually shop online?</h2>
            <div className="flex gap-4 justify-center">
              {["Morning", "Afternoon", "Evening"].map((time) => (
                <label key={time} className="flex items-center gap-2 text-lg cursor-pointer">
                  <input
                    type="checkbox"
                    name="shoppingTime"
                    value={time}
                    onChange={handleChange}
                    className="cursor-pointer"
                  />
                  {time}
                </label>
              ))}
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">
                When faced with unexpected offers, how do you react?
              </label>
              <select
                name="reaction"
                className="border-2 border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                onChange={handleChange}
              >
                <option value="analytical">I consider carefully before deciding</option>
                <option value="spontaneous">I jump at the opportunity</option>
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center">What’s your favorite product category?</h2>
            <select
              name="favCategory"
              className="border-2 border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={handleChange}
            >
              <option>Electronics</option>
              <option>Apparel</option>
              <option>Home & Garden</option>
              <option>Books</option>
              <option>Beauty</option>
              <option>Sports</option>
            </select>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center">Choose your avatar</h2>
            <div className="grid grid-cols-4 gap-4">
              {avatarOptions.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Avatar ${index + 1}`}
                  onClick={() => setForm({ ...form, avatar: url })}
                  className={`w-16 h-16 mx-auto cursor-pointer border-2 p-1 rounded-full transition hover:scale-105
                    ${form.avatar === url ? "border-blue-600" : "border-gray-300"}`}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative p-8 flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-8 tracking-tight">TWINVERSE</h1>
      {!twin ? (
        <form
          onSubmit={currentStep === 5 ? handleSubmit : handleNext}
          className={`bg-white text-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-xl space-y-8 transition-all transform duration-2000 ${animateStep}`}
        >
          {renderStep()}
          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="bg-gray-300 text-gray-800 py-3 px-6 rounded hover:bg-gray-400 transition"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition ml-auto"
            >
              {currentStep === 5 ? "Create Twin" : "Next"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gradient-to-br from-white to-blue-100 p-6 rounded-3xl shadow-2xl max-w-md w-full text-gray-900 relative overflow-hidden">
  {/* Avatar Section */}
  <div className="flex flex-col items-center gap-4">
    <div className="relative">
      <img
        src={twin.avatar}
        alt="Twin Avatar"
        className="w-36 h-36 rounded-full border-[6px] border-blue-600 shadow-lg"
      />
      <div className="absolute bottom-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs rounded-full">
        Your Twin
      </div>
    </div>

    {/* Twin Name & Catchphrase */}
    <h2 className="text-2xl font-extrabold tracking-tight">{twin.name}</h2>
    <p className="text-center italic text-blue-800 text-sm">"{twin.catchphrase}"</p>
  </div>

  {/* Twin Stats */}
  <div className="mt-6 space-y-4">
    <div className="flex justify-center gap-2 flex-wrap">
      <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
        Style: {twin.style}
      </span>
      <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
        Category: {twin.favCategory}
      </span>
      
    </div>

    {/* Interests Section */}
    <div>
      <h3 className="text-sm font-semibold mb-1 text-gray-700">Interests:</h3>
      <div className="flex flex-wrap gap-2">
        {twin.interests.map((interest) => (
          <span
            key={interest}
            className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>

    {/* Shopping Time */}
    {twin.shoppingTime.length > 0 && (
      <div>
        <h3 className="text-sm font-semibold mb-1 text-gray-700">Shopping Time:</h3>
        <div className="flex flex-wrap gap-2">
          {twin.shoppingTime.map((time) => (
            <span
              key={time}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs"
            >
              {time}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>

  {/* Change Avatar Button */}
 <div className="mt-6 flex justify-center gap-4">
  <button
    onClick={handleEditAvatar}
    className="bg-blue-600 text-white py-2 px-4 text-sm rounded-full hover:bg-blue-700 transition shadow-md"
  >
    Change Avatar
  </button>
  <button
    onClick={() => navigate("/recommendations")}
    className="bg-blue-600 text-white py-2 px-4 text-sm rounded-full hover:bg-green-700 transition shadow-md"
  >
    Show My Recommendations
  </button>
</div>

</div>

      )}
    </div>
  );
}