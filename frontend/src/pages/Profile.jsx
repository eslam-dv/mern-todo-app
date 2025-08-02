import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <main>
      <div className="container mx-auto max-w-md">
        <h1 className="text-center text-3xl my-5">My Profile</h1>
        <ul className="flex flex-col items-center gap-5">
          <li>
            <span className="font-bold">Name: </span>
            {user.name}
          </li>
          <li>
            <span className="font-bold">Email: </span>
            {user.email}
          </li>
          <li>
            <span className="font-bold">Created at: </span>
            {new Date(user.createdAt).toLocaleString("en-UK")}
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Profile;
