import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Header() {
  return (
    <header className="fixed top-0 z-20 flex items-center w-full md:h-20 justify-end">
      <div className="p-2 md:p-10">
        <ModeToggle />
      </div>
    </header>
  );
}
