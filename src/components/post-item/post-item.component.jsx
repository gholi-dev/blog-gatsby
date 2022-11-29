import { Link } from "gatsby";
import React from "react";

const PostItem = ({ data }) => {

  const date = new Date(data.date).toDateString()


  return (
    <div className="mb-14">
      <Link href={data.slug || "#"}>
        <div className="flex cursor-pointer items-center">
          <img
            src={data.featuredImage?.node.localFile.childImageSharp.fluid.src}
            alt={data.title}
            className="w-[340px] h-[200px] mr-14"
          />
          <div>
            <h3 className=" font-bold text-2xl">
              {data.title}
            </h3>
            <p className="text-[#73737d] font-thin mt-4">
              {data.excerpt
                .split("<p>")[1]
                .split("[&hellip;]</p>")[0]
                .slice(0, 100) + "..."}
            </p>
            <div className="text-[#73737d] font-semibold text-sm mt-4">
             {date}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
