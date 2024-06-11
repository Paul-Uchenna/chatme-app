import Sidebar from "../Components/Sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UsersList from "./components/UsersList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <UsersList items={users} />
      <div className="h-full ">{children}</div>
    </Sidebar>
  );
}
