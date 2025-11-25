import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { api } from "@/api/client";

type LoginResponse = {
  token?: string;
  accessToken?: string;
  access_token?: string;
  refreshToken?: string;
  tokenExpiry?: string;
  userProfile?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    userStatus?: string;
  };
};

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"email" | "social">("email");

  // --------------------------
  // GOOGLE LOGIN HANDLER
  // --------------------------
  const handleGoogleResponse = async (response: any) => {
    try {
      setLoading(true);
      const googleToken = response.credential?.trim();

console.log("Token len:", googleToken.length);


      // Debug: log the whole response so we can inspect what's returned
      // (remove or lower verbosity in production)
      console.log("Google response:", response);
      console.log("Google token len:", (googleToken as string)?.length);

      console.log("Sending socialLogin payload: platform=GOOGLE, token=<redacted>");

      // Optional debug: validate token with Google's tokeninfo endpoint
      // (useful to verify claims client-side while debugging server rejection).
      try {
        const infoRes = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(
            googleToken,
          )}`,
        );
        if (infoRes.ok) {
          const info = await infoRes.json();
          console.log("Google tokeninfo:", info);
        } else {
          console.warn("tokeninfo returned non-OK", infoRes.status);
        }
      } catch (err) {
        console.warn("Failed to call tokeninfo:", err);
      }

      // According to the OpenAPI schema, the request object for social login
      // should contain only `platform` and `token` under `socialLogin`.
      const data = await api.post<LoginResponse>("/user/v1/login", {
        socialLogin: {
          platform: "GOOGLE",
            token: googleToken,  
        },
      });
  
      const token = data.token || data.accessToken || data.access_token;
console.log("Sending token:", googleToken.substring(0, 15));

      if (token) {
        localStorage.setItem("auth_token", token);

        // 🔥 Notify Navbar to update instantly
        window.dispatchEvent(
          new CustomEvent("local-storage", {
            detail: { key: "auth_token", newValue: token },
          })
        );
      }

      if (data.refreshToken)
        localStorage.setItem("refresh_token", data.refreshToken);
      if (data.userProfile)
        localStorage.setItem("user_profile", JSON.stringify(data.userProfile));

      toast.success("Logged in with Google");
      navigate("/");
    } catch (err) {
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // LOAD GOOGLE BUTTON
  // --------------------------
  useEffect(() => {
    if (mode !== "social") return;

    const renderGoogle = () => {
      const win: any = window;
      if (!win.google || !win.google.accounts) return;

      const el = document.getElementById("googleLoginBtn");
      if (!el) return;

      win.google.accounts.id.initialize({
        client_id:
          "652449978300-fd4328gsja0irqdkfh677rf8p11lrj3t.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      win.google.accounts.id.renderButton(el, {
        theme: "outline",
        size: "large",
        width: "100%",
      });
    };

    const scriptSrc = "https://accounts.google.com/gsi/client";
    let existing = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null;

    // If google is already available, render immediately.
    if ((window as any).google && (window as any).google.accounts) {
      renderGoogle();
      return;
    }

    let script: HTMLScriptElement | null = null;
    let fallbackInterval: number | null = null;

    const attachListener = (el: HTMLScriptElement) => {
      // If script already finished loading but google isn't yet available,
      // call renderGoogle once more as a fallback.
      if ((el as any).readyState === "complete" || el.getAttribute("data-loaded") === "true") {
        // small timeout to allow global to be set by the script
        setTimeout(renderGoogle, 50);
        return;
      }

      el.addEventListener("load", () => {
        el.setAttribute("data-loaded", "true");
        renderGoogle();
      }, { once: true });
    };

    if (existing) {
      attachListener(existing);
    } else {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.defer = true;
      attachListener(script);
      document.body.appendChild(script);
    }

    // As an extra safety net (covers odd race conditions), poll for the
    // `google.accounts` object and render when available.
    fallbackInterval = window.setInterval(() => {
      if ((window as any).google && (window as any).google.accounts) {
        renderGoogle();
        if (fallbackInterval) {
          clearInterval(fallbackInterval);
        }
      }
    }, 300);

    // cleanup
    return () => {
      if (existing) existing.removeEventListener("load", renderGoogle as any);
      if (script) script.removeEventListener("load", renderGoogle as any);
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [mode]);

  // --------------------------
  // EMAIL LOGIN HANDLER
  // --------------------------
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }

    setLoading(true);

    try {
      const data = await api.post<LoginResponse>("/user/v1/login", {
        emailLogin: { email, password },
      });

      const token = data.token || data.accessToken || data.access_token;

      if (token) {
        localStorage.setItem("auth_token", token);

        // 🔥 Notify Navbar to update instantly
        window.dispatchEvent(
          new CustomEvent("local-storage", {
            detail: { key: "auth_token", newValue: token },
          })
        );
      }

      if (data.refreshToken)
        localStorage.setItem("refresh_token", data.refreshToken);
      if (data.tokenExpiry)
        localStorage.setItem("token_expiry", data.tokenExpiry);
      if (data.userProfile)
        localStorage.setItem("user_profile", JSON.stringify(data.userProfile));

      toast.success("Logged in successfully");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Access your JusPredict account
              </CardDescription>
            </CardHeader>

            <form onSubmit={onSubmit}>
              <CardContent className="space-y-4">
                <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
                  <TabsList>
                    <TabsTrigger value="email">Email Login</TabsTrigger>
                    <TabsTrigger value="social">Google Login</TabsTrigger>
                  </TabsList>

                  <TabsContent value="email" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="social" className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Continue with Google
                    </div>
                    <div id="googleLoginBtn" className="w-full"></div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                {mode === "email" && (
                  <Button disabled={loading} type="submit" className="w-full">
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                )}

                <a
                  href="https://api.predictyourgame.com/swagger-ui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground underline"
                >
                  API Docs
                </a>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
