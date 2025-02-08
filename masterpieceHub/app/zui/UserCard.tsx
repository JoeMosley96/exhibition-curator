import Image from "next/image";
import Link from "next/link";

interface User {
  avatar_img_url: string;
  first_name: string;
  last_name: string;
  username: string;
}

export default function UserCard({ user }: { user: User }) {
  return (
    <Link key={user.username} href={`/user/${user.username}`}>
      <div className="flex flex-row card bg-base-100 w-96 shadow-xl  mx-auto">
        <figure>
          <Image
            className="ml-3 rounded-full aspect-square object-cover"
            alt="Avatar image"
            width={100}
            height={100}
            src={user?.avatar_img_url}
            unoptimized
          />
        </figure>
        <div className="ml-3 card-body">
          <p>{`${user?.first_name} ${user?.last_name}`}</p>
          <p>{user?.username}</p>
        </div>
      </div>
    </Link>
  );
}
