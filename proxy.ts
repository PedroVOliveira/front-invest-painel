import { withAuth } from "next-auth/middleware";
import { ROUTES } from "@/constants/routes";

export const proxy = withAuth({
  pages: {
    signIn: ROUTES.LOGIN,
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};

export default proxy;
