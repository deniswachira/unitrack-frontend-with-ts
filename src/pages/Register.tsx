import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import loginPic from '../assets/register.svg';
import { userApi } from '../features/api/userApiSlice';
import { UserRegisterFormValues } from '../types/Types';
import { toast, Toaster } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<UserRegisterFormValues>();
    const navigate = useNavigate();
    const [registerUser, { isLoading }] = userApi.useRegisterUserMutation();
    const { isAuthenticated, user} = useSelector((state: RootState) => state.auth);
    

    useEffect(() => {
        if (isAuthenticated) {
            if (user.userType === 'admin') {
                navigate('/dashboard/admin');
            } else
            navigate('/dashboard/me');
        }
    }, [isAuthenticated, navigate,user]);

    const onSubmit = async (data: UserRegisterFormValues) => {
        try {
            console.log(data);
             await registerUser(data).unwrap();
            toast.success("Registration successful");
            navigate('/login');
        } catch (err: any) {
            toast.error('Failed to register: ' + (err.data?.message || err.message || err.error || err));
        }
    };



    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen">
            <Toaster toastOptions={{
                classNames: {
                    error: 'bg-red-400',
                    success: 'text-green-400',
                    warning: 'text-yellow-400',
                    info: 'bg-blue-400',
                },
            }}
                position="top-right"
            />
                <div className="flex-grow grid sm:grid-cols-2">
                    <div className="flex items-center justify-center sm:order-first p-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="card gap-6 p-8 shadow-xl rounded-lg w-full max-w-lg ">
                            <h1 className="text-4xl text-green-500 text-center mb-6">Register</h1>
                            <div className="grid grid-cols-1 gap-4 place-items-center rounded-box w-full">
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <input {...register("firstName", { required: true })} type="text" className="grow text-gray-500 py-3 px-4 rounded-md" placeholder="First Name" />
                                </label>
                                {errors.firstName && <span className="text-red-600">First Name is required</span>}
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <input {...register("lastName", { required: true })} type="text" className="grow text-gray-500 py-3 px-4 rounded-md" placeholder="Last Name" />
                                </label>
                                {errors.lastName && <span className="text-red-600">Last Name is required</span>}

                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <input {...register("email", { required: true })} type="email" className="grow text-gray-500 py-3 px-4 rounded-md" placeholder="Email" />
                                </label>
                                {errors.email && <span className="text-red-600">Email is required</span>}

                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <input {...register("county", { required: true })} type="text" className="grow text-gray-500 py-3 px-4 rounded-md" placeholder="County" />
                                </label>
                                {errors.county && <span className="text-red-600">County is required</span>}

                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <input {...register("userName", { required: true })} type="text" className="grow text-gray-500 py-3 px-4 rounded-md" placeholder="Username" />
                                </label>
                                {errors.userName && <span className="text-red-600">Username is required</span>}

                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <input {...register("password", { required: true })} type="password" className="grow text-gray-500 py-3 px-4 rounded-md" placeholder="Password" />
                                </label>
                                {errors.password && <span className="text-red-600">Password is required</span>}
                            </div>
                            <div className="w-full flex justify-center mt-4">
                                <button type="submit" className="btn bg-green-500 text-white py-3 pb-10 px-10 rounded-lg text-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-600">
                                    {isLoading ? <span className="loading loading-spinner text-error"></span> : 'Register'}
                                </button>
                            </div>
                               
                            <NavLink to="/" className="text-gray-500 mt-4 text-center block">
                                🏡 Go to HomePage
                            </NavLink>
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-400">
                                    Already have an account?{' '}
                                    <NavLink to="/login" className="text-blue-500 hover:underline">
                                        Login here
                                    </NavLink>.
                                </p>
                            </div>
                        </form>
                       
                    </div>
                    <div className="flex items-center justify-center p-6">
                        <img src={loginPic} alt="Register Illustration" className="max-h-[80vh]" />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
