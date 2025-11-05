import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/login", "/sign-in", "/sign-up", "/about"],

  afterAuth(auth, req) {
    const url = req.nextUrl;

    if (!auth.userId) {
      return redirectToSignIn({ returnBackUrl: url.href });
    }

    const userRole = auth.sessionClaims?.metadata?.role || "employee";

    // Redirect signed-in users from login page
    if (["/login", "/sign-in", "/sign-up"].includes(url.pathname)) {
      const destination =
        userRole === "admin" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(destination, req.url));
    }

    // Protect admin area
    if (url.pathname.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Protect employee area
    if (url.pathname.startsWith("/dashboard") && userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};