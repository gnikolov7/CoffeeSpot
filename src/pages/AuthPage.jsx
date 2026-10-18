import { Link } from 'react-router-dom';
import PageHeading from '../components/PageHeading.jsx';
import DevelopmentNotice from '../components/DevelopmentNotice.jsx';

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register';
  return (
    <div className="container inner-page auth-layout">
      <div className="auth-copy">
        <PageHeading eyebrow="JOIN THE GOOD TASTE CLUB" 
        title={isRegister ? 'Make yourself at home.' : 'Welcome back.'} 
        description={isRegister ? 'Create an account to share places and connect with other food lovers.' : 'Good to see you again. Log in to manage your places.'} />
        <p className="auth-switch">{isRegister ? 'Already have an account?' : 'New to CoffeeSpot?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Log in' : 'Create an account'}</Link></p>
      </div>
      <div className="auth-card">
        <div className="auth-card-icon" aria-hidden="true">✳</div>
        <h2>{isRegister ? 'Create your account' : 'Sign in'}</h2>
        <DevelopmentNotice title="Authentication is the Day 2 milestone.">
          The real form will use Supabase Auth and React Context. This starter deliberately does not pretend a login works.
        </DevelopmentNotice>
      </div>
    </div>
  );
}
