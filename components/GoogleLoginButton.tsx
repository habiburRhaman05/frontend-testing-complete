'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center cursor-pointer justify-center gap-3 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium hover:bg-gray-50 transition"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="h-5 w-5"
      />
      Continue with Google
    </button>
  );
}
