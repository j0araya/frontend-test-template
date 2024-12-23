import Link from "next/link";
import Image from "next/image";
import logo from "../../public/footer/logo.svg";

export default function Footer() {
  return (
    <footer className="p-4 bg-neutral-700 px-32 py-16 flex justify-center">
      <Link href="/"><Image alt="logo" src={logo} height={44} width={170}></Image></Link>
    </footer>
  );
}
