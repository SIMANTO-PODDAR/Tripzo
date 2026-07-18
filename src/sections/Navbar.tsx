"use client"
import Image from "next/image";
import Logo from "../../public/tripzo.png";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Avatar } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";

type NavLinksProps = {
    loggedIn: boolean;
};

const Navbar = () => {
    const { user } = useAuth();
    const loggedIn = !!user;

    const router = useRouter();
    const Logout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully");
            router.push("/");
        }
        catch {
            toast.error("Logout failed");
        }
    };

    return (
        <div className="bg-base-100 shadow-md z-100 sticky top-0">
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>

                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <NavLinks loggedIn={loggedIn} />
                        </ul>
                    </div>

                    <div className="sm:navbar-start">
                        <Image src={Logo} alt='Tripzo Logo' height={40} title="Explore • Share • Inspire" />
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <NavLinks loggedIn={loggedIn} />
                    </ul>
                </div>

                {
                    loggedIn ? (
                        <div className="navbar-end gap-1">
                            <Avatar>
                                <Avatar.Fallback className="bg-[#e0cebc] border border-[#0F566C] rounded-full text-[#0F566C] font-bold">
                                    {(user?.displayName?.charAt(0) || "U").toUpperCase()}
                                </Avatar.Fallback>
                            </Avatar>
                            <button onClick={Logout} className="btn btn-sm bg-[#E88429] hover:bg-orange-600 font-bold text-white flex gap-2 items-center" >
                                Logout
                                <span className="text-xl"><AiOutlineLogout /></span>
                            </button>
                        </div>
                    ) : (
                        <div className="navbar-end">
                            <Link href={'/login'} className="btn btn-sm bg-[#0F566C] font-bold text-white flex gap-2 items-center">
                                Login
                                <span className="text-xl rotate-180"><AiOutlineLogin /></span>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;

const NavLinks = ({ loggedIn }: NavLinksProps) => {
    return (
        <>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/explore">Explore</Link></li>
            <li><Link href="/community">Community</Link></li>

            {loggedIn && (
                <>
                    <li><Link href="/profile">Profile</Link></li>
                    <li><Link href="/post-story">Post Story</Link></li>
                    <li><Link href="/my-stories">My Stories</Link></li>
                    <li><Link href="/ai-story-generator">Story Generator</Link></li>
                    <li><Link href="/ai-image-explorer">Image Explorer</Link></li>
                </>
            )}
        </>
    );
}