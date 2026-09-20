import { redirect } from "next/navigation";

// Mirrors Angular's app.routes.ts: { path: '', redirectTo: 'home', pathMatch: 'full' }
export default function RootPage(): never {
  redirect("/home");
}
