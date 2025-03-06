import { userApi } from '../../features/api/userApiSlice';
import { RootState } from "../../app/store";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { coursesApi } from '../../features/api/coursesApi';
import { Link } from 'react-router-dom';

interface Subject {
    subject: string;
    grade: string;
}

const Calculate = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { data: usersGrade, isLoading: subjectIsLoading, isError: subjectIsError } = userApi.useGetUserGradesQuery(user?._id);
    const [lawCluster] = coursesApi.useLawClusterMutation();
    const [businessCluster] = coursesApi.useBusinessClusterMutation();
    const [socialScienceCluster] = coursesApi.useSocialScienceClusterMutation();
    const [geoScience] = coursesApi.useGeoScienceClusterMutation();
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const [selectedCluster, setSelectedCluster] = useState('');
    const [result, setResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);  // New state for loading status

    useEffect(() => {
        if (usersGrade) {
            setSubjects(usersGrade);
        }
    }, [usersGrade]);

    const clusterRequirements: { [key: string]: string } = {
        cluster1: "Requirements for Law: At least B in English, At least C+ in Mathematics",
        cluster2: "Requirements for Business, Hospitality, and Related: At least C plain in Maths",
        cluster3: "Requirements for Social Science, Media Studies, Fine Arts, Film, Animation and Related: At least C plain in Physics and Maths",
        cluster4: "Requirements for Geosciences & related: At least C plain in Maths and Physics",
    };

    const handleCalculate = async () => {
        if (subjects.length < 7 || selectedCluster === "") {
            alert("Please select a cluster and make sure you have at least 7 subjects");
            return;
        }

        setIsLoading(true);  // Set loading state to true

        try {
            const newSubjects: { [key: string]: string } = {};
            subjects.forEach((subject) => {
                newSubjects[subject.subject] = subject.grade;
            });

            let response;
            if (selectedCluster === "cluster1") {
                const english = subjects.find((subject) => subject.subject === "Eng");
                const maths = subjects.find((subject) => subject.subject === "Math");
                if (!english || !maths) {
                    alert("English and Maths are required for Law cluster");
                    setIsLoading(false);
                    return;
                }
                if (!['A', 'A-', 'B+', 'B',].includes(english?.grade)) {
                    alert("English grade should be B or higher for Law cluster");
                    setIsLoading(false);
                    return;
                }
                response = await lawCluster(newSubjects);
            } else if (selectedCluster === "cluster2") {
                const maths = subjects.find((subject) => subject.subject === "Math");
                if (!maths) {
                    alert("Maths is required for Business cluster");
                    setIsLoading(false);
                    return;
                }
                if (!['C', 'C+', 'B', 'B+', 'A-', 'A'].includes(maths?.grade)) {
                    alert("Maths grade should be C or higher for Business cluster");
                    setIsLoading(false);
                    return;
                }
                response = await businessCluster(newSubjects);
            } else if (selectedCluster === "cluster3") {
                response = await socialScienceCluster(newSubjects);
            } else {
                const maths = subjects.find((subject) => subject.subject === "Math");
                const phy = subjects.find((subject) => subject.subject === "Phy");

                if (!maths || !phy) {
                    alert("Maths and Physics are required for Geosciences cluster");
                    setIsLoading(false);
                    return;
                }

                if (!['A', 'A-', 'B+', 'B', 'B-', 'C+'].includes(maths?.grade) || !['A', 'A-', 'B+', 'B', 'B', 'B-', 'C+'].includes(phy?.grade)) {
                    alert("Maths and Physics grade should be C or higher for Geosciences cluster");
                    setIsLoading(false);
                    return;
                }
                response = await geoScience(newSubjects);
            }

            setResult((response as any)?.data);
        } catch (error: any) {
            alert("Error calculating cluster points. Please try again later.");
            console.error(error);
        } finally {
            setIsLoading(false);  // Set loading state to false after the process
        }
    };

    const renderLink = () => {
        if (selectedCluster === "cluster1") {
            return <Link to='/explore-law-courses/cluster1' className="mt-4 mb-3 bg-green-600 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">Explore Courses</Link>;
        } else if (selectedCluster === "cluster2") {
            return <Link to='/explore-bus-courses/cluster2' className="mt-4 mb-3 bg-green-600 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">Explore Courses</Link>;
        } else if (selectedCluster === "cluster3") {
            return <Link to='/explore-soc-courses/cluster3' className="mt-4 mb-3 bg-green-600 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">Explore Courses</Link>;
        } else if (selectedCluster === "cluster4") {
            return <Link to='/explore-geo-courses/cluster4' className="mt-4 mb-3 bg-green-600 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">Explore Courses</Link>;
        } else {
            return null;
        }
    };

    return (
        <div className="min-h-screen text-dark py-3 px-3">
            <div className="flex justify-center items-center">
                <h1 className="text-xl font-semibold text-green-400">Calculate Cluster Point</h1>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Grades</h1>
            </div>
            <div className="overflow-x-auto">
                {subjectIsLoading ? (
                    <div className="flex justify-center"><PuffLoader color="#36d7b7" /></div>
                ) : subjectIsError ? (
                    <div className="text-red-500">Error loading grades. Please try again later.</div>
                ) : subjects.length === 0 ? (
                    <div>No subjects available.</div>
                ) : (
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className='text-white text-xl'>
                                <th>#</th>
                                <th>Subject</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{subject.subject}</td>
                                    <td>{subject.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="bg-dark-200 shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-bold mb-4 text-green-400">Select Cluster</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <select
                        value={selectedCluster}
                        onChange={(e) => setSelectedCluster(e.target.value)}
                        className="w-full sm:w-1/2 border border-gray-300 px-3 py-2 rounded-md"
                    >
                        <option value="">Select cluster</option>
                        <option value="cluster1">Cluster 1 (Law)</option>
                        <option value="cluster2">Cluster 2 (Business, Hospitality, and Related)</option>
                        <option value="cluster3">Cluster 3 (Social Science, Media Studies, Fine Arts, Film, Animation and Related)</option>
                        <option value="cluster4">Cluster 4 (Geosciences & related)</option>
                    </select>
                    <button
                        onClick={handleCalculate}
                        className={`bg-blue-500 text-white px-4 py-2 rounded-md ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Calculating..." : "Calculate Cluster Points"}
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-dark-200 shadow-md rounded-lg p-6 mb-6 mt-6 w-full">
                    <h2 className="text-2xl font-semibold mb-4">Results</h2>
                    <div className="p-4 bg-gray-800 rounded-md">
                        <p className="text-lg text-green-400">Cluster Points: {result.clusterPoints.toFixed(2)}</p>
                    </div>
                </div>
            )}

            {renderLink()}  {/* Render the link based on selectedCluster */}

            {selectedCluster && (
                <div className="bg-dark-200 shadow-md rounded-lg p-6 mb-6 mt-6 w-1/2">
                    <h2 className="text-2xl font-semibold mb-4 text-green-400">Cluster Requirement</h2>
                    <p>{clusterRequirements[selectedCluster]}</p>
                </div>
            )}
        </div>
    );
}

export default Calculate;
