import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router'; // ✅ Corrected import
import Footer from '../Footer';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import { FcGoogle } from "react-icons/fc";
import { updateProfile } from 'firebase/auth';

const Register = () => {
  const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  // Save gardener info to backend
  const saveGardener = async (gardenerData) => {
    try {
      const res = await fetch('https://leafylife-server.vercel.app/gardeners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gardenerData),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to save gardener data.');
      }
    } catch (error) {
      console.error("Failed to save gardener:", error);
    }
  };

  // Handle Email/Password Registration
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (!validatePassword(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 8 characters and include 1 uppercase, 1 lowercase, and 1 special character.',
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        })
          .then(async () => {
            setUser({ ...user, displayName: name, photoURL: photo });

            // Save gardener data to backend
            const gardenerData = {
              name: name,
              email: email,
              photoURL: photo,
              createdAt: new Date(),
              active: true,
            };

            await saveGardener(gardenerData);

            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: `Welcome, ${name}!`,
            });
            form.reset();
            navigate('/');
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Profile Update Failed',
              text: err.message,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.message,
        });
      });
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        setUser(user);

        // Save gardener data to backend
        const gardenerData = {
          name: user.displayName || 'Unnamed',
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
          active: true,
        };
        await saveGardener(gardenerData);

        Swal.fire({
          icon: 'success',
          title: 'Signed in with Google!',
          text: `Welcome, ${user.displayName || 'User'}!`,
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-In Failed',
          text: error.message,
        });
      });
  };

  return (
    <div>
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
        <div className="card w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-green-800 text-center mb-4">
            Create Your Account
          </h1>

          <form onSubmit={handleRegister} className="card-body space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label text-sm text-green-700">Name</label>
              <input
                type="text"
                required
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label text-sm text-green-700">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label text-sm text-green-700">Photo URL</label>
              <input
                type="text"
                name="photo"
                required
                placeholder="Enter your profile photo URL"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label text-sm text-green-700">Password</label>
              <input
                type="password"
                required
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-green-700 hover:bg-green-800 text-white w-full rounded-xl mt-2"
            >
              Register
            </button>

            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn border border-green-600 text-green-700 hover:bg-green-100 w-full rounded-xl mt-2 flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" />
              Sign up with Google
            </button>

            {/* Redirect to Login */}
            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-green-600 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
