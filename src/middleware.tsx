import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@clerk/backend";
// import { ipAddress } from "@vercel/functions";

// const ALLOWED_IPS = [
//   "::ffff:192.168.1.6",
//   // "10.0.2.2", // Common Android emulator IP
// ];

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/get-started",
  "/downloads",
  "/api/payment/webhook",
]);

const isSignInSignUpRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

async function handleAPIAuthentication(req: NextRequest, auth: any) {
  // const ip = ipAddress(req) || req.headers.get("x-forwarded-for") || "";
  // console.log(ip);

  // if (req.nextUrl.pathname.startsWith("/api/")) {
  //   if (ALLOWED_IPS.includes(ip)) {
  //     return NextResponse.next();
  //   }
  //   return new NextResponse("Access denied", { status: 403 });
  // }
  const authHeader = req.headers.get("authorization");

  // Mobile app request with Bearer token
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const verifiedToken = await verifyToken(token, {
        jwtKey: process.env.CLERK_JWT_KEY,
      });

      if (verifiedToken) {
        // Add user info to headers for API routes to use
        const response = NextResponse.next();
        response.headers.set("x-user-id", verifiedToken.sub);
        response.headers.set("x-auth-type", "bearer");
        return response;
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      return new NextResponse("Invalid token", { status: 401 });
    }
  }

  // Web app request with Clerk session
  const { userId } = await auth();
  if (userId) {
    const response = NextResponse.next();
    response.headers.set("x-user-id", userId);
    response.headers.set("x-auth-type", "session");
    return response;
  }

  return new NextResponse("Unauthorized", { status: 401 });
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Handle API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return await handleAPIAuthentication(req, auth);
  }

  const { userId, sessionClaims, redirectToSignIn } = await auth();
  // If the user is logged in and the route is sign-in or sign-up, redirect to the dashboard.
  if (userId && isSignInSignUpRoute(req))
    return NextResponse.redirect(new URL("/dashboard", req.url));
  // For users visiting /onboarding, don't try to redirect
  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next();
  }
  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL("/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }
  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(req)) return NextResponse.next();
  // If the user is logged in and the route is protected and the onboarding is false, redirect to onboarding.
  if (
    userId &&
    !isPublicRoute(req) &&
    !sessionClaims?.metadata?.onboardingComplete
  )
    return NextResponse.redirect(new URL("/onboarding", req.url));
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
