import Link from "next/link";
import "./footer.css";

import { routes } from "@/app/constants";

export default function Footer() {
  return (
    <div className="layout-footer">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="footer">
        <div className="footer-wrapper">
          <div className="footer-flex-1">
            <div className="footer-links">
              {routes.map((route, index: number) => (
                <Link key={index} href={route.route} className="footer-link">
                  {route.name}
                </Link>
              ))}
            </div>
            <div className="footer-socials">
              <a href="#" target="_blank" className="fa fa-facebook"></a>
              <a href="#" target="_blank" className="fa fa-instagram"></a>
              <a href="#" target="_blank" className="fa fa-linkedin"></a>
              <a href="#" target="_blank" className="fa fa-envelope"></a>
            </div>
            <div className="footer-legal">
              <p>
                Company Registration Number: 15228068 | All rights reserved
                Stellar Recruitment
              </p>
              <p className="footer-copyright">
                Copyright &copy;{" "}
                <a href={`mailto:${process.env.NEXT_PUBLIC_DEV_EMAIL}`}>
                  Ranj Sidhu 2024
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
