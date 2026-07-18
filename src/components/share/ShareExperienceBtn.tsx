import Link from 'next/link';
import { TbCameraShare } from 'react-icons/tb';

const ShareExperienceBtn = () => {
    return (
        <Link href="/post-story">
            <button
                type="button"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F566C] font-semibold text-base px-8 py-3.5 rounded-xl transition-colors duration-200 hover:cursor-pointer"
            >
               <TbCameraShare /> Share Experience
            </button>
        </Link>
    );
};

export default ShareExperienceBtn;