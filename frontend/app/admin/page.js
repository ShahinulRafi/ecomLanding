import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProductsManager from "./ProductsManager";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h2>Access Denied</h2>
        <p>
          You must <a href="/admin/login">login</a> to access this page.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <ProductsManager />
    </div>
  );
}
