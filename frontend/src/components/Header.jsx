import React from 'react';
import { useNavigate } from 'react-router-dom';
import YoutubeIcon from '../assets/youtube.svg';
import LinkedinIcon from '../assets/linkedin.svg';
import XIcon from '../assets/x.svg';
import FacebookIcon from '../assets/facebook.svg';

const Header = () => {
    const navigate = useNavigate();

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Library", slug: "library-page", active: true },
        { name: "Certifications", slug: "/certifications-page", active: true },
        { name: "Grievances and Feedback", slug: "/grievances-feedback", active: true },
        { name: "Faculty", slug: "/faculty", active: true },
        { name: "Admissions", slug: "admission-form", active: true },
        { name: "Department and Courses", slug: "/department-and-courses", active: true },
    ];

    return (
        < >
            <header className="w-full py-1 bg-white flex justify-between items-center ">
                <div className="flex border border-slate-300">
                    {navItems.map((item) =>
                        item.active ? (
                            <li className="list-none" key={item.name}>
                                <button
                                    onClick={() => navigate(item.slug)}
                                    className="bg-slate-300 py-2 duration-300 hover:bg-slate-100 px-6"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                    )}


                </div>

                <div className="relative group list-none">
                    <button className="bg-yellow-400 rounded-md py-2 px-6 duration-300 hover:bg-yellow-500">
                        Login⮟
                    </button>
                    <div className="absolute hidden group-hover:block bg-yellow-200 shadow-lg border rounded-lg w-40">
                        <ul className="text-center py-2">
                            <li
                                className="hover:bg-slate-100 py-1 cursor-pointer"
                                onClick={() => navigate('/student-login')}
                            >
                                Login as Student
                            </li>
                            <li
                                className="hover:bg-slate-100 py-1 cursor-pointer"
                                onClick={() => navigate('/faculty-login')}
                            >
                                Login as Faculty
                            </li>
                            <li
                                className="hover:bg-slate-100 py-1 cursor-pointer"
                                onClick={() => navigate('/admin-login')}
                            >
                                Login as Admin
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    <a
                        className="w-8 hover:w-10 transition-all duration-300"
                        href="https://www.facebook.com/IIITNagpur"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={FacebookIcon} alt="facebook icon" />
                    </a>
                    <a
                        className="w-8 hover:w-10 transition-all duration-300"
                        href="https://www.linkedin.com/in/iiitnofficial/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={LinkedinIcon} alt="linkedin icon" />
                    </a>
                    <a
                        className="w-8 hover:w-10 transition-all duration-300"
                        href="https://x.com/IIITN_OFFICIAL"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={XIcon} alt="x icon" />
                    </a>
                    <a
                        className="w-8 hover:w-10 transition-all duration-300"
                        href="https://www.youtube.com/channel/UCcQEXD69BdMFyU8872dU2_A"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={YoutubeIcon} alt="youtube icon" />
                    </a>
                </div>
            </header>

            <header className="w-full px-4 p-1 bg-white flex items-center gap-9">
                <img className="w-20" src="https://iiitn.ac.in/logo.png" alt="IIIT Nagpur logo" />
                <div className="text-xl font-bold">
                    <div>भारतीय सूचना प्रौद्योगिकी संस्थान, नागपुर</div>
                    <div>Indian Institute Of Information Technology Nagpur</div>
                    <div className="text-orange-500">
                        An Institution of National Importance By An Act of Parliament
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
