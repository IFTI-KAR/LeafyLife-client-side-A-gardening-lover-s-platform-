import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Footer from '../Footer';
import { AuthContext } from '../../provider/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, setUser } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          icon: 'success',
          title: 'Logged in with Google!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-In Failed',
          text: error.message
        });
      });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message
        });
      });
  };

  return (
    <div>
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
        <div className="card w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-green-800 text-center mb-4">
            Login to Your Account
          </h1>

          <form onSubmit={handleLogIn} className="card-body space-y-4">
            <div className="form-control">
              <label className="label text-sm text-green-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="form-control">
              <label className="label text-sm text-green-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <label className="label">
                <a href="#" className="label-text-alt text-sm text-green-600 hover:underline">
                  Forgot password?
                </a>
              </label>
            </div>

            <button className="btn bg-green-700 hover:bg-green-800 text-white w-full rounded-xl mt-2">
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn border border-green-600 text-green-700 hover:bg-green-100 w-full rounded-xl mt-2 flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>

            <p className="text-sm text-center mt-4">
              Don’t have an account?{' '}
              <Link to="/auth/register" className="text-green-600 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
