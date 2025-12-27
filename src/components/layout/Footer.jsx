function Footer() {
  return (
    // <footer className="mt-auto py-3 bg-body-tertiary border-top">
    //   <div className="container small text-muted flex-sm-row text-center ">
    //     <span>
    //       © {new Date().getFullYear()} PandeyFurniture. Crafted with{" "}
    //       <i className="bi bi-heart-fill text-primary"></i> for modern homes.
    //     </span>
    //   </div>
    // </footer>
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* Brand Info */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
            <h5 className="text-uppercase fw-bold mb-4">PandeyFurniture</h5>
            <p>
              Premium quality furniture crafted to bring comfort, style, and
              elegance to your home.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Quick Links</h6>
            <p>
              <a href="/shop" className="text-reset text-decoration-none">
                Shop
              </a>
            </p>
            <p>
              <a href="/categories" className="text-reset text-decoration-none">
                Categories
              </a>
            </p>
            <p>
              <a href="/about" className="text-reset text-decoration-none">
                About Us
              </a>
            </p>
            <p>
              <a href="/contact" className="text-reset text-decoration-none">
                Contact
              </a>
            </p>
          </div>

          {/* Customer Support */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Support</h6>
            <p>
              <a href="/faq" className="text-reset text-decoration-none">
                FAQ
              </a>
            </p>
            <p>
              <a
                href="/privacy-policy"
                className="text-reset text-decoration-none"
              >
                Privacy Policy
              </a>
            </p>
            <p>
              <a href="/terms" className="text-reset text-decoration-none">
                Terms & Conditions
              </a>
            </p>
            <p>
              <a href="/orders" className="text-reset text-decoration-none">
                My Orders
              </a>
            </p>
          </div>

          {/* Contact */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <i className="bi bi-geo-alt-fill me-2"></i>India
            </p>
            <p>
              <i className="bi bi-envelope-fill me-2"></i>
              support@pandeyfurniture.com
            </p>
            <p>
              <i className="bi bi-phone-fill me-2"></i>+91 1000000000
            </p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Bottom Footer */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8 text-center text-md-start">
            <span>
              © {new Date().getFullYear()} <strong>PandeyFurniture</strong>.
              Crafted with <i className="bi bi-heart-fill text-danger"></i> for
              beautiful homes.
            </span>
          </div>

          {/* Social Media */}
          <div className="col-md-5 col-lg-4 text-center text-md-end">
            <a
              href="https://facebook.com"
              target="_blank"
              className="text-reset me-3"
            >
              <i className="bi bi-facebook fs-5"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-reset me-3"
            >
              <i className="bi bi-instagram fs-5"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-reset me-3"
            >
              <i className="bi bi-twitter-x fs-5"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              className="text-reset"
            >
              <i className="bi bi-youtube fs-5"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
