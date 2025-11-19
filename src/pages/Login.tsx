import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/api/client";
import { toast } from "@/components/ui/sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
  } & Record<string, unknown>;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }
    setLoading(true);
    try {
      const data = await api.post<LoginResponse>("/user/v1/login", { emailLogin: { email, password } });
      const token = data.token || data.accessToken || data.access_token;
      if (token) {
        localStorage.setItem("auth_token", token);
      }
      if (data.refreshToken) localStorage.setItem("refresh_token", data.refreshToken);
      if (data.tokenExpiry) localStorage.setItem("token_expiry", data.tokenExpiry);
      if (data.userProfile) localStorage.setItem("user_profile", JSON.stringify(data.userProfile));
      toast.success("Logged in successfully");
      navigate("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      toast.error(msg);
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
              <CardDescription>Access your JusPredict account</CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button type="submit" disabled={loading} className="w-full">{loading ? "Logging in..." : "Login"}</Button>
                <a
                  href="https://api.predictyourgame.com/swagger-ui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground underline"
                >API Docs</a>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;