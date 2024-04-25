import styles from './Register.module.css';
import { useRegister } from '../../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from 'react-toastify';

const schema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  email: z.string().email({ message: 'Enter a valid e-mail address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormFields = z.infer<typeof schema>;

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const { mutate: registerUser, isPending, isError } = useRegister();

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
    try {
      await registerUser(data);
      navigate('/login');
      toast.success('Registration Successful!', toastOptions);
    } catch (error) {
      console.log('Error registering user', error);
      toast.error('Registration failed!', toastOptions);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.registerForm}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username:</label>
          <input
            type="text" 
            id="username" 
            placeholder="Enter your username" 
            {...register('username')}
          />
          {errors.username && <p className={styles.error}>{errors.username.message}</p>}
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
          <button disabled={isPending} type="submit">
            {isPending ? 'Registering...' : 'Register'}
          </button>
        </form>
        {isError && <p className={styles.error}>Registration failed please try again.</p>}
        <p className={styles.loginLink}>Do you have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
