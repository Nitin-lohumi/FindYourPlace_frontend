import ClientLayoutWrapper from "./Searchcomponent/Wrapper";
import { Suspense } from "react";
export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientLayoutWrapper>
        <Suspense fallback={<>loading....</>}>{children}</Suspense>
      </ClientLayoutWrapper>
    </>
  );
}

// "use client";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import LayOutComp from "./Searchcomponent/LayOutComp";
// import useMedia from "use-media";
// import SidemenuMobile from "@/component/SidemenuMobile";
// function layout({ children }: { children: React.ReactNode }) {
//   const ismobile = useMedia({ maxWidth: 768 });
//   const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
//     null
//   );
//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       if (currentScrollY > lastScrollY) {
//         setScrollDirection("down");
//       } else if (currentScrollY < lastScrollY) {
//         setScrollDirection("up");
//       }
//       lastScrollY = currentScrollY;
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       {ismobile && (
//         <motion.div
//           initial={{ opacity: 0, x: -100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.9, ease: "easeInOut" }}
//           className={`fixed ${
//             scrollDirection == "down" ? "top-1" : "top-[66px]"
//           } inline`}
//         >
//           <motion.div className="inline">
//             <SidemenuMobile />
//           </motion.div>
//         </motion.div>
//       )}
//       <motion.div className="w-full max-w-[1100px] pl-5 pr-5 mx-auto overflow-hidden">
//         <motion.div className="md:h-[calc(100vh-66px)] flex flex-col md:grid md:grid-cols-4 ">
//           <motion.div
//             className={`md:col-span-1 h-full hidden md:block overflow-y-auto shadowcard rounded-lg p-2 bg-blue-950/30`}
//           >
//             <LayOutComp />
//           </motion.div>
//           <motion.div className="md:col-span-3 h-full overflow-y-auto flex flex-col">
//             {children}
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </>
//   );
// }

// export default layout;
