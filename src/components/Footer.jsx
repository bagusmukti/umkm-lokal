import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Tim Berotak Agile. Dibuat untuk Web in Action.
        </p>
      </div>
    </footer>
  );
}

export default Footer;