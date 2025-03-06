// import  { useEffect, useState } from 'react';
// import { mentorsApi } from '../../features/api/mentorsApi';
// import { RootState } from "../../app/store";
// import { useSelector } from 'react-redux';
// import { appointmentsApi } from '../../features/api/appointmentApi';
// import {toast,Toaster} from 'sonner';

// interface Mentor {
//     _id: string;
//     name: string;
//     industry: string;
//     skills: string[];
//     location: string;
//     bio: string;
//     experienceYears: number;
//     contactInfo: {
//         email: string;
//         phone: string;
//     };
// }

const Mentorship = () => {
    // const { user } = useSelector((state: RootState) => state.auth);
    // const [mentors, setMentors] = useState<Mentor[]>([]);
    // const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
    // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [selectedDate, setSelectedDate] = useState<string>('');
    // const [createAppointment] = appointmentsApi.useCreateAppointmentMutation();

    // const { data: mentorsData } = mentorsApi.useGetMentorsQuery(1, {
    //     refetchOnMountOrArgChange: true,
    //     pollingInterval: 1000,
    // });

    // useEffect(() => {
    //     if (mentorsData) {
    //         setMentors(mentorsData);
    //     }
    // }, [mentorsData]);

    // const handleSelectMentor = (mentor: Mentor) => {
    //     setSelectedMentor(mentor);
    // };

    // const handleBookAppointment = () => {
    //     if (selectedMentor) {
    //         setIsModalOpen(true);
    //     } else {
    //         alert('Please select a mentor first.');
    //     }
    // };

    // const handleConfirmBooking = async () => {
    //     if (selectedDate) {
    //         setIsModalOpen(false);
    //         try {
    //             await createAppointment({
    //                 userId: user._id,
    //                 mentorId: selectedMentor!._id,
    //                 appointmentDate: selectedDate
    //             });
    //             toast.success('Appointment booked successfully! You will receive an confirmation text shortly.');
    //         } catch (error) {
    //             alert('Failed to book the appointment. Please try again.');
    //         }
    //     } else {
    //         alert('Please select a date for your appointment.');
    //     }
    // };

    return (
        <>
            {/* <Toaster toastOptions={{
                classNames: {
                    error: 'bg-red-400',
                    success: 'text-green-400',
                    warning: 'text-yellow-400',
                    info: 'bg-blue-400',
                },
            }}
            /> */}
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-xl font-bold mb-4 text-center">Available Mentors</h1>

            <h1 className='text-blue-700'>Hang tight feature coming soon...😊😊</h1>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentors.map((mentor) => (
                    <div
                        key={mentor._id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        onClick={() => handleSelectMentor(mentor)}
                    >
                        <div className="flex items-center mb-4">
                            <img
                                src={`https://ui-avatars.com/api/?name=${mentor.name}&background=random`}
                                alt={mentor.name}
                                className="w-16 h-16 rounded-full mr-4"
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{mentor.name}</h2>
                                <p className="text-gray-600">{mentor.industry}</p>
                            </div>
                        </div>
                        <p className="text-gray-800 mb-2"><strong>Skills:</strong> {mentor.skills.join(', ')}</p>
                        <p className="text-gray-600"><strong>Location:</strong> {mentor.location}</p>
                    </div>
                ))}
            </div>

            {selectedMentor && (
                <div className="mentor-details mt-8 p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Mentor Details</h2>
                    <p className="text-gray-800"><strong>Name:</strong> {selectedMentor.name}</p>
                    <p className="text-gray-800"><strong>Industry:</strong> {selectedMentor.industry}</p>
                    <p className="text-gray-800"><strong>Skills:</strong> {selectedMentor.skills.join(', ')}</p>
                    <p className="text-gray-800"><strong>Location:</strong> {selectedMentor.location}</p>
                    <p className="text-gray-800"><strong>Bio:</strong> {selectedMentor.bio}</p>
                    <p className="text-gray-800"><strong>Experience:</strong> {selectedMentor.experienceYears} years</p>
                    <p className="text-gray-800"><strong>Email:</strong> {selectedMentor.contactInfo.email}</p>
                    <button
                        onClick={handleBookAppointment}
                        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                    >
                        Book Appointment
                    </button>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl font-semibold mb-4">Confirm Appointment</h2>
                        <p className="mb-4">Are you sure you want to book an appointment with {selectedMentor?.name}?</p>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-gray-700">Select a date for your appointment:</label>
                            <input
                                type="date"
                                id="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full p-2 border rounded mt-2"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mr-4 px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmBooking}
                                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    </>
    );
};

export default Mentorship;
