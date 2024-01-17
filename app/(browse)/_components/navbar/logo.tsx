import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1 shrink-0 mr-4 lg:mr-0">
          <Image src="/spooky.svg" alt="StreamSaga" width={32} height={32} />
        </div>
        <div className={cn("lg:flex flex-col hidden", font.className)}>
          <p className="text-lg font-semibold">StreamSaga</p>
          <p className="text-xs text-muted-foreground">Jouons</p>
        </div>
      </div>
    </Link>
  );
};
