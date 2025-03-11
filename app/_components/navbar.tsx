'use client';
import logo from '@/public/vanish-vote-logo.png';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const menuItems = [
    {
      link: '/poll/create',
      text: 'Add a poll',
    },
  ];
  return (
    <nav className="w-full py-3 px-4 shadow">
      <div className="max-w-4xl xl:max-w-5xl mx-auto flex justify-between gap-6">
        <Link href="/" className="block relative w-56 aspect-[700/155]">
          <Image fill src={logo} alt="Vanish Vote" />
        </Link>

        <div className="flex gap-2 items-center justify-end h-[50px]">
          {menuItems?.map((item) => (
            <Link
              key={item?.link}
              href={item?.link}
              className="h-full items-center flex hover:bg-brand hover:text-white px-3 rounded font-medium text-brand cursor-pointer"
            >
              {item?.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
