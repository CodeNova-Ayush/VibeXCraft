import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function GitHubCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
      console.error('OAuth error:', error, errorDescription);
      setStatus('error');
      toast({
        title: 'GitHub Authorization Failed',
        description: errorDescription || 'Failed to authorize with GitHub',
        variant: 'destructive',
      });
      
      setTimeout(() => {
        navigate('/ai/profile');
      }, 2000);
      return;
    }

    if (code) {
      // For now, we'll store the code and let the user handle token exchange
      // In production, you should exchange this code for a token on your backend
      
      // Store code temporarily (user will need to exchange it for a token)
      localStorage.setItem('github_code', code);
      
      setStatus('success');
      toast({
        title: 'Authorization Code Received',
        description: 'Please exchange this code for a token using your backend or GitHub API',
      });

      // Option 1: If you have a backend, exchange code for token here
      // Option 2: Manual token exchange (see guide)
      // Option 3: Use personal access token instead
      
      setTimeout(() => {
        navigate('/ai/profile');
      }, 2000);
    } else {
      setStatus('error');
      toast({
        title: 'No Authorization Code',
        description: 'No authorization code received from GitHub',
        variant: 'destructive',
      });
      
      setTimeout(() => {
        navigate('/ai/profile');
      }, 2000);
    }
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
            <p className="text-muted-foreground">Processing GitHub authorization...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
            <p className="text-muted-foreground">Authorization successful! Redirecting...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-destructive mx-auto" />
            <p className="text-muted-foreground">Authorization failed. Redirecting...</p>
          </>
        )}
      </div>
    </div>
  );
}

