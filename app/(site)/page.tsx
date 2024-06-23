import Image from "next/image";
import AuthForm from "./components/AuthForm";

function Home() {
  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen">
      {/* Left section */}
      <div className="flex flex-1 flex-col justify-center items-center bg-gray-100 p-4 lg:p-8">
        <div className="relative w-full h-[150px] lg:h-[160px]">
          <Image
            src="/images/logo.png"
            alt="logo"
            layout="fill"
            objectFit="contain"
            className="w-auto h-auto"
          />
        </div>
        <div className="w-full pt-5 text-center lg:text-start">
          <p className="font-semibold text-lg lg:text-xl">
            Connect with friends and stay updated. Sign in or create an account
            to join us.
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex flex-1 flex-col justify-center py-12 sm:px-6 lg:px-6 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}

export default Home;
