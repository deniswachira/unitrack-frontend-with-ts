
const FeatureHighlights = () => {
    const features = [
        {
            title: "Calculate Cluster Points",
            description: "Easily calculate your cluster points to determine eligibility for various courses.",
            icon: "🧮",
        },
        {
            title: "Explore Courses & Cutoffs",
            description: "Explore a comprehensive list of courses and their respective cutoff points.",
            icon: "📚",
        },
        {
            title: "Course Guidance",
            description: "Receive expert guidance from industry professionals to make informed decisions.",
            icon: "👨‍🏫",
        },
        {
            title: "AI-Powered Recommendations",
            description: "Get personalized course and career recommendations based on your profile and interests, powered by AI.",
            icon: "🤖",
        },
    ];

    return (
        <div className="container mx-auto py-3">
            <h2 className="text-3xl font-bold text-center mb-6">Our Key Features</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="max-w-sm p-4 border border-gray-300 rounded-lg shadow-md transition-transform duration-300 hover:border-green-500 hover:cursor-pointer hover:scale-105"
                    >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureHighlights;
