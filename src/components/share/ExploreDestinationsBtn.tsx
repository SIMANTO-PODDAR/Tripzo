import Link from "next/link";
import { MdExplore } from "react-icons/md";

const ExploreDestinationsBtn = () => {
    return (
        <Link href='/explore'>
            <button
                type="button"
                className="inline-flex items-center justify-center gap-2 bg-[#E88429] hover:bg-orange-600 text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-[#E88429]/30 transition-colors duration-200 hover:cursor-pointer"
            >
                <MdExplore /> Explore Destinations
            </button>
        </Link>
    );
};

export default ExploreDestinationsBtn;