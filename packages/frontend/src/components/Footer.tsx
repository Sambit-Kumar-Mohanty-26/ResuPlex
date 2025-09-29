import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: 'Features', href: '/features' },
      { name: 'Templates', href: '/templates' },
      { name: 'Pricing', href: '/pricing' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-gray-600 max-w-xs">
              The AI-powered resume builder that gives you the unfair advantage to transform your career.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:col-span-3">
            <div>
              <h4 className="font-semibold text-gray-800">Product</h4>
              <ul className="mt-4 space-y-2">
                {footerLinks.Product.map(link => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-600 hover:text-indigo-600">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Company</h4>
              <ul className="mt-4 space-y-2">
                {footerLinks.Company.map(link => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-600 hover:text-indigo-600">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Legal</h4>
              <ul className="mt-4 space-y-2">
                {footerLinks.Legal.map(link => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-600 hover:text-indigo-600">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ResuPlex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;