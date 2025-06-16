import { NextResponse } from "next/server";

let products = [
  { id: "1", name: "Sample Product 1" },
  { id: "2", name: "Sample Product 2" },
];

export async function PUT(request, { params }) {
  const id = params.id;
  const { name } = await request.json();

  products = products.map((p) => (p.id === id ? { ...p, name } : p));
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const id = params.id;
  products = products.filter((p) => p.id !== id);
  return NextResponse.json({ message: "Product deleted" }, { status: 204 });
}
