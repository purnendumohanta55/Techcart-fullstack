// import { useEffect, useState } from "react";

// function Home() {
//   const categories = ["Smartphones", "Watches", "Cameras", "Laptops", "Headsets"];

//   const [currentCategory, setCurrentCategory] = useState(categories[0]);
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);

//   const [totalPages, setTotalPages] = useState(1);
//   const [next, setNext] = useState(null);
//   const [previous, setPrevious] = useState(null);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:8000/api/products/products/?category=${currentCategory}&page=${page}`
//       );

//       const data = await res.json();
//       console.log("API DATA:", data);

//       setProducts(data.results || []);
//       setNext(data.next);
//       setPrevious(data.previous);

//       const total = data.count || 0;
//       setTotalPages(Math.ceil(total / 6));
//     } catch (err) {
//       console.log("Fetch error:", err);
//       setProducts([]);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [currentCategory, page]);

//   // ✅ Add to Cart function
//   const addToCart = async (productId) => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/cart/add_item/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ product_id: productId }),
//       });

//       const data = await res.json();
//       console.log("CART RESPONSE:", data);

//       alert("Added to cart 🛒");
//     } catch (err) {
//       console.log("Cart error:", err);
//     }
//   };

//   // Pagination
//   const handlePrev = () => {
//     if (previous) {
//       setPage((prev) => prev - 1);
//     }
//   };

//   const handleNext = () => {
//     if (next) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   return (
//     <div>
//       <h1>Products</h1>

//       {/* 🔥 Go to Cart */}
//       <button
//         onClick={() => (window.location.href = "/cart")}
//         style={{ marginBottom: "20px" }}
//       >
//         Go to Cart 🛒
//       </button>

//       {/* Category buttons */}
//       <div style={{ marginBottom: "20px" }}>
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => {
//               setCurrentCategory(cat);
//               setPage(1);
//               setProducts([]);
//             }}
//             style={{
//               marginRight: "10px",
//               backgroundColor: cat === currentCategory ? "#4CAF50" : "#f0f0f0",
//               color: cat === currentCategory ? "white" : "black",
//             }}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Page info */}
//       <p>Page: {page} / {totalPages}</p>

//       {/* Products */}
//       {products.length === 0 ? (
//         <p>No products in this category.</p>
//       ) : (
//         <div style={{ display: "flex", flexWrap: "wrap" }}>
//           {products.map((p) => {
//             const imageUrl = p.image
//               ? p.image.startsWith("http")
//                 ? p.image
//                 : `http://127.0.0.1:8000${p.image}`
//               : "/default.jpg";

//             return (
//               <div
//                 key={p.id}
//                 style={{
//                   border: "1px solid black",
//                   margin: "10px",
//                   padding: "10px",
//                   width: "200px",
//                 }}
//               >
//                 <h3>{p.name}</h3>
//                 <p>Price: ₹{p.price}</p>
//                 <p>Stock: {p.stock}</p>
//                 <p>{p.description}</p>
//                 <img src={imageUrl} alt={p.name} width="120" />

//                 {/* 🔥 ADD TO CART BUTTON */}
//                 <button
//                   onClick={() => addToCart(p.id)}
//                   style={{ marginTop: "10px" }}
//                 >
//                   Add to Cart 🛒
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Pagination */}
//       <div style={{ marginTop: "20px" }}>
//         <button onClick={handlePrev} disabled={!previous}>
//           Prev
//         </button>

//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setPage(i + 1)}
//             style={{
//               margin: "0 5px",
//               fontWeight: page === i + 1 ? "bold" : "normal",
//               backgroundColor: page === i + 1 ? "#4CAF50" : "#eee",
//             }}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button onClick={handleNext} disabled={!next}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Home;





import { useEffect, useState } from "react";

function Home() {
  const categories = ["Smartphones", "Watches", "Cameras", "Laptops", "Headsets"];

  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  // ✅ FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/products/products/?category=${currentCategory}&page=${page}`
      );

      const data = await res.json();
      console.log("API DATA:", data);

      setProducts(data.results || []);
      setNext(data.next);
      setPrevious(data.previous);

      const total = data.count || 0;
      setTotalPages(Math.ceil(total / 6));
    } catch (err) {
      console.log("Fetch error:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentCategory, page]);

  // ✅ ADD TO CART (MATCHES YOUR BACKEND)
  const addToCart = async (productId) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      const data = await res.json();
      console.log("CART RESPONSE:", data);

      alert("Added to cart 🛒");
    } catch (err) {
      console.log("Cart error:", err);
      alert("Error adding to cart ❌");
    }
  };

  // ✅ PAGINATION
  const handlePrev = () => {
    if (previous) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (next) setPage((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Products</h1>

      {/* 🔥 GO TO CART */}
      <button
        onClick={() => (window.location.href = "/cart")}
        style={{ marginBottom: "20px" }}
      >
        Go to Cart 🛒
      </button>

      {/* ✅ CATEGORY BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCurrentCategory(cat);
              setPage(1);
              setProducts([]);
            }}
            style={{
              marginRight: "10px",
              backgroundColor: cat === currentCategory ? "#4CAF50" : "#f0f0f0",
              color: cat === currentCategory ? "white" : "black",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ PAGE INFO */}
      <p>Page: {page} / {totalPages}</p>

      {/* ✅ PRODUCTS */}
      {products.length === 0 ? (
        <p>No products in this category.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((p) => {
            const imageUrl = p.image
              ? p.image.startsWith("http")
                ? p.image
                : `http://127.0.0.1:8000${p.image}`
              : "/default.jpg";

            return (
              <div
                key={p.id}
                style={{
                  border: "1px solid black",
                  margin: "10px",
                  padding: "10px",
                  width: "200px",
                }}
              >
                <h3>{p.name}</h3>
                <p>Price: ₹{p.price}</p>
                <p>Stock: {p.stock}</p>
                <img src={imageUrl} alt={p.name} width="120" />

                {/* 🔥 ADD TO CART */}
                <button
                  onClick={() => addToCart(p.id)}
                  style={{ marginTop: "10px" }}
                >
                  Add to Cart 🛒
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ PAGINATION */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={!previous}>
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              margin: "0 5px",
              fontWeight: page === i + 1 ? "bold" : "normal",
              backgroundColor: page === i + 1 ? "#4CAF50" : "#eee",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={handleNext} disabled={!next}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;