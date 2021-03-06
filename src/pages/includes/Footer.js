export default function Footer() {
  return (
    <footer
      className="bg-gray-50 hidden lg:block inset-x-0"
      aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-md mx-auto pt-12 px-4 sm:max-w-7xl sm:px-6 lg:pt-16 lg:px-8">
        <div className="mt-12 border-t border-gray-200 py-8">
          <p className="text-base text-gray-400 md:text-center">
            &copy; 2022 PINS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
