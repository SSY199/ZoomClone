import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import MobileNav from "./MobileNav";

const Navbar = async () => {
  const { userId } = await auth();

  return (
    // REPLACED: flex-between -> flex items-center justify-between
    <nav className="flex items-center justify-between fixed z-50 w-full bg-[#1C1F2E] px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Yoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          YOOM
        </p>
      </Link>

      {/* REPLACED: flex-between -> flex items-center justify-between */}
      <div className="flex items-center justify-between gap-5">
        {userId && <UserButton />}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
