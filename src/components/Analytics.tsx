
const Analytics = () => {
    // Example data, replace with actual data fetching logic as needed
    const totalUsers = 1234;
    const activeUsers = 567;
    const coursesAvailable = 42;

    return (
        <div className="container mx-auto h-[50vh] flex flex-col items-center justify-center mb-5 bg-base-200 p-5 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Platform Analytics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold">Total Users</h3>
                    <p className="text-2xl">{totalUsers}</p>
                </div>
                <div className="bg-green-500 text-white p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold">Active Users</h3>
                    <p className="text-2xl">{activeUsers}</p>
                </div>
                <div className="bg-purple-500 text-white p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold">Courses Available</h3>
                    <p className="text-2xl">{coursesAvailable}</p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
