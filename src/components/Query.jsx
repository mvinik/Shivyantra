// import React from "react";

// const FreeDeliveryProgress = ({ cartTotal }) => {
//   const freeDeliveryThreshold = 5000; // Set free delivery limit
//   const progress = Math.min((cartTotal / freeDeliveryThreshold) * 100, 100);
//   const remaining = freeDeliveryThreshold - cartTotal;

//   return (
//     <div className="w-full bg-gray-200 rounded-lg p-3">
//       <p className="text-sm font-medium mb-2">
//         {cartTotal >= freeDeliveryThreshold
//           ? "🎉 Free Delivery Unlocked!"
//           : `Spend ₹${remaining} more for Free Delivery`}
//       </p>
//       <div className="w-full bg-gray-300 rounded-full h-3">
//         <div
//           className="bg-green-500 h-3 rounded-full transition-all duration-500"
//           style={{ width: `${progress}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default FreeDeliveryProgress;
