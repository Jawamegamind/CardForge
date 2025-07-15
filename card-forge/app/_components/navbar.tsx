import { logout } from "../login/actions";

export default function Navbar() {
  return (
    // <!-- Navbar -->
    <nav className="navbar justify-between bg-base-300">
        {/* <!-- Logo --> */}
        <a className="btn btn-ghost text-lg">
            {/* <img alt="Logo" src="/daisy-components/logo.svg" className="w-4" /> */}
            CardForge 
        </a>

        {/* <!-- Menu for mobile --> */}
        <div className="dropdown dropdown-end sm:hidden">
            <button className="btn btn-ghost">
                <i className="fa-solid fa-bars text-lg"></i>
            </button>

            <ul tabIndex={0} className="dropdown-content menu z-[1] bg-base-200 p-6 rounded-box shadow w-56 gap-2">
                <li><a>About</a></li>
                <li><a>Pricing</a></li>
                <li><a>Blog</a></li>
                <li><a>Contact</a></li>
                <a className="btn btn-sm btn-primary">Log in</a>
            </ul>
        </div>

        {/* <!-- Menu for desktop --> */}
        <ul className="hidden menu sm:menu-horizontal gap-2">
            <a href="/profile" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="User profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
                </div>
            </a>
            <li><a>Settings</a></li>
            <a className="btn btn-sm btn-primary" onClick={logout}>Log Out</a>
        </ul>
    </nav>
  );
}