import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 rounded py-3">
      <Link className="text-white font-bold text-2xl" href={"/"}>
        Tournamax
      </Link>
      <Link
        className="bg-white px-4 py-2 rounded font-medium"
        href={"/add-topic"}
      >
        Add Topic
      </Link>
    </nav>
  );
}
