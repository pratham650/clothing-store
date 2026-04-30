import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-10 font-[Inter] animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center animate-slideIn">
          About Shree Clothing Cue
        </h1>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg mb-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Welcome to <strong className="text-blue-600">Shree Clothing Cue</strong> - your one-stop destination for trendy, comfortable, and affordable clothing!
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            We specialize in bringing you the latest fashion trends with our exclusive collection of 
            <span className="font-semibold text-purple-600"> Men's Wear</span>, 
            <span className="font-semibold text-pink-600"> Women's Wear</span>, and 
            <span className="font-semibold text-green-600"> Unisex Fashion</span>.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            From custom tees to personalized bottles, cups, and accessories - we believe in quality, style, and customer satisfaction above all else.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl mb-4">👕</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Quality</h3>
            <p className="text-gray-600">100% premium fabrics and materials for maximum comfort and durability.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Unique Designs</h3>
            <p className="text-gray-600">Exclusive designs you won't find anywhere else. Stand out from the crowd!</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick shipping across India with secure packaging and order tracking.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded with a passion for fashion, Shree Clothing Cue started as a small venture with big dreams. 
            Today, we're proud to serve thousands of happy customers across India.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our mission is simple: <strong className="text-blue-600">Provide high-quality, fashionable clothing at affordable prices</strong> 
            while ensuring every customer feels confident and stylish in what they wear.
          </p>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <span className="text-2xl">👔</span>
              <span className="text-gray-700 font-medium">Men's Custom Tees & Apparel</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg">
              <span className="text-2xl">👗</span>
              <span className="text-gray-700 font-medium">Women's Fashion Collection</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <span className="text-2xl">🎯</span>
              <span className="text-gray-700 font-medium">Unisex Streetwear</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <span className="text-2xl">🧴</span>
              <span className="text-gray-700 font-medium">Custom Bottles & Cups</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
              <span className="text-2xl">🖼️</span>
              <span className="text-gray-700 font-medium">Personalized Gifts & Frames</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
              <span className="text-2xl">🧢</span>
              <span className="text-gray-700 font-medium">Caps & Accessories</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Style?</h2>
          <p className="text-lg mb-6">Explore our latest collection and find your perfect fit!</p>
          <Link 
            to="/" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Shop Now →
          </Link>
        </div>

        <div className="mt-10 text-center text-gray-600">
          <p className="text-sm">
            Have questions? Reach out to us at{' '}
            <a href="mailto:support@shreeclothingcue.com" className="text-blue-600 hover:underline">
              support@shreeclothingcue.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
