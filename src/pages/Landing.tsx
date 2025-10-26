import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col justify-center items-center p-4 sm:p-8 overflow-y-auto">
      {/* Logo/Brand */}
      <div className="text-center mb-10 sm:mb-12 mt-10">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-2 sm:mb-4">
          MindVault
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto">
          Store, organize, and search your content effortlessly
        </p>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 mb-10 sm:mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs transition duration-300 hover:shadow-xl">
          <div className="text-3xl sm:text-4xl mb-3">🧠</div>
          <h3 className="font-semibold text-lg mb-2">Smart Storage</h3>
          <p className="text-gray-600 text-sm">Save your favorite content in one place</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs transition duration-300 hover:shadow-xl">
          <div className="text-3xl sm:text-4xl mb-3">🔍</div>
          <h3 className="font-semibold text-lg mb-2">Semantic Search</h3>
          <p className="text-gray-600 text-sm">Find content by meaning, not just keywords</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs transition duration-300 hover:shadow-xl">
          <div className="text-3xl sm:text-4xl mb-3">🔗</div>
          <h3 className="font-semibold text-lg mb-2">Easy Share</h3>
          <p className="text-gray-600 text-sm">Share your brain with others instantly</p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => navigate("/Signin")}
        className="bg-purple-600 text-white px-10 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        Get Started
      </button>

      {/* Footer */}
      <p className="mt-8 text-gray-500 text-sm mb-10">
        Start building your second brain today
      </p>
    </div>
  );
};