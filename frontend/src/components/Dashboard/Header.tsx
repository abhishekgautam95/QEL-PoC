import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="header-left">
          <div className="brand">
            <div className="brand-icon-small">✓</div>
            <h1>TaskFlow</h1>
          </div>
        </div>

        <div className="header-right">
          <div className="user-menu">
            <div className="user-avatar">
              {user?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.full_name || 'User'}</span>
              <span className="user-email">{user?.email}</span>
            </div>
            <button onClick={handleSignOut} className="btn-secondary">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
