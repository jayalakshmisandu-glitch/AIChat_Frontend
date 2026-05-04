import { FcGoogle } from "react-icons/fc";

import { Button } from "./button";
import { Input } from "./input";

const Signup1 = ({
  heading,
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-wordmark.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "#",
}) => {
  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border px-6 py-12 shadow-md">
          
          {/* Logo + Heading */}
          <div className="flex flex-col items-center gap-y-2">
            <div className="flex items-center gap-1 lg:justify-start">
              <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-10 dark:invert"
                />
              </a>
            </div>
            {heading && (
              <h1 className="text-3xl font-semibold">{heading}</h1>
            )}
          </div>

          {/* Form */}
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-4">
              
              <Input
                type="email"
                placeholder="Email"
                required
              />

              <Input
                type="password"
                placeholder="Password"
                required
              />

              <Button type="submit" className="mt-2 w-full">
                {signupText}
              </Button>

              <Button variant="outline" className="w-full">
                <FcGoogle className="mr-2 size-5" />
                {googleText}
              </Button>

            </div>
          </div>

          {/* Login link */}
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{loginText}</p>
            <a
              href={loginUrl}
              className="text-primary font-medium hover:underline"
            >
              Login
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export { Signup1 };