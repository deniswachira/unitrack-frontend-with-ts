import { Link } from 'react-router-dom';
import slider2 from '../assets/images/slider2.jpg';

function Hero() {
  return (
    <div className="container mx-auto px-4 py-2 md:py-5">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <img
          src={slider2}
          className="w-full md:w-1/2 max-w-full md:max-w-md rounded-lg shadow-2xl mb-6 md:mb-0"
          alt='University Success'
        />
        <div className="md:w-1/2 md:pl-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            Welcome to Uni Track
          </h1>
          <p className="text-lg text-blue mb-6">
            <span className="block text-3xl md:text-4xl font-semibold text-orange-500 mb-2">
              Empower Your Academic Journey
            </span>
            Navigate the path to higher education with ease and confidence. Our platform provides you with essential tools to calculate your cluster points, explore diverse course options, and receive personalized guidance from industry experts. Unlock the future you envision and achieve your educational goals with our comprehensive resources.
          </p>
          <button className="btn btn-outline btn-success  text-lg">
            <Link to="/register"> Register To Get Started</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
