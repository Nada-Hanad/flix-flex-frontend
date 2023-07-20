import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <footer className="bg-darkBlue py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-white text-2xl font-bold mb-4">FlixFlex</h3>
            <p className="text-gray-400">
              Explore the latest movies and TV series. Sign up now and start
              watching!
            </p>
          </div>
          <div className="md:w-1/3">
            <h4 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h4>
            <ul className="text-gray-400">
              <li className="mb-2">Email: info@flixflex.com</li>
              <li className="mb-2">Phone: 123-456-7890</li>
              <li className="mb-2">Address: 123 Main St, City, Country</li>
            </ul>
          </div>
          <div className="md:w-1/3">
            <h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FacebookIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <InstagramIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
        <hr className="border-gray-600 my-6" />
        <p className="text-gray-400 text-center">
          &copy; {new Date().getFullYear()} FlixFlex. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
