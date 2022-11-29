import React from "react";
import Header from "../components/header/header.component";

import Intro from "../components/intro/intro.component";
import PostItem from "../components/post-item/post-item.component";

export default function blog({
  pageContext: {
    data,
    skip,
    num,
    limit,
    liaraUpdateDate,
    programingData,
    currentPage
  }
}) {
  const posts = [
    {
      node: {
        id: 0,
        img:
          "https://novela.narative.co/static/5f8eac72cc66a0e5148406174d0cda0e/b0b8f/hero-2.webp",
        title: "Understanding the Gatsby lifecycle with Narative",
        text:
          "Hello, world! This is a demo post for gatsby-theme-novela. Novela is built by the team at Narative, and built for everyone that loves the web."
      }
    }
  ];

  return (
    <main className="mx-auto text-white" style={{ maxWidth: 960 }}>
      <Header />
      <Intro />

      <section className="post-items mt-28">
        <div className="">
          {/* {data.map(item => <div key={item.node.id} data={item.node} />)} */}
          {data.map(item => <PostItem key={item.node.id} data={item.node} />)}
        </div>
      </section>
    </main>
  );
}
