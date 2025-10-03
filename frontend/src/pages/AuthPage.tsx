import { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-sidebar">
          <div className="auth-brand">
            <div className="brand-icon">✓</div>
            <h1>TaskFlow</h1>
          </div>
          <p className="auth-hero-text">
            Organize your work and life, finally.
          </p>
          <div className="auth-features">
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Powerful project management</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Lightning fast performance</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Secure and reliable</span>
            </div>
          </div>
        </div>

        <div className="auth-main">
          {isLogin ? (
            <LoginForm onToggle={() => setIsLogin(false)} />
          ) : (
            <SignupForm onToggle={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
