import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/client";
import styles from "./nav.module.css";

export default function Nav() {
  const [session, loading] = useSession();

  console.log(session);

  return (
    <nav className="h-16 m-8 mt-4">
      <div className="flex justify-between items-center h-full">
        <div>
          <Link href="/">
            <a className="text-blue-500 no-underline ">Home</a>
          </Link>
        </div>
        <div className="flex justify-between items-center space-x-4 h-full">
          <>
            {!session && (
              <button className="btn-blue no-underline" onClick={signIn}>
                Login
              </button>
            )}
            {session && (
              <div className="flex justify-end items-center h-full">
                <Link
                  href={`/profile/${session.user.id}`}
                  className="btn-blue no-underline"
                >
                  <img
                    className="w-auto h-7/10 rounded-full mr-4"
                    referrerPolicy="no-referrer"
                    src={session.user.image}
                    alt="User profile picture"
                  />
                </Link>
                <button
                  className="btn bg-gray-500 no-underline"
                  onClick={signOut}
                >
                  Logout
                </button>
              </div>
            )}
          </>
        </div>
      </div>
    </nav>
  );
}
