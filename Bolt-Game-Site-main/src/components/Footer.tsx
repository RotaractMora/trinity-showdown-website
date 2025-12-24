import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-primary/20 mt-20" id={'footer'}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-8">
          {/* Brand */}
          <div className="space-y-4 text-center">
            <h3 className="text-2xl font-heading font-black text-gradient-primary">
              TRINITY SHOWDOWN
            </h3>
            <p className="text-muted-foreground text-sm">
              The ultimate mobile gaming tournament experience
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2 pl-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#games" className="text-muted-foreground hover:text-primary transition-colors">
                  Games
                </a>
              </li>
              <li>
                <a href="#teams" className="text-muted-foreground hover:text-primary transition-colors">
                  Teams
                </a>
              </li>
              <li>
                <a href="#rules" className="text-muted-foreground hover:text-primary transition-colors">
                  Rules
                </a>
              </li>
            </ul>
          </div>

          {/* Tournament Info */}
          <div>
            <h4 className="font-heading font-bold text-primary mb-4">Tournament</h4>
            <ul className="space-y-2 pl-2">
              <li>
                <a href="#register" className="text-muted-foreground hover:text-primary transition-colors">
                  Register
                </a>
              </li>
              <li>
                <a href="#games" className="text-muted-foreground hover:text-primary transition-colors">
                  Prize Pool
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading font-bold text-primary mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#footer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#footer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#footer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#footer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
              <a
                href="#footer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>
            © {currentYear} Mora eSports Club & Rotaract Club of University of Moratuwa. All rights reserved.
            <span 
              onClick={() => navigate('/admin/login')} 
              className="cursor-default opacity-0 hover:opacity-100 transition-opacity"
              title="Admin Access"
            >
              .
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
