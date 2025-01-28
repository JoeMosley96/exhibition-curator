import { getUsersBySearch } from "../lib/data/users";

export default async function UsersList({
  query,
  pageNumber,
}: {
  query: string;
  pageNumber: number;
}) {
  const users = await getUsersBySearch(pageNumber, query);
  return users?.map((user) => {
    return (
      <>
      <img src={user?.avatar_img_url}/>
        <p>{user?.first_name}</p>
        <p>{user?.last_name}</p>
        <p>{user?.username}</p>
      </>
    );
  });
}
