import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

const CreatorLayout = async ({ children, params }: CreatorLayoutProps) => {
  let self;

  try {
    self = await getSelfByUsername(params.username);
  } catch (error) {
    self = null;
  }

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
