// import prisma from "@/lib/prisma";

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);

//   const category = searchParams.get("category");
//   const minPrice = parseFloat(searchParams.get("minPrice"));
//   const maxPrice = parseFloat(searchParams.get("maxPrice"));

//   const where = {};

//   if (category) {
//     where.category = {
//       contains: category,
//       mode: "insensitive",
//     };
//   }

//   const priceFilter = {};
//   if (!isNaN(minPrice)) priceFilter.gte = minPrice;
//   if (!isNaN(maxPrice)) priceFilter.lte = maxPrice;
//   if (Object.keys(priceFilter).length > 0) {
//     where.price = priceFilter;
//   }

//   const products = await prisma.product.findMany({ where });

//   return new Response(JSON.stringify(products), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }



// // frontend/app/api/products/route.js
// import { fetchProducts, createProduct } from "@/../../backend/handlers/products";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const category = searchParams.get("category");
//     const minPrice = searchParams.get("minPrice");
//     const maxPrice = searchParams.get("maxPrice");

//     const products = await fetchProducts({ category, minPrice, maxPrice });

//     return new Response(JSON.stringify(products), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("GET /api/products error:", err);
//     return new Response("Failed to fetch products", { status: 500 });
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     console.log("Incoming product data:", body);

//     const product = await createProduct(body);

//     console.log("Product created:", product);

//     return new Response(JSON.stringify(product), {
//       status: 201,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error in POST /api/products:", error);
//     return new Response(`Failed to create product: ${error.message}`, { status: 500 });
//   }
// }


import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const minPrice = parseFloat(searchParams.get("minPrice"));
  const maxPrice = parseFloat(searchParams.get("maxPrice"));

  const where = {};

  if (category) {
    where.category = {
      contains: category,
      mode: "insensitive",
    };
  }

  const priceFilter = {};
  if (!isNaN(minPrice)) priceFilter.gte = minPrice;
  if (!isNaN(maxPrice)) priceFilter.lte = maxPrice;
  if (Object.keys(priceFilter).length > 0) {
    where.price = priceFilter;
  }

  const products = await prisma.product.findMany({ where });

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, image, price, category, rating = 5 } = body;

    // Validate required fields
    if (!name || !category) {
      return new Response("Missing required fields: name and category are required", { status: 400 });
    }

    // Validate and parse price
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return new Response("Invalid price value", { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        image: image || "",  // Default to empty string if missing
        price: parsedPrice,
        category,
        // rating is not in your Prisma schema, so exclude it here
      },
    });

    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in POST /api/products:", err);
    return new Response("Failed to create product", { status: 500 });
  }
}
