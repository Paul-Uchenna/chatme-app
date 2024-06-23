import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col justify-center items-center bg-gray-100">
        <div className="relative w-full h-[160px]">
          <Image
            src="/images/logo.png"
            alt="logo"
            layout="fill"
            objectFit="contain"
            className="w-auto h-auto"
          />
        </div>
        <div className="w-full pl-10 py-5 text-start">
          <p className="font-semibold">
            Connect with friends and stay updated. Sign in or create an account
            to join us.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
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
