import { getUsersBySearch } from "../lib/data/users";
import UserCard from "./UserCard";
import Pagination from "./Pagination";

export default async function UsersList({
  query,
  pageNumber,
}: {
  query: string;
  pageNumber: number;
}) {
  const users = await getUsersBySearch(pageNumber, query);
  let totalPages;
  if (users?.length) {
    totalPages = Math.ceil(users.length / 20);
    const filteredUsers = users.filter((user) => (user !== undefined && user !== null));
    return (
      <>
        <div className="grid sm:grid-cols-2 sm:w-7/12 mx-auto gap-3">
          {filteredUsers.map((user) => {
            return <UserCard key={user.userInfo?.user_id} user={user} />;
          })}
        </div>
        {totalPages > 1 && (
          <div className="pb-14 sm:pb-4 pt-10 flex justify-center">
            <Pagination totalPages={totalPages <= 10 ? totalPages : 10} />
          </div>
        )}
      </>
    );
  } else{
    return (
      <div className="flex justify-center items-center">
      <p>{`No users found`}</p>
    </div>
    )
  }
}
