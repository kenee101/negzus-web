import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "http://192.168.1.146:8081",
  "https://negzus.vercel.app",
];

// For development, you might want to allow localhost
// if (process.env.NODE_ENV === "development") {
//   console.log("Development mode", process.env.NODE_ENV);
//   allowedOrigins.push("http://localhost:8081");
// }

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // const origin = request.headers.get("origin") || "";
    const response = NextResponse.next();

    response.headers.set("Access-Control-Allow-Origin", "*");

    // if (allowedOrigins.includes(origin)) {
    //   response.headers.set("Access-Control-Allow-Origin", origin);
    // }

    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    if (request.method === "OPTIONS") {
      const preflightHeaders = {
        // ...(allowedOrigins.includes(origin) && {
        //   "Access-Control-Allow-Origin": origin,
        // }),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      };
      return new NextResponse(null, { status: 204, headers: preflightHeaders });
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
