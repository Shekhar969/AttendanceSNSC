// const CACHE_NAME = "attendance-web-cache-v1";

// const ASSETS_TO_CACHE = [
//     "/", 
//     "/index.html",
//     "/logo.webp",
//     "/homePageLogo.webp",
//     "/auth",
//     // "/App.js",
//     // "/App.css",
//     // "/main.js",
//     // "/index.css",
//     // "/copy.jsx",
//     // "/auth/login.jsx",
//     // "/auth/signUp.jsx",
//     // "/attendanceHistory/attendanceColour.css",
//     // "/attendanceHistory/lastMonthAttendance.jsx",
//     // "/subjects/BSC_CSIT/fifthSem",
//     // "/subjects/BSC_CSIT/firstSem",
//     // "/subjects/BSC_CSIT/seventhSem",
//     // "/subjects/BSC_CSIT/thirdSem",
//     // "/AssignmentHandler.jsx",
//     // "/attendanceHandler.jsx",
//     // "/classLinks.jsx",
//     // "/navBar.jsx",
//     // "/routing.jsx",
//     // "/student-details.jsx",
//     // "/verfiyIds.jsx",
//     // "/config/App.js",
//     // "/config/index.css",
//     // "/config/index.js",
//     // "/icons/logo.webp",
// ];


// self.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then((cache) => {
//             console.log("Caching all assets...");
//             return cache.addAll(ASSETS_TO_CACHE);
//         }).catch((error) => {
//             console.error("Cache failed: ", error);
//         })
//     );
// });


// self.addEventListener("activate", (event) => {
//     console.log("Service Worker activated!");
// });

// self.addEventListener("fetch", (event) => {
//     console.log("fetching")
// });
