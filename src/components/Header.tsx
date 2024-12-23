import Link from "next/link";
import Image from "next/image";
import cartIcon from "../../public/header/icon-cart.png";

export default function Header() {
  return (
    <header className="flex justify-between align-middle py-5 bg-secondary text-[#585660] sm:px-32 xs:px-6 font-bold text-2xl">
      <Link href="/">GamerShop</Link>
      <Link href="/games/cart" className="p-0.5">
        <Image src={cartIcon} alt="button shopping cart icon" width={24} height={24}></Image>
      </Link>
    </header>
  );
}
