import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import logo from "@/assets/logo.png";
import { useTheme } from "@/components/theme/ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="JusPredict Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-foreground">JusPredict</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#markets" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
              <a href="/sports" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sports
            </a>
            <a href="#how" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
