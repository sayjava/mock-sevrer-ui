import Link from "next/link";

export default () => {
  return (
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
      <div className="flex-1 hidden px-2 mx-2 lg:flex">
        <span className="text-lg font-bold">Mock-Server UI</span>
      </div>
      <div className="flex-1 mx-2">
        <div className="items-stretch lg:flex">
          <Link href="/logs">
            <span className="btn btn-ghost btn-sm">Logs</span>
          </Link>
          <Link href="/expectations">
            <span className="btn btn-ghost btn-sm">Expectations</span>
          </Link>
        </div>
      </div>
      <div className="flex-1 lg:flex-none">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-ghost rounded-none bordered"
          />
        </div>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
