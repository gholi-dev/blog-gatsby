import React, { useEffect } from "react"
import { Link } from "gatsby"
import hljs from "highlight.js"
import Header from "../components/header/header.component"









export default function Post({ pageContext: { post, next, prev } }) { 


  useEffect(() => {
    // Syntax highlighting
    hljs.registerLanguage("bash", require("highlight.js/lib/languages/bash"))
    hljs.registerLanguage("css", require("highlight.js/lib/languages/css"))
    hljs.registerLanguage("html", require("highlight.js/lib/languages/xml"))
    hljs.registerLanguage(
      "javascript",
      require("highlight.js/lib/languages/javascript")
    )
    hljs.registerLanguage("json", require("highlight.js/lib/languages/json"))
    hljs.registerLanguage(
      "markdown",
      require("highlight.js/lib/languages/markdown")
    )
    hljs.registerLanguage("php", require("highlight.js/lib/languages/php"))
    hljs.registerLanguage("scss", require("highlight.js/lib/languages/scss"))
    hljs.registerLanguage("yaml", require("highlight.js/lib/languages/yaml"))
    hljs.registerLanguage("ini", require("highlight.js/lib/languages/ini"))
    hljs.registerLanguage(
      "python",
      require("highlight.js/lib/languages/python")
    )
    hljs.registerLanguage("css", require("highlight.js/lib/languages/css"))
    hljs.registerLanguage("ruby", require("highlight.js/lib/languages/ruby"))
    hljs.registerLanguage("go", require("highlight.js/lib/languages/go"))
    hljs.registerLanguage(
      "dockerfile",
      require("highlight.js/lib/languages/dockerfile")
    )
    hljs.registerLanguage(
      "plaintext",
      require("highlight.js/lib/languages/plaintext")
    )

    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block)
    })
  }, [])

  const date = new Date(post.date).toLocaleDateString("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const img_src =
    post.content.split('src="')[1] !== undefined
      ? post.content.split('src="')[1].split('" alt="')[0]
      : ""

  const sortDesc = post.excerpt.split("<p>")[1].split("[&hellip;]</p>")[0]


  console.log(post);

  return (
    <div className="mx-auto text-white posts" style={{ maxWidth: 960 }}>
      <Header />
      <div>
          <div dir="ltr">
            <div>  
              <main>
                <h1 className=" w-2/3  text-4xl mt-24 mb-14">{post.title}</h1>
             
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>

                <div className="tegs">
                tags:
                  {post.tags.nodes.map(tag => (
                    <Link key={tag.id} to={`/blog/tag/${tag.slug}`} rel="tag">
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </main>
              <hr />
              <nav>
                <div>
                  {prev !== null && (
                    <>
                      <Link to={`/blog/${prev.slug}`} rel="prev">
                      ← {" "}
                        {prev.title}
                      </Link>
                    </>
                  )}
                </div>{" "}
                <div>
                  {next !== null && (
                    <>
                      <Link to={`/blog/${next.slug}`} rel="next">
                        {next.title} 
                        {" "}    →
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
      </div>
    </div>
  )
}


