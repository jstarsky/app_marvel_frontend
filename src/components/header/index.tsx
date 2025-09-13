import Favorite from "@/components/favorite";
import { useAuth } from "@/context/auth";

export default function Header() {
  const { logout } = useAuth();
  return (
    <header className="min-h-[5.25rem] bg-black flex items-center justify-between">
      <span className="pl-[1rem] sm:pl-[3rem] text-[3.25rem] md:text-[3.75rem] marvel-marvel-logo">
        <span className="path1" />
        <span className="path2" />
        <span className="path3" />
        <span className="path4" />
      </span>
      <Favorite
        className="pr-[1rem] sm:pr-[3rem]"
        size="medium"
        isActive
        amount={3}
        onLogout={() => {
          logout();
        }}
      />
    </header>
  );
}
