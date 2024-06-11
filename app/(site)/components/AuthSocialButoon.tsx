import { IconType } from "react-icons";

interface AuthSocialButoonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButoon: React.FC<AuthSocialButoonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center items-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-gray-50 focus:outline-offset-0"
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButoon;
