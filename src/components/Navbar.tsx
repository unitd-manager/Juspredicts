import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import { useHostname } from "@/lib/useHostname";
import { api } from "@/api/client";
import { toast } from "@/components/ui/sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("auth_token"));
  const hostname = useHostname();

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(!!localStorage.getItem("auth_token"));
    syncAuth();

    // Sync across tabs
    window.addEventListener("storage", syncAuth);

    // Sync inside same tab
    const handleLocalStorageCustom = (e: Event) => {
      syncAuth();
    };
    window.addEventListener("local-storage", handleLocalStorageCustom);

    // Patch setItem once
    if (!(window as any).__localStoragePatched) {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key: string, value: string) {
        originalSetItem.apply(this, [key, value]);
        window.dispatchEvent(
          new CustomEvent("local-storage", { detail: { key, newValue: value } })
        );
      };
      (window as any).__localStoragePatched = true;
    }

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("local-storage", handleLocalStorageCustom);
    };
  }, []);

  const onLogout = async () => {
    try {
      await api.post("/user/v1/logout");
    } catch (_) {}

    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("user_profile");

    window.dispatchEvent(
      new CustomEvent("local-storage", { detail: { key: "auth_token", newValue: null } })
    );

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
            {hostname === "juspredictlive.unitdtechnologies.com" ? (
              <a href="#home" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</a>
            ) : (
              <>
                <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</a>
             
              {/* <a href="/sports1" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sports</a> */}

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
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Button variant="ghost" className="hidden sm:inline-flex" onClick={onLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" className="hidden sm:inline-flex">
                  <Link to="/login">Login</Link>
                </Button>
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
