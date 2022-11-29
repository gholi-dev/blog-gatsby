import React from "react";

import { FaLightbulb, FaLink } from "react-icons/fa";

const Header = () => {
  return (
    <header className="mt-8 flex justify-between items-center">
      <h1 className="logo text-2xl font-medium">
        User <span className="font-thin">Dehghani</span>
      </h1>
      <div>
        <button className="mr-8">
          <FaLink size="22" color="#aaa" />
        </button>
        <button>
          <FaLightbulb size="22" color="#aaa" />
        </button>
      </div>
    </header>
  );
};

export default Header;
