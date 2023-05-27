import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

async function TopNavigation() {
  const session = await getServerAuthSession();

  return (
    <nav className="bg-[#2d333b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.582 0 0 3.582 0 8c0 3.535 2.275 6.533 5.428 7.59.396.072.548-.17.548-.384 0-.19-.007-.693-.01-1.36-2.21.48-2.67-1.064-2.67-1.064-.36-.915-.878-1.16-.878-1.16-.718-.492.055-.483.055-.483.793.055 1.21.815 1.21.815.704 1.205 1.846.857 2.296.655.072-.51.275-.858.501-1.055-1.754-.2-3.6-.876-3.6-3.895 0-.86.307-1.565.815-2.117-.09-.2-.354-.997.07-2.077 0 0 .66-.21 2.16.804.626-.174 1.293-.26 1.96-.263.665.004 1.33.09 1.958.263 1.5-1.014 2.16-.804 2.16-.804.424 1.08.16 1.877.08 2.077.51.552.814 1.257.814 2.117 0 3.025-1.85 3.69-3.61 3.887.285.243.54.723.54 1.46 0 1.055-.01 1.905-.01 2.165 0 .21.144.456.55.378C13.726 14.53 16 11.53 16 8c0-4.418-3.582-8-8-8zm0 1.5c3.038 0 5.5 2.462 5.5 5.5S11.038 12.5 8 12.5 2.5 10.038 2.5 7 4.962 1.5 8 1.5zm4.5 6.5H11v2h1.5v-2zM4 8h1.5v2H4V8zm2.5 0H8v2H6.5V8zm2.5 0h1.5v2H9V8zm-6-3h1.5v2H3V5zm2.5 0H6v2H5.5V5zm2.5 0h1.5v2H8V5z"
                />
              </svg>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Repositories
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Pull Requests
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Issues
                </a>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                className="rounded-full border-2 border-transparent p-1 text-gray-400 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none"
                aria-label="Notifications"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 15h.01M12 6h.01M12 10h.01M12 14h.01M12 18h.01M6 18h2M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>

              <div className="relative ml-3">
                <div>
                  {session?.user ? (
                    <button
                      className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://avatars.githubusercontent.com/u/1?v=4"
                        alt=""
                      />
                    </button>
                  ) : (
                    <Link
                      href={session ? "/api/auth/signout" : "/api/auth/signin"}
                      className="ml-auto flex-shrink-0 rounded-full border-2 border-transparent p-1 text-gray-400 hover:text-white  focus:outline-none"
                    >
                      Sign in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Repositories
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Pull Requests
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Issues
          </a>
        </div>

        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://avatars.githubusercontent.com/u/1?v=4"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                {session?.user.name}
              </div>
              <div className="text-sm font-medium leading-none text-gray-400">
                {session?.user.email}
              </div>
            </div>

            {session?.user ? (
              <button aria-label="Notifications">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 15h.01M12 6h.01M12 10h.01M12 14h.01M12 18h.01M6 18h2M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            ) : (
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="ml-auto flex-shrink-0 rounded-full border-2 border-transparent bg-gray-800 p-1 text-gray-400 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none"
              >
                Sign in
              </Link>
            )}
          </div>

          <div className="mt-3 space-y-1 px-2">
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Your Profile
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Settings
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNavigation;
