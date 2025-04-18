import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await forgotPassword(email);

      if (success) {
        setIsSubmitted(true);
        toast({
          title: "Reset Email Sent",
          description: "Check your email for a link to reset your password.",
          variant: "default",
        });
      } else {
        toast({
          title: "Request Failed",
          description: "Unable to send reset email. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast({
        title: "Request Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your email to receive a password reset link"
    >
      {isSubmitted ? (
        <div className="space-y-6">
          <div className="bg-primary/10 p-6 rounded-lg text-center">
            <CheckCircle className="h-12 w-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Check your email</h3>
            <p className="text-muted-foreground">
              We've sent a password reset link to <strong>{email}</strong>.
              Please check your inbox and follow the instructions to reset your password.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Send Again
            </Button>

            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link
                to={ROUTES.LOGIN}
                className="text-primary font-medium hover:text-primary/90"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className={error ? "border-destructive" : ""}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="text-primary font-medium hover:text-primary/90"
            >
              Back to login
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
