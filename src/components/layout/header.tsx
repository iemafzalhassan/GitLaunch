import { Logo } from "@/components/icons/logo";

export function Header() {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-border">
      <div className="container mx-auto flex items-center gap-3">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">GitLaunch</h1>
      </div>
    </header>
  );
}
