
const BlogSection = () => {
    const posts = [
        {
            title: "The Future of Online Learning",
            date: "July 15, 2024",
            snippet: "Explore the trends and innovations shaping the future of education.",
        },
        {
            title: "Tips for Balancing Work and Study",
            date: "June 30, 2024",
            snippet: "Learn how to manage your time effectively while pursuing your studies.",
        },
    ];

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold text-center mb-6">Latest News</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {posts.map((post, index) => (
                    <div key={index} className="max-w-sm p-4 border border-gray-300 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-500">{post.date}</p>
                        <p>{post.snippet}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogSection;
