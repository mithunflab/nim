import { useEffect } from 'react';
import { useAuth } from '@/provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function SignOutPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut();
        toast.success('Successfully signed out');
        navigate('/auth/signin', { replace: true });
      } catch (error) {
        toast.error('Failed to sign out');
        navigate('/presentation', { replace: true });
      }
    };

    handleSignOut();
  }, [signOut, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div>Signing out...</div>
    </div>
  );
}