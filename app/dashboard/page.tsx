'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isLogoutLoading } = useAuth();
console.log("user",user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleLogout = async () => {
    logout(undefined, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={handleLogout} disabled={isLogoutLoading} variant="outline">
            {isLogoutLoading ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome, {user.name}!</CardTitle>
            <CardDescription>Email: {user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">You are successfully logged in to the application.</p>
          </CardContent>
        </Card>

       
      </main>
    </div>
  );
}
