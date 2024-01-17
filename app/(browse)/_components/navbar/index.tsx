import { Actions } from "./actions";
import { Logo } from "./logo";
import { Search } from "./search";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-[#252731] flex gap-x-4 items-center p-2 lg:p-4 justify-between shadow-sm">
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
};
