import { useState } from "react";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ExploreLawCourses = () => {
  const [filter, setFilter] = useState("");

  const lawCourses = [
    {
      id: 1,
      Institution: "AFRICA NAZARENE UNIVERSITY",
      InstitutionType: "Private",
      ProgrammeName: "Bachelor of Laws (LLB)",
      Year1ProgrammeCost: "Ksh 265,500",
      Cutoff2023: 34.715,
      Cutoff2022: 34.070,
      Cutoff2021: 34.070,
    },
    {
      id: 2,
      Institution: "CATHOLIC UNIVERSITY OF EASTERN AFRICA",
      InstitutionType: "Private",
      ProgrammeName: "Bachelor of Laws (LLB)",
      Year1ProgrammeCost: 224200,
      Cutoff2023: 36.807,
      Cutoff2022: 33.856,
      Cutoff2021: 40.097,
    },
    {
      id: 3,
      Institution: "CHUKA UNIVERSITY",
      InstitutionType: "Public",
      ProgrammeName: "Bachelor of Laws (LLB)",
      Year1ProgrammeCost: 183600,
      Cutoff2023: 38.894,
      Cutoff2022: 39.904,
      Cutoff2021: 39.032,
    },
    {
      id: 4,
      Institution: "DAYSTAR UNIVERSITY",
      InstitutionType: "Private",
      ProgrammeName: "Bachelor of Laws (LLB)",
      Year1ProgrammeCost: 321600,
      Cutoff2023: 34.836,
      Cutoff2022: 33.174,
      Cutoff2021: 39.663,
    },
    {
      id: 5,
      Institution: "EGERTON UNIVERSITY",
      InstitutionType: "Private",
      ProgrammeName: "Bachelor of Laws (LLB)",
      Year1ProgrammeCost: 214700,
      Cutoff2023: 39.534,
      Cutoff2022: 39.860,
      Cutoff2021: 39.860,
    },
    {
      id: 6,
      Institution: "KABARAK UNIVERSITY",
      InstitutionType: "Private",
      ProgrammeName: "Bachelor of Laws (LLB)",
      Year1ProgrammeCost: 256150,
      Cutoff2023: 37.986,
      Cutoff2022: 35.922,
      Cutoff2021: 40.271,
    },
  ];

  const filteredCourses = lawCourses.filter(course =>
    course.Institution.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Container className="bg-base-200 flex flex-col ">
        <Navbar />
        <h1 className="text-3xl mb-3 text-center">Explore Universities with Law Courses</h1>
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Filter by institution"
            className="input input-bordered w-full max-w-xs"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-white text-xl">
                <th>Institution</th>
                <th>Programme Name</th>
                <th>YEAR 1 - Cost</th>
                <th>2023 Cut-off</th>
                <th>2022 Cut-off</th>
                <th>2021 Cut-off</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{course.Institution}</div>
                        <span
                          className={`badge badge-sm ${course.InstitutionType === "Private"
                              ? "badge-primary"
                              : "badge-secondary"
                            }`}
                        >
                          {course.InstitutionType}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{course.ProgrammeName}</td>
                  <td>{course.Year1ProgrammeCost}</td>
                  <td>{course.Cutoff2023}</td>
                  <td>{course.Cutoff2022}</td>
                  <td>{course.Cutoff2021}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </Container>
    </div>
  );
};

export default ExploreLawCourses;
