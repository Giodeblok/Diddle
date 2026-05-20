import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { getBlogBySlug, getRelatedBlogs } from '../data/blogs';
import type { Components } from 'react-markdown';

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="font-serif text-3xl lg:text-4xl text-anthracite leading-snug mt-10 mb-5">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-2xl text-anthracite leading-snug mt-12 mb-4 pt-2 border-t border-lilac/15">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-xl text-anthracite leading-snug mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="font-sans text-base text-foreground/75 leading-relaxed mb-5">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-5 mb-5 space-y-1.5 font-sans text-base text-foreground/75 leading-relaxed">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal ml-5 mb-5 space-y-1.5 font-sans text-base text-foreground/75 leading-relaxed">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-lilac-deep underline underline-offset-2 hover:text-lilac transition-colors duration-200"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-anthracite">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-foreground/80">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-lilac/50 pl-5 my-6 text-foreground/65 italic font-serif text-lg leading-relaxed">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-lilac/20 my-10" />,
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt ?? ''}
      className="w-full max-w-xs mx-auto rounded-2xl my-8 shadow-lg block"
      loading="lazy"
    />
  ),
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogBySlug(slug ?? '');

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = getRelatedBlogs(post.slug, 2);

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={post.heroImage} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="pt-20">
        {/* Hero image */}
        <div className="relative w-full max-h-[480px] overflow-hidden bg-lavender">
          <img
            src={post.heroImage}
            alt={post.heroImageAlt}
            className="w-full h-[480px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-anthracite/60" />
        </div>

        {/* Article */}
        <div className="bg-off-white py-16 lg:py-20 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-foreground/40 hover:text-lilac-deep transition-colors duration-200 mb-10"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Alle blogs
              </Link>
            </motion.div>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-5"
            >
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-lilac-deep">
                {post.category}
              </span>
              <span className="text-lilac/30">·</span>
              <span className="flex items-center gap-1.5 font-sans text-[10px] text-foreground/40">
                <Clock className="w-3 h-3" />
                {post.readTime} min leestijd
              </span>
              <span className="text-lilac/30">·</span>
              <span className="font-sans text-[10px] text-foreground/40">
                {post.publishedAt}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-anthracite leading-tight mb-8"
            >
              {post.title}
            </motion.h1>

            <div className="diddl-divider mb-10" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <ReactMarkdown components={markdownComponents}>
                {post.content}
              </ReactMarkdown>
            </motion.div>

            {/* CTA block */}
            <div className="mt-16 bg-lavender/20 border border-lilac/20 rounded-2xl p-8 text-center">
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-violet block mb-3">Shop nu</span>
              <h3 className="font-serif text-2xl mt-3 mb-4 text-anthracite font-bold">
                Diddl is terug, shop de collectie.
              </h3>
              <p className="font-sans text-sm text-violet leading-relaxed mb-6 max-w-sm mx-auto">
                Van notitieboekjes tot pluche, alles officieel gelicentieerd en snel geleverd.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/collectie" className="bg-lilac-gradient text-white font-sans text-xs tracking-[0.2em] uppercase font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity duration-300">
                  Bekijk de collectie
                </Link>
                <Link to="/nieuw" className="border border-lilac text-lilac-deep font-sans text-xs tracking-[0.2em] uppercase font-bold py-3 px-8 rounded-full hover:bg-lilac/10 transition-colors duration-300">
                  Nieuw binnen
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related blogs */}
        {related.length > 0 && (
          <section className="bg-lavender/20 py-16 lg:py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-violet block mb-3">Meer lezen</span>
                <h2 className="font-serif text-3xl mt-3 text-anthracite font-bold">
                  Gerelateerde artikelen
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="group flex gap-5 bg-off-white border border-lilac/15 rounded-2xl p-5 hover:shadow-soft transition-shadow duration-400"
                  >
                    <div className="w-24 h-24 shrink-0 overflow-hidden rounded-xl bg-lavender">
                      <img
                        src={relatedPost.heroImage}
                        alt={relatedPost.heroImageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-lilac-deep mb-1">
                        {relatedPost.category}
                      </span>
                      <h3 className="font-serif text-base leading-snug text-anthracite group-hover:text-lilac-deep transition-colors duration-300 line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 font-sans text-[10px] text-foreground/40 group-hover:text-lilac-deep transition-colors">
                        Lees verder
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
