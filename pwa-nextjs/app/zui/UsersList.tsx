import { getUsersBySearch } from "../lib/data/users";
import Image from "next/image";

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
      <Image alt="Avatar image" width={300} height={300} src={user?.avatar_img_url}/>
        <p>{user?.first_name}</p>
        <p>{user?.last_name}</p>
        <p>{user?.username}</p>
      </>
    );
  });
}
