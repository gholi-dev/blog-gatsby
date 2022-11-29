import { StaticImage } from "gatsby-plugin-image";
import React, { Fragment } from "react";

import {
  FaRegLightbulb,
  FaLightbulb,
  FaLinkedinIn,
  FaTelegram,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLink
} from "react-icons/fa";

const Intro = () => {
  return (
    <Fragment>
      <article className="mt-12 text-center">
        <StaticImage
          className="block w-[160px] mx-auto rounded-full border border-grey-light"
          src="../images/userdehghani.jpeg"
        />
        <h1 className="mt-6 text-4xl font-extralight">Mohammad Amin</h1>
        <p className="text-[#73737d] mt-5 w-2/4 mx-auto">
          Written by You. This is where your author bio lives. Share your work,
          your joys and of course, your Twitter handle.
        </p>
      </article>
      <div className="flex justify-between items-center w-1/5 mx-auto mt-8">
        <button>
          <FaTelegram color="#73737d" />
        </button>
        <button>
          <FaLinkedinIn color="#73737d" />
        </button>
        <button>
          <FaInstagram color="#73737d" />
        </button>
        <button>
          <FaGithub color="#73737d" />
        </button>
        <button>
          <FaTwitter color="#73737d" />
        </button>
      </div>
    </Fragment>
  );
};

export default Intro;
