export default function FooterAdmin() {
    return (
        <>
            <footer className="block py-4">
                <div className="container px-4 mx-auto">
                    <hr className="mb-4 border-b-1 border-blueGray-200" />
                    <div className="flex flex-wrap items-center justify-center md:justify-between">
                        <div className="w-full px-4 md:w-4/12">
                            <div className="py-1 text-sm font-semibold text-center text-blueGray-500 md:text-left">
                                Copyright © {new Date().getFullYear()}{' '}
                                <a
                                    href="https://www.creative-tim.com?ref=nr-footer-admin"
                                    className="py-1 text-sm font-semibold text-blueGray-500 hover:text-blueGray-700"
                                >
                                    Inkers.ai
                                </a>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-8/12">
                            <ul className="flex flex-wrap justify-center list-none md:justify-end">
                                <li>
                                    <a
                                        href="https://www.creative-tim.com?ref=nr-footer-admin"
                                        className="block px-3 py-1 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                                    >
                                        Creative Tim
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.creative-tim.com/presentation?ref=nr-footer-admin"
                                        className="block px-3 py-1 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="http://blog.creative-tim.com?ref=nr-footer-admin"
                                        className="block px-3 py-1 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/creativetimofficial/notus-react/blob/main/LICENSE.md?ref=nr-footer-admin"
                                        className="block px-3 py-1 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                                    >
                                        MIT License
                                    </a>
                                </li>
  <li>
                                    <a
                                        href="https://github.com/creativetimofficial/notus-react/blob/main/LICENSE.md?ref=nr-footer-admin"
                                        className="block px-3 py-1 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                                    >
                                        T License
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
