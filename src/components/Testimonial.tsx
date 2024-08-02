
const Testimonials = () => {
    const testimonials = [
        {
            name: "Jane Doe",
            role: "High School Graduate",
            testimonial: "Using this platform made calculating my cluster points a breeze. I also received exceptional counseling, which helped me find the perfect course to match my career goals.",
        },
        {
            name: "John Smith",
            role: "Prospective Student",
            testimonial: "The feature to explore courses and cutoffs is incredibly detailed. I was able to find all the information I needed to make an informed decision about my future studies.",
        },
        {
            name: "Emily Johnson",
            role: "Career Advisor",
            testimonial: "The course guidance from industry experts is invaluable. It provides clarity and confidence in choosing the right path based on individual interests and academic strengths.",
        },
        {
            name: "Michael Brown",
            role: "University Student",
            testimonial: "The AI-powered recommendations are a game-changer. They offered personalized suggestions based on my profile, making the decision process so much easier.",
        },
    ];

    return (
        <div className="container mx-auto py-1">
            <h2 className="text-3xl font-bold text-center mb-3">What Our Users Say</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="max-w-md p-3 border border-gray-300 rounded-lg shadow-md transition-transform duration-300 hover:border-green-500 hover:cursor-pointer hover:scale-105"
                    >
                        <p className="text-lg mb-4">{`"${testimonial.testimonial}"`}</p>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
