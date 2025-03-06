import React from 'react';
import { appointmentsApi } from "../../features/api/appointmentApi";
import { RootState } from "../../app/store";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toast, Toaster } from 'sonner';
import { FaCalendarAlt, FaTimes, FaEdit } from 'react-icons/fa';

const MyBookings = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { data: appointments, error, isLoading } = appointmentsApi.useGetAppointmentsForUserQuery(user._id);
    const [cancelAppointment] = appointmentsApi.useCancelAppointmentMutation();

    const handleCancelAppointment = async (_id: any) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel!',
        });
        if (result.isConfirmed) {
            try {
                await cancelAppointment(_id).unwrap();
                toast.success('Appointment canceled successfully');
            } catch (error) {
                toast.error('Failed to cancel Appointment');
            }
        }
    };

    if (isLoading) return <p className="text-gray-300">Loading your bookings...</p>;
    if (error) return <p className="text-red-500">Error loading bookings. Please try again later.</p>;

    return (
        <>
            <Toaster
                toastOptions={{
                    classNames: {
                        error: 'bg-red-600 text-white',
                        success: 'bg-green-600 text-white',
                        warning: 'bg-yellow-600 text-white',
                        info: 'bg-blue-600 text-white',
                    },
                }}
            />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">My Bookings</h1>

                {/* Booking Table */}
                <div className="overflow-x-auto shadow-lg rounded-lg bg-gray-800">
                    <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg">
                        <thead>
                            <tr className="text-left text-sm md:text-base text-gray-200">
                                <th className="py-4 px-6 border-b border-gray-700">#</th>
                                <th className="py-4 px-6 border-b border-gray-700">Appointment Date</th>
                                <th className="py-4 px-6 border-b border-gray-700">Status</th>
                                <th className="py-4 px-6 border-b border-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments?.map((appointment: { _id: React.Key | null | undefined; appointmentDate: string | number | Date; status: string; }, index: number) => (
                                <tr key={appointment._id} className={`hover:bg-gray-700 transition-colors ${appointment.status === 'Cancelled' ? 'opacity-50' : ''}`}>
                                    <td className="py-4 px-6 border-b border-gray-700 text-center text-gray-300">{index + 1}</td>
                                    <td className="py-4 px-6 border-b border-gray-700">
                                        <div className="flex items-center text-gray-300">
                                            <FaCalendarAlt className="text-blue-400 mr-2" />
                                            {new Date(appointment.appointmentDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-700">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${appointment.status === 'Confirmed' ? 'bg-green-700 text-green-200' : appointment.status === 'Pending' ? 'bg-yellow-700 text-yellow-200' : 'bg-red-700 text-red-200'}`}>
                                            {appointment.status || "Pending"}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-700">
                                        {appointment.status === 'Pending' ? (
                                            <div className="flex items-center space-x-3">
                                                <button className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-md">
                                                    <FaEdit className="mr-1" /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleCancelAppointment(appointment._id)}
                                                    className="flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                                                >
                                                    <FaTimes className="mr-1" /> Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-500">No Actions Available</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyBookings;
