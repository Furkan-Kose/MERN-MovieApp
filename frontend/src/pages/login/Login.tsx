import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../api/authApi';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserType } from '../../types';


const schema = z.object({
  email: z.string().email({ message: 'Enter a valid e-mail address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const { mutate: loginUser, isPending, isError } = useLogin();

  const toastOptions = {
    position: 'bottom-right' as 'bottom-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
      loginUser(data, {
        onSuccess: (data) => {
          updateUser(data);
          toast.success('Login successful', toastOptions);
          navigate('/');
        },
        onError: () => {
          toast.error('Login failed', toastOptions);
        }
      });
  }


  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter your e-mail address" 
            {...register('email')}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          <label htmlFor="password">Password:</label>
          <input
            type="password" 
            id="password"  
            placeholder="Enter your password" 
            {...register('password')}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          <button type="submit" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {isError && <p className={styles.error}>Email or password is incorrect</p>}
        <p className={styles.registerLink}>Don't you have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
