import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <div className="bg-base-200 text-white py-10">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
                <p className="text-lg mb-6">Join us today and explore a world of knowledge!</p>
                <button className=" btn btn-outline btn-info text-white px-6 py-2 rounded-lg hover:bg-green-600">
                    <Link to="/register">Register To Get Started</Link>
                </button>
            </div>
        </div>
    );
};

export default CallToAction;
