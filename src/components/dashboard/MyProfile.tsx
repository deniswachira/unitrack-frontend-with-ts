import { useEffect, useState } from 'react';
import { FaCamera, FaEdit, FaTimes } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import subjectOptions from "../../assets/subject.json";
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { userApi } from '../../features/api/userApiSlice';
import Swal from 'sweetalert2';
import { PuffLoader } from "react-spinners";
import { toast, Toaster } from 'sonner';
import { Trash } from 'lucide-react';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  county: string;
  finalGrade: string;
  interests: string[];
  hobbies: string[];
}

interface Grade {
  subject: string;
  grade: string;
}

const MyProfile = () => {
  const gradeOptions = [
    { value: 'A', label: 'A' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B', label: 'B' },
    { value: 'B-', label: 'B-' },
    { value: 'C+', label: 'C+' },
    { value: 'C', label: 'C' },
    { value: 'C-', label: 'C-' },
    { value: 'D+', label: 'D+' },
    { value: 'D', label: 'D' },
    { value: 'D-', label: 'D-' },
    { value: 'E', label: 'E' },
  ];

  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: userData } = userApi.useGetUserByIdQuery(user?._id);
  const [updateProfile] = userApi.useUpdateUserDetailsMutation();
  const { data: usersGrade, isLoading } = userApi.useGetUserGradesQuery(user?._id);
  const [addUserGrade] = userApi.useAddUserGradeMutation();
  const [deleteUserGrade] = userApi.useDeleteUserGradeMutation();
  const [updateInterests] = userApi.useUpdateUserInterestsMutation();
  const [newSubject, setNewSubject] = useState('');
  const [newSubjectGrade, setNewSubjectGrade] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false); // State for Interests Modal
  const { register, handleSubmit,getValues, formState: { errors } } = useForm<FormValues>();
  const profilePicture = 'https://via.placeholder.com/150';

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInterestModalToggle = () => {
    setIsInterestModalOpen(!isInterestModalOpen);
  };

  const addSubject = async (e: any) => {
    e.preventDefault();
    try {
      const newSubjectEntry = {
        subject: newSubject,
        grade: newSubjectGrade,
      };
      await addUserGrade({ user_id: user?._id, ...newSubjectEntry }).unwrap();
      toast.success('Subject added successfully');

      setIsModalOpen(false);
      setNewSubject('');
      setNewSubjectGrade('');
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await updateProfile({ ...data, _id: user?._id }).unwrap();
      toast.success('Profile updated successfully');
      handleModalToggle();
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      console.log(error);
    }
  };

  const onSubmitInterests: SubmitHandler<FormValues> = async (data) => {
    try {
      const interestsArray = (data.interests as unknown as string).split(',').map(interest => interest.trim());
      const hobbiesArray = (data.hobbies as unknown as string).split(',').map((hobby: string) => hobby.trim());
      console.log({ interests: interestsArray, hobbies: hobbiesArray });
      await updateInterests({ _id: user?._id, interests: interestsArray, hobbies: hobbiesArray }).unwrap();
      toast.success('Interests updated successfully');
      handleInterestModalToggle();
    } catch (error) {
      toast.error('Failed to update interests. Please try again.');
      console.log(error);
    }
  };


  // Function to handle deletion of subject
  const handleDeleteSubject = async (subject: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      try {
        await deleteUserGrade({ user_id: user?._id, patch: { subject } }).unwrap();
        toast.success('Subject deleted successfully');
      } catch (error) {
        toast.error('Failed to delete subject');
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user.userType !== 'admin') {
      navigate('/dashboard/me');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (usersGrade) {
      setGrades(usersGrade);
    }
  }, [usersGrade]);

  return (
    <>
      <Toaster toastOptions={{
        classNames: {
          error: 'bg-red-400',
          success: 'text-green-400',
          warning: 'text-yellow-400',
          info: 'bg-blue-400',
        },
      }}
      />

      <div className="min-h-screen text-green-500 py-10 px-5">
        <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-5">
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-5 mb-5">
            <div className="relative flex items-center gap-4 mb-4 md:mb-0">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-green-500"
              />
              <label className="absolute bottom-0 bg-green-500 p-2 rounded-full cursor-pointer">
                <FaCamera />
                <input type="file" className="hidden" />
              </label>
              <div>
                <h2 className="text-3xl font-bold">{userData?.firstName} {userData?.lastName} </h2>
                <p className="text-gray-400">{userData?.email}</p>
              </div>
            </div>
            <button
              className="btn btn-primary flex items-center gap-2"
              onClick={handleModalToggle}
            >
              <FaEdit /> Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-2xl font-bold mb-3">Personal Information</h3>
              <p className="mb-2">
                <span className="font-bold">Grade:</span> {userData?.finalGrade}
              </p>
              <p className="mb-2">
                <span className="font-bold">County:</span> {userData?.county}
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-bold">Interests</h3>
                <button
                  className="btn btn-outline btn-success"
                  onClick={handleInterestModalToggle}
                >
                  <FaEdit /> Edit Interests
                </button>
              </div>
              <p className="mb-2">
                <span className="font-bold">Hobbies:</span> {userData?.hobbies?.join(', ')}
              </p>
              <p className="mb-2">
                <span className="font-bold">Career Interests:</span> {userData?.interests?.join(', ')}
              </p>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 mt-10 w-full">
            <h3 className="text-2xl font-bold mb-3">Subject Scores</h3>
            <button className="btn btn-outline btn-success" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.showModal()}>Add Subject</button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Add Subject</h3>
                <form onSubmit={addSubject}>
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject</label>
                    <select id="subject" className="select select-success w-full max-w-xs" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} required>
                      <option disabled value="">Select subject</option>
                      {subjectOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="grade" className="block text-gray-700 font-bold mb-2">Grade</label>
                    <select id="grade" className="select select-success w-full max-w-xs" value={newSubjectGrade} onChange={(e) => setNewSubjectGrade(e.target.value)} required>
                      <option disabled value="">Select grade</option>
                      {gradeOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-action">
                    <button className="btn btn-outline btn-success" type="submit">Add Subject</button>
                    <button className="btn" type="button" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.close()}>Close</button>
                  </div>
                </form>
              </div>
            </dialog>

            <ul className="mt-4">
              {grades.map((grade: Grade, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-800 rounded-lg p-4 mb-3">
                  <span>{grade.subject}: {grade.grade}</span>
                  <button className="btn btn-outline btn-error" onClick={() => handleDeleteSubject(grade.subject)}>
                    <Trash /> Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <dialog id="my_modal_2" className="modal" open={isModalOpen}>
        <div className="modal-box">
          <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleModalToggle}><FaTimes /></button>
          <h3 className="font-bold text-lg mb-4">Update Profile</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name</label>
              <input id="firstName" type="text" className="input input-bordered w-full" defaultValue={userData?.firstName} {...register('firstName', { required: true })} />
              {errors.firstName && <p className="text-red-500">First name is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
              <input id="lastName" type="text" className="input input-bordered w-full" defaultValue={userData?.lastName} {...register('lastName', { required: true })} />
              {errors.lastName && <p className="text-red-500">Last name is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input id="email" type="email" className="input input-bordered w-full" defaultValue={userData?.email} {...register('email', { required: true })} />
              {errors.email && <p className="text-red-500">Email is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="county" className="block text-gray-700 font-bold mb-2">County</label>
              <input id="county" type="text" className="input input-bordered w-full" defaultValue={userData?.county} {...register('county', { required: true })} />
              {errors.county && <p className="text-red-500">County is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="finalGrade" className="block text-gray-700 font-bold mb-2">Grade</label>
              <select id="finalGrade" className="select select-bordered w-full" defaultValue={userData?.finalGrade} {...register('finalGrade', { required: true })}>
                <option disabled value="">Select grade</option>
                {gradeOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </select>
              {errors.finalGrade && <p className="text-red-500">Grade is required</p>}
            </div>
            <div className="modal-action">
              <button className="btn btn-outline btn-success" type="submit">Update</button>
              <button className="btn" type="button" onClick={handleModalToggle}>Close</button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog id="interest_modal" className="modal" open={isInterestModalOpen}>
        <div className="modal-box">
          <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleInterestModalToggle}><FaTimes /></button>
          <h3 className="font-bold text-lg mb-4">Update Interests</h3>
          <form onSubmit={handleSubmit(onSubmitInterests)}>
            <div className="mb-4">
              <label htmlFor="interests" className="block text-gray-700 font-bold mb-2">Career Interests</label>
              <input id="interests" type="text" className="input input-bordered w-full" defaultValue={userData?.interests?.join(', ')} {...register('interests', { required: true })} />
              {errors.interests && <p className="text-red-500">Interests are required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="hobbies" className="block text-gray-700 font-bold mb-2">Hobbies</label>
              <input id="hobbies" type="text" className="input input-bordered w-full" defaultValue={userData?.hobbies?.join(', ')} {...register('hobbies', { required: true })} />
              {errors.hobbies && <p className="text-red-500">Hobbies are required</p>}
            </div>
            <div className="modal-action">
              <button className="btn btn-outline btn-success" type="submit">Update</button>
              <button className="btn" type="button" onClick={handleInterestModalToggle}>Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default MyProfile;
