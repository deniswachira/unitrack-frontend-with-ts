import React, { useState } from 'react';
import { universityCoursesApi } from '../../features/api/universityCoursesApi';
import { PuffLoader } from 'react-spinners';

interface IUniversity {
    Institution: string;
    InstitutionType: "Private" | "Public";
    ProgrammeName: string;
    Year1ProgrammeCost: string;
    ClusterSubjectOne: string;
    ClusterSubjectTwo: string;
    ClusterSubjectThree: string;
    ClusterSubjectFour: string;
    MinimumSubjectRequirements: {
        Subject: string;
        Grade: string;
    }[];
    Cutoff2023: number;
    Cutoff2022: number;
    Cutoff2021: number;
}

const Universities = () => {
    const [selectedUniversity, setSelectedUniversity] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const itemsPerPage = 5;

    const { data: courses, isError, isLoading } = universityCoursesApi.useGetCoursesByUniversityQuery(selectedUniversity, {
        skip: !selectedUniversity, // Skip the query if no university is selected
    });

    const universities = [
        {
            name: "Kirinyaga",
            intro: "Kirinyaga University is a public university offering a range of undergraduate programs with a focus on science and technology. Known for its excellent academic environment and state-of-the-art facilities, it provides a nurturing ground for innovation and research."
        },
        {
            name: "Nairobi",
            intro: "Nairobi University is a public university and one of the leading institutions of higher learning in Kenya. It offers a wide variety of programs and is renowned for its diverse student body, comprehensive research initiatives, and commitment to academic excellence."
        },
    ];

    const handleUniversityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUniversity(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleRowClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const selectedUniversityData = universities.find(university => university.name === selectedUniversity);

    const filteredCourses = courses?.filter((course: IUniversity) =>
        course.ProgrammeName.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    return (
        <div>
            <div className="mb-2 flex justify-center">
                <select value={selectedUniversity} onChange={handleUniversityChange} className="p-3">
                    <option value="">Select a University</option>
                    {universities.map((university: { name: string; intro: string }, index: number) => (
                        <option key={index} value={university.name}>{university.name}</option>
                    ))}
                </select>
            </div>
            {selectedUniversityData && (
                <div className="university-intro">
                    <h2 className="font-bold">{selectedUniversityData.name} University</h2>
                    <p className="text-yellow-400">{selectedUniversityData.intro}</p>
                </div>
            )}
            <div className="mb-2 flex justify-center">
                <input
                    type="text"
                    placeholder="Search Programme"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-3 border rounded"
                />
            </div>
            {isLoading && <PuffLoader color="#36d7b7" />}
            {isError && <p>Error loading courses. Please try again.</p>}
            {!isLoading && !isError && paginatedCourses.length > 0 && (
                <>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="text-white text-xl">
                                    <th>Programme Name</th>
                                    <th>YEAR 1 - Cost</th>
                                    <th>2023 Cut-off</th>
                                    <th>2022 Cut-off</th>
                                    <th>2021 Cut-off</th>
                                    <th>More Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCourses.map((course: IUniversity, index: number) => (
                                    <React.Fragment key={index}>
                                        <tr onClick={() => handleRowClick(index)}>
                                            <td>{course.ProgrammeName}</td>
                                            <td>{course.Year1ProgrammeCost}</td>
                                            <td>{course.Cutoff2023}</td>
                                            <td>{course.Cutoff2022}</td>
                                            <td>{course.Cutoff2021}</td>
                                            <td>
                                                <button className="btn btn-outline">
                                                    {expandedRow === index ? 'Hide' : 'Show'}
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedRow === index && (
                                            <tr>
                                                <td colSpan={6}>
                                                    <div className="p-4 bg-base-200 rounded-lg">
                                                        <h3 className="font-bold">Cluster Subjects Required</h3>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <p className='text-white'>Cluster Subject 1: {course.ClusterSubjectOne}</p>
                                                                <p className='text-white'>Cluster Subject 2: {course.ClusterSubjectTwo}</p>
                                                            </div>
                                                            <div>
                                                                <p className='text-white'>Cluster Subject 3: {course.ClusterSubjectThree}</p>
                                                                <p className='text-white'>Cluster Subject 4: {course.ClusterSubjectFour}</p>
                                                            </div>
                                                        </div>
                                                        <h4 className="font-bold">Minimum Subject Requirements</h4>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            {course.MinimumSubjectRequirements.map((requirement: { Subject: string; Grade: string }, reqIndex: number) => (
                                                                <div key={reqIndex}>
                                                                    <p className='text-white'>{requirement.Subject}: {requirement.Grade}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                            <span className='text-orange-400'>NOTE: A subject may only be considered ONCE in this section</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button
                            className="btn btn-outline mr-2"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Universities;
export type { IUniversity };
