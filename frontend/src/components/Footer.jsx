import React from 'react';
import YoutubeIcon from '../assets/youtube.svg';
import LinkedinIcon from '../assets/linkedin.svg';
import XIcon from '../assets/x.svg';
import FacebookIcon from '../assets/facebook.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-around ">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold"> Indian Institute Of Information Technology, Nagpur</h3>
            <p className="text-sm">Address: Survey No. 140 - 141/1, Off, Adilabad - Nagpur Rd, Waranga</p>
            <p className="text-sm">Maharashtra 441108</p>
            <p className="text-sm">Phone: +91 9405215010</p>
            <p className="text-sm">Email: registrar.iiitn.ac.in</p>
          </div>

          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Directions</h3>
            <div className='w-5/6'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13261.0528503578!2d79.01017815670704!3d20.94604665254893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0529518230f%3A0x45b76be0621cbb88!2sIndian%20Institute%20of%20Information%20Technology%2C%20Nagpur%20(IIITN)!5e0!3m2!1sen!2sin!4v1729957031614!5m2!1sen!2sin"
                style={{ border: '0' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Useful Links</h3>
            <ul className="text-sm">
              <div className="flex gap-4 items-center">
                <a
                  className="w-8 transition-all duration-300"
                  href="https://www.facebook.com/IIITNagpur"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={FacebookIcon} alt="facebook icon" />
                </a>
                <a
                  className="w-8 transition-all duration-300"
                  href="https://www.linkedin.com/in/iiitnofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={LinkedinIcon} alt="linkedin icon" />
                </a>
                <a
                  className="w-8 transition-all duration-300"
                  href="https://x.com/IIITN_OFFICIAL"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={XIcon} alt="x icon" />
                </a>
                <a
                  className="w-8 transition-all duration-300"
                  href="https://www.youtube.com/channel/UCcQEXD69BdMFyU8872dU2_A"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={YoutubeIcon} alt="youtube icon" />
                </a>
              </div>
            </ul>
          </div>

        </div>
      </div>
      <div className="text-center text-md font-semibold mt-4">
        © {new Date().getFullYear()} Indian Institute Of Information Technology, Nagpur . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
