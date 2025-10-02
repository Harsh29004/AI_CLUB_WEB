import LinkedIn from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "next/image";
import Link from "next/link";

interface prop {
  name: string;
  img: any;
  role: string;
  Linkedin: string;
  GitHub: string;
}
function TeamCard({ name, img, role, Linkedin, GitHub }: prop) {
  return (
    <div className="w-[290px] max-w-[340px] bg-white flex flex-col m-3 border rounded-xl p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative mx-auto h-[260px] w-[260px]">
        <Image
          src={img}
          priority
          alt={`${name} portrait`}
          className="h-full w-full rounded-full object-cover ring-1 ring-black/10"
        />
      </div>
      <p className="text-center text-lg font-semibold mt-3">{name}</p>
      <p className="text-center text-sm w-full bg-gray-900 text-white rounded-md py-1">{role}</p>
      <div className="socials flex justify-center gap-4 mt-3">
        <Link href={Linkedin} aria-label={`${name} on LinkedIn`} className="bg-white shadow p-2 rounded-lg hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300">
          <LinkedIn />
        </Link>
        <Link href={GitHub} aria-label={`${name} on GitHub`} className="bg-white shadow p-2 rounded-lg hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300">
          <GitHubIcon />
        </Link>
      </div>
    </div>
  );
}
export default TeamCard;
// text-center font-mono p-2 font-bold w-[100%] bg-black border-4 rounded-md border-pink-700 text-white
