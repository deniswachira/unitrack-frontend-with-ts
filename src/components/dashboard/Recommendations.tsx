import { userApi } from '../../features/api/userApiSlice';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, useState, useMemo } from "react";
import { PuffLoader } from 'react-spinners';
import { modelApi } from '../../features/api/modelApi';
import { FaRobot, FaBrain, FaCode, FaRocket, FaExclamationTriangle } from 'react-icons/fa'; // Include caution icon

const Recommendations = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: userGrades } = userApi.useGetUserGradesQuery(user?._id);
  const { data: userData } = userApi.useGetUserByIdQuery(user?._id);
  const [modelRecommend, { isLoading: isModelLoading }] = modelApi.useCourseRecommendMutation();

  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mapping of abbreviated subject names to full names
  const subjectMapping: { [key: string]: string } = {
    Math: "Mathematics",
    Eng: "English",
    Kis: "Kiswahili",
    Phy: "Physics",
    Chem: "Chemistry",
    Bio: "Biology",
    His: "History",
    Geo: "Geography",
    Bus: "Business Studies",
    Agr: "Agriculture",
    Comp: "Computer Science",
    CRE: "CRE",
    Hom: "Home Science",
    Music: "Music",
    Fre: "French",
    Ger: "German",
    Ara: "Arabic",
    IRE: "IRE",
    HRE: "HRE",
  };

  // Extract subjects and convert to full names, memoize the array to avoid unnecessary re-renders
  const subjects = useMemo(() => {
    return userGrades?.map((grade: any) => subjectMapping[grade.subject] || grade.subject) || [];
  }, [userGrades]);

  // Memoize the interests array to avoid re-rendering
  const interests = useMemo(() => {
    return userData?.interests || ["Computer Science", "Information Technology"];
  }, [userData]);

  // Function to make the POST request to the recommendation model using modelApi
  const fetchRecommendations = async () => {
    try {
      const response = await modelRecommend({
        subjects: subjects, 
        interests: interests, 
      }).unwrap();

      setRecommendations(response.recommended_courses);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subjects.length > 0 && interests.length > 0) {
      fetchRecommendations();
    }
  }, [subjects, interests]);

  const renderIcon = (course: string) => {
    switch (course.toLowerCase()) {
      case 'artificial intelligence':
      case 'ai':
        return <FaRobot className="text-2xl text-secondary-content" />;
      case 'machine learning':
        return <FaBrain className="text-2xl text-secondary-content" />;
      case 'software engineering':
        return <FaCode className="text-2xl text-secondary-content" />;
      case 'aerospace engineering':
        return <FaRocket className="text-2xl text-secondary-content" />;
      default:
        return <FaRobot className="text-2xl text-secondary-content" />;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white-900 to-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-extrabold text-center text-green-700 mb-4 tracking-wider">
        AI-Powered Course Recommendations
      </h2>

      {/* Caution Message */}
      <div className="flex items-center justify-center p-4 mb-6 bg-yellow-200 text-black rounded-lg shadow-md">
        <FaExclamationTriangle className="mr-2 text-2xl" />
        <p className="text-center">
          These recommendations are AI-generated based on your profile. Please update your profile for the most accurate and up-to-date suggestions.
        </p>
      </div>

      {loading || isModelLoading ? (
        <div className="flex justify-center items-center h-48">
          <PuffLoader color="#36d7b7" size={80} />
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((course, index) => (
            <div key={index} className="card shadow-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-lg hover:shadow-2xl transition-shadow transform hover:scale-105 duration-300">
              <div className="flex items-center space-x-4">
                {renderIcon(course)} {/* Render AI-themed icon */}
                <h3 className="text-xl font-bold">{course}</h3>
              </div>
              <p className="mt-2 text-sm">
                Discover your path in {course}. Leverage your skills and interests to excel in this field.
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No recommendations available at this time. Please update your profile.</p>
      )}
    </div>
  );
};

export default Recommendations;
