import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import { api } from "@/api/client";
import { toast } from "@/components/ui/sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("auth_token"));

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(!!localStorage.getItem("auth_token"));
    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const onLogout = async () => {
    try {
      await api.post("/user/v1/logout");
    } catch (_) {}
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("user_profile");
    setIsLoggedIn(false);
    toast.success("Logged out");
    navigate("/");
  };
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="JusPredict Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-foreground">JusPredict</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="/sports" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sports</a>
            <a href="#events" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Events</a>
            <a href="#leaderboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Leaderboard</a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a
              href="https://api.predictyourgame.com/swagger-ui/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              API Docs
            </a>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Button variant="ghost" className="hidden sm:inline-flex" onClick={onLogout}>Logout</Button>
            ) : (
              <>
                <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/login">Login</Link></Button>
                <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
              </>
            )}
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
