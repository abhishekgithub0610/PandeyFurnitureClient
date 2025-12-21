// function Carousel() {
//   return (
//     <>
//       {/* Add floating animation styles */}
//       <style>
//         {`
//           @keyframes float {
//             0%, 100% { transform: translateY(0px); }
//             50% { transform: translateY(-20px); }
//           }
//           @keyframes pulse {
//             0%, 100% { opacity: 0.4; }
//             50% { opacity: 0.8; }
//           }
//         `}
//       </style>

//       <div
//         id="heroCarousel"
//         className="carousel slide mb-4"
//         data-bs-ride="carousel"
//         data-bs-interval="6000"
//       >
//         <div className="carousel-indicators">
//           <button
//             type="button"
//             data-bs-target="#heroCarousel"
//             data-bs-slide-to="0"
//             className="active"
//             aria-current="true"
//             aria-label="Slide 1"
//           ></button>
//           <button
//             type="button"
//             data-bs-target="#heroCarousel"
//             data-bs-slide-to="1"
//             aria-label="Slide 2"
//           ></button>
//           <button
//             type="button"
//             data-bs-target="#heroCarousel"
//             data-bs-slide-to="2"
//             aria-label="Slide 3"
//           ></button>
//         </div>

//         <div className="carousel-inner">
//           {/* First Slide - Fresh Food Theme */}
//           <div className="carousel-item active">
//             <div
//               className="py-5 d-flex align-items-center"
//               style={{
//                 minHeight: "600px",
//                 height: "600px",
//                 background:
//                   "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 25%, #ff6b6b 50%, #d63031 75%, #b33939 100%)",
//                 position: "relative",
//               }}
//             >
//               {/* Animated floating elements */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "10%",
//                   right: "10%",
//                   width: "100px",
//                   height: "100px",
//                   background: "rgba(255, 193, 7, 0.1)",
//                   borderRadius: "50%",
//                   filter: "blur(20px)",
//                   animation: "float 6s ease-in-out infinite",
//                 }}
//               ></div>
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "20%",
//                   left: "15%",
//                   width: "60px",
//                   height: "60px",
//                   background: "rgba(40, 167, 69, 0.1)",
//                   borderRadius: "50%",
//                   filter: "blur(15px)",
//                   animation: "float 4s ease-in-out infinite reverse",
//                 }}
//               ></div>

//               {/* Subtle overlay */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   background: "rgba(0,0,0,0.1)",
//                   pointerEvents: "none",
//                 }}
//               ></div>

//               <div className="container h-100">
//                 <div className="row align-items-center w-100 h-100">
//                   <div className="col-lg-7">
//                     <div className="mb-4">
//                       <span className="badge bg-gradient bg-warning fs-6 px-3 py-2 rounded-pill">
//                         <i className="bi bi-fire me-2"></i>Fresh & Hot
//                       </span>
//                     </div>
//                     <h1 className="display-2 fw-bold mb-4 text-white">
//                       Savor Every
//                       <span className="d-block text-warning fst-italic">
//                         Bite
//                       </span>
//                     </h1>
//                     <p className="lead mb-4 text-white-50 fs-4">
//                       Experience culinary excellence with our carefully crafted
//                       dishes.
//                       <span className="text-warning fw-semibold">
//                         Made fresh daily
//                       </span>
//                       , served with passion.
//                     </p>

//                     {/* Feature highlights */}
//                     <div className="row mb-4">
//                       <div className="col-md-6 mb-2">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-check-circle-fill text-success me-2"></i>
//                           <small className="text-white-50">
//                             Fresh Ingredients Daily
//                           </small>
//                         </div>
//                       </div>
//                       <div className="col-md-6 mb-2">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-check-circle-fill text-success me-2"></i>
//                           <small className="text-white-50">
//                             Quick Pickup Service
//                           </small>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="d-flex gap-3 flex-wrap">
//                       <a
//                         href="#menu"
//                         className="btn btn-warning btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg"
//                         style={{
//                           background:
//                             "linear-gradient(45deg, #ffc107, #ffb300)",
//                           border: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                       >
//                         <i className="bi bi-basket me-2"></i>Order Now
//                       </a>
//                     </div>
//                   </div>

//                   <div className="col-lg-5 d-none d-lg-block text-center">
//                     <div className="position-relative">
//                       {/* Main feature card */}
//                       <div
//                         className="card bg-gradient shadow-lg border-0"
//                         style={{
//                           background: "rgba(255, 255, 255, 0.1)",
//                           backdropFilter: "blur(10px)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                         }}
//                       >
//                         <div className="card-body p-5 text-center">
//                           <div className="mb-4">
//                             <i className="bi bi-cup-hot display-1 text-warning"></i>
//                           </div>
//                           <h3 className="text-white mb-3">Fresh & Delicious</h3>
//                           <p className="text-white-50 mb-4">
//                             Every dish is prepared with the freshest ingredients
//                             and utmost care
//                           </p>
//                           <div className="row text-center">
//                             <div className="col-6">
//                               <div className="border-end border-light border-opacity-25">
//                                 <h4 className="text-warning mb-0">50+</h4>
//                                 <small className="text-white-50">Dishes</small>
//                               </div>
//                             </div>
//                             <div className="col-6">
//                               <h4 className="text-warning mb-0">15min</h4>
//                               <small className="text-white-50">
//                                 Pickup Time
//                               </small>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Second Slide - Quality Food Theme */}
//           <div className="carousel-item">
//             <div
//               className="py-5 d-flex align-items-center"
//               style={{
//                 minHeight: "600px",
//                 height: "600px",
//                 background:
//                   "linear-gradient(135deg, #28a745 0%, #20c997 50%, #17a2b8 100%)",
//                 position: "relative",
//               }}
//             >
//               {/* Animated floating elements */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "15%",
//                   left: "10%",
//                   width: "80px",
//                   height: "80px",
//                   background: "rgba(255, 193, 7, 0.15)",
//                   borderRadius: "50%",
//                   filter: "blur(15px)",
//                   animation: "pulse 4s ease-in-out infinite",
//                 }}
//               ></div>
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "10%",
//                   right: "20%",
//                   width: "120px",
//                   height: "120px",
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "50%",
//                   filter: "blur(25px)",
//                   animation: "float 5s ease-in-out infinite",
//                 }}
//               ></div>

//               {/* Overlay for better text readability */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   background: "rgba(0,0,0,0.2)",
//                   pointerEvents: "none",
//                 }}
//               ></div>

//               <div className="container h-100">
//                 <div className="row align-items-center w-100 h-100">
//                   <div className="col-lg-7">
//                     <div className="mb-4">
//                       <span className="badge bg-success text-white fs-6 px-3 py-2 rounded-pill">
//                         <i className="bi bi-shield-check me-2"></i>Quality
//                         Guaranteed
//                       </span>
//                     </div>
//                     <h1 className="display-2 fw-bold mb-4 text-white">
//                       Premium
//                       <span className="d-block text-warning fst-italic">
//                         Cuisine
//                       </span>
//                     </h1>
//                     <p className="lead mb-4 text-white fs-4">
//                       Every dish is prepared with the finest ingredients and
//                       culinary expertise.
//                       <span className="text-warning fw-semibold">
//                         Taste the difference
//                       </span>{" "}
//                       in every bite.
//                     </p>

//                     {/* Feature highlights */}
//                     <div className="row mb-4">
//                       <div className="col-md-6 mb-2">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-award-fill text-warning me-2"></i>
//                           <small className="text-white-50">
//                             Chef's Special Recipes
//                           </small>
//                         </div>
//                       </div>
//                       <div className="col-md-6 mb-2">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-star-fill text-warning me-2"></i>
//                           <small className="text-white-50">
//                             5-Star Customer Rating
//                           </small>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="d-flex gap-3 flex-wrap">
//                       <a
//                         href="#menu"
//                         className="btn btn-success btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg"
//                         style={{
//                           background:
//                             "linear-gradient(45deg, #28a745, #20c997)",
//                           border: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                       >
//                         <i className="bi bi-star me-2"></i>View Menu
//                       </a>
//                     </div>
//                   </div>

//                   <div className="col-lg-5 d-none d-lg-block text-center">
//                     <div className="position-relative">
//                       {/* Main feature card */}
//                       <div
//                         className="card bg-gradient shadow-lg border-0"
//                         style={{
//                           background: "rgba(255, 255, 255, 0.1)",
//                           backdropFilter: "blur(10px)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                         }}
//                       >
//                         <div className="card-body p-5 text-center">
//                           <div className="mb-4">
//                             <i className="bi bi-award display-1 text-warning"></i>
//                           </div>
//                           <h3 className="text-white mb-3">Award Winning</h3>
//                           <p className="text-white-50 mb-4">
//                             Recognized for excellence in taste and quality by
//                             food critics
//                           </p>
//                           <div className="row text-center">
//                             <div className="col-6">
//                               <div className="border-end border-light border-opacity-25">
//                                 <h4 className="text-warning mb-0">98%</h4>
//                                 <small className="text-white-50">
//                                   Happy Customers
//                                 </small>
//                               </div>
//                             </div>
//                             <div className="col-6">
//                               <h4 className="text-warning mb-0">5★</h4>
//                               <small className="text-white-50">
//                                 Average Rating
//                               </small>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Third Slide - Chef's Special Theme */}
//           <div className="carousel-item">
//             <div
//               className="py-5 d-flex align-items-center"
//               style={{
//                 minHeight: "600px",
//                 height: "600px",
//                 background:
//                   "linear-gradient(135deg, #fd7e14 0%, #e83e8c 50%, #6f42c1 100%)",
//                 position: "relative",
//               }}
//             >
//               {/* Animated floating elements */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "20%",
//                   right: "15%",
//                   width: "90px",
//                   height: "90px",
//                   background: "rgba(255, 193, 7, 0.2)",
//                   borderRadius: "50%",
//                   filter: "blur(18px)",
//                   animation: "float 7s ease-in-out infinite",
//                 }}
//               ></div>
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "15%",
//                   left: "10%",
//                   width: "70px",
//                   height: "70px",
//                   background: "rgba(255, 255, 255, 0.15)",
//                   borderRadius: "50%",
//                   filter: "blur(12px)",
//                   animation: "pulse 3s ease-in-out infinite",
//                 }}
//               ></div>

//               {/* Overlay for better text readability */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   background: "rgba(0,0,0,0.3)",
//                   pointerEvents: "none",
//                 }}
//               ></div>

//               <div className="container h-100">
//                 <div className="row align-items-center w-100 h-100">
//                   <div className="col-lg-7">
//                     <div className="mb-4">
//                       <span className="badge bg-light  fs-6 px-3 py-2 rounded-pill">
//                         <i className="bi bi-chef-hat me-2"></i>Chef's Special
//                       </span>
//                     </div>
//                     <h1 className="display-2 fw-bold mb-4 text-white">
//                       Culinary
//                       <span className="d-block text-warning fst-italic">
//                         Excellence
//                       </span>
//                     </h1>
//                     <p className="lead mb-4 text-white fs-4">
//                       Discover our signature dishes crafted by master chefs with
//                       years of experience.
//                       <span className="text-warning fw-semibold">
//                         Each dish tells a story
//                       </span>{" "}
//                       of passion and tradition.
//                     </p>

//                     {/* Feature highlights */}
//                     <div className="row mb-4">
//                       <div className="col-md-6 mb-2">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-chef-hat-fill text-warning me-2"></i>
//                           <small className="text-white-50">
//                             Master Chef Prepared
//                           </small>
//                         </div>
//                       </div>
//                       <div className="col-md-6 mb-2">
//                         <div className="d-flex align-items-center">
//                           <i className="bi bi-heart-fill text-warning me-2"></i>
//                           <small className="text-white-50">
//                             Made with Passion
//                           </small>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="d-flex gap-3 flex-wrap">
//                       <a
//                         href="#menu"
//                         className="btn btn-light btn-lg rounded-pill px-5 py-3  fw-bold shadow-lg"
//                         style={{
//                           background:
//                             "linear-gradient(45deg, #ffffff, #f8f9fa)",
//                           border: "none",
//                           transition: "all 0.3s ease",
//                         }}
//                       >
//                         <i className="bi bi-chef-hat me-2"></i>Try Our Specials
//                       </a>
//                     </div>
//                   </div>

//                   <div className="col-lg-5 d-none d-lg-block text-center">
//                     <div className="position-relative">
//                       {/* Main feature card */}
//                       <div
//                         className="card bg-gradient shadow-lg border-0"
//                         style={{
//                           background: "rgba(255, 255, 255, 0.1)",
//                           backdropFilter: "blur(10px)",
//                           border: "1px solid rgba(255, 255, 255, 0.2)",
//                         }}
//                       >
//                         <div className="card-body p-5 text-center">
//                           <div className="mb-4">
//                             <i className="bi bi-chef-hat display-1 text-warning"></i>
//                           </div>
//                           <h3 className="text-white mb-3">Expert Chefs</h3>
//                           <p className="text-white-50 mb-4">
//                             Our skilled chefs bring years of culinary expertise
//                             to every dish
//                           </p>
//                           <div className="row text-center">
//                             <div className="col-6">
//                               <div className="border-end border-light border-opacity-25">
//                                 <h4 className="text-warning mb-0">20+</h4>
//                                 <small className="text-white-50">
//                                   Specialties
//                                 </small>
//                               </div>
//                             </div>
//                             <div className="col-6">
//                               <h4 className="text-warning mb-0">♨</h4>
//                               <small className="text-white-50">
//                                 Served Hot
//                               </small>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#heroCarousel"
//           data-bs-slide="prev"
//         >
//           <span
//             className="carousel-control-prev-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#heroCarousel"
//           data-bs-slide="next"
//         >
//           <span
//             className="carousel-control-next-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </>
//   );
// }

// export default Carousel;

function Carousel() {
  return (
    <>
      {/* Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
        `}
      </style>

      <div
        id="heroCarousel"
        className="carousel slide mb-4"
        data-bs-ride="carousel"
        data-bs-interval="6000"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            data-bs-target="#heroCarousel"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
          <button data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        </div>

        <div className="carousel-inner">
          {/* SLIDE 1 – Living Room */}
          <div className="carousel-item active">
            <div
              className="py-5 d-flex align-items-center"
              style={{
                height: "600px",
                background:
                  "linear-gradient(135deg, #2c3e50, #34495e, #2c3e50)",
                position: "relative",
              }}
            >
              {/* Floating shapes */}
              <div
                style={{
                  position: "absolute",
                  top: "15%",
                  right: "10%",
                  width: "120px",
                  height: "120px",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "50%",
                  filter: "blur(20px)",
                  animation: "float 6s infinite",
                }}
              />

              <div className="container h-100">
                <div className="row align-items-center h-100">
                  <div className="col-lg-7">
                    <span className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill">
                      Premium Collection
                    </span>

                    <h1 className="display-3 fw-bold text-white mb-4">
                      Redefine Your
                      <span className="d-block text-warning fst-italic">
                        Living Space
                      </span>
                    </h1>

                    <p className="lead text-white-50 fs-4 mb-4">
                      Discover elegant sofas, tables, and décor crafted for
                      comfort and timeless style.
                    </p>

                    <div className="d-flex gap-3">
                      <a
                        href="#products"
                        className="btn btn-warning btn-lg rounded-pill px-5 fw-bold"
                      >
                        Shop Living Room
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-5 d-none d-lg-block">
                    <div className="card bg-transparent border-light border-opacity-25 shadow-lg">
                      <div className="card-body p-5 text-center">
                        <i className="bi bi-house-door display-1 text-warning mb-3"></i>
                        <h4 className="text-white">Modern Comfort</h4>
                        <p className="text-white-50">
                          Sofas, coffee tables & TV units
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 2 – Bedroom */}
          <div className="carousel-item">
            <div
              className="py-5 d-flex align-items-center"
              style={{
                height: "600px",
                background:
                  "linear-gradient(135deg, #6f1e51, #b53471, #833471)",
                position: "relative",
              }}
            >
              <div className="container h-100">
                <div className="row align-items-center h-100">
                  <div className="col-lg-7">
                    <span className="badge bg-light text-dark mb-3 px-3 py-2 rounded-pill">
                      Bedroom Essentials
                    </span>

                    <h1 className="display-3 fw-bold text-white mb-4">
                      Sleep in
                      <span className="d-block text-warning fst-italic">
                        Luxury
                      </span>
                    </h1>

                    <p className="lead text-white fs-4 mb-4">
                      Premium beds, wardrobes and mattresses designed for
                      restful nights.
                    </p>

                    <a
                      href="#products"
                      className="btn btn-light btn-lg rounded-pill px-5 fw-bold"
                    >
                      Explore Bedroom
                    </a>
                  </div>

                  <div className="col-lg-5 d-none d-lg-block">
                    <div className="card bg-transparent border-light border-opacity-25 shadow-lg">
                      <div className="card-body p-5 text-center">
                        <i className="bi bi-moon-stars display-1 text-warning mb-3"></i>
                        <h4 className="text-white">Rest & Relax</h4>
                        <p className="text-white-50">
                          Designed for comfort & durability
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 3 – Office */}
          <div className="carousel-item">
            <div
              className="py-5 d-flex align-items-center"
              style={{
                height: "600px",
                background:
                  "linear-gradient(135deg, #1e3799, #4a69bd, #1e3799)",
                position: "relative",
              }}
            >
              <div className="container h-100">
                <div className="row align-items-center h-100">
                  <div className="col-lg-7">
                    <span className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill">
                      Work From Home
                    </span>

                    <h1 className="display-3 fw-bold text-white mb-4">
                      Smart Office
                      <span className="d-block text-warning fst-italic">
                        Furniture
                      </span>
                    </h1>

                    <p className="lead text-white fs-4 mb-4">
                      Ergonomic chairs and desks that boost productivity and
                      comfort.
                    </p>

                    <a
                      href="#products"
                      className="btn btn-warning btn-lg rounded-pill px-5 fw-bold"
                    >
                      Shop Office
                    </a>
                  </div>

                  <div className="col-lg-5 d-none d-lg-block">
                    <div className="card bg-transparent border-light border-opacity-25 shadow-lg">
                      <div className="card-body p-5 text-center">
                        <i className="bi bi-laptop display-1 text-warning mb-3"></i>
                        <h4 className="text-white">Ergonomic Design</h4>
                        <p className="text-white-50">
                          Built for long working hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
}

export default Carousel;
