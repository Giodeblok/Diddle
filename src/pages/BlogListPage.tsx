import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { blogs } from '../data/blogs';

function BlogCard({ post, index }: { post: typeof blogs[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col bg-off-white border border-lilac/15 rounded-2xl overflow-hidden hover:shadow-soft transition-shadow duration-500"
    >
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden aspect-[16/9] bg-lavender">
        <img
          src={post.heroImage}
          alt={post.heroImageAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col flex-1 p-7">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-lilac-deep">
            {post.category}
          </span>
          <span className="text-lilac/40">·</span>
          <span className="flex items-center gap-1 font-sans text-[10px] text-foreground/40">
            <Clock className="w-3 h-3" />
            {post.readTime} min leestijd
          </span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h2 className="font-serif text-xl leading-snug text-anthracite group-hover:text-lilac-deep transition-colors duration-300 mb-3">
            {post.title}
          </h2>
        </Link>

        <p className="font-sans text-sm text-foreground/60 leading-relaxed line-clamp-3 flex-1 mb-5">
          {post.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-lilac-deep hover:text-lilac transition-colors duration-300"
        >
          Lees verder
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function BlogListPage() {
  return (
    <>
      <Helmet>
        <title>Blog | Mijn Diddl</title>
        <meta
          name="description"
          content="Diddl blogs: de comeback van het iconische muisje, verzameltips, geschiedenis en meer. Alles over Diddl in Nederland."
        />
        <meta property="og:title" content="Blog | Mijn Diddl" />
        <meta
          property="og:description"
          content="Diddl blogs: de comeback van het iconische muisje, verzameltips en meer."
        />
      </Helmet>

      <div className="pt-20">
        {/* Hero */}
        <div className="bg-hero-gradient py-24 text-center px-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs tracking-[0.25em] uppercase text-violet block mb-4"
          >
            Diddl Wereld
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-anthracite leading-tight mb-6 font-bold"
          >
            Alles over{' '}
            <span className="lilac-text">Diddl.</span>
          </motion.h1>
          <div className="diddl-divider mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-base text-violet max-w-xl mx-auto leading-relaxed"
          >
            Van de geschiedenis van het muisje tot verzameltips en cadeau-ideeën —
            jouw gids voor alles Diddl.
          </motion.p>
        </div>

        {/* Blog grid */}
        <section className="bg-off-white py-20 lg:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-lavender/30 py-20 px-6 text-center">
          <div className="max-w-xl mx-auto">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-violet block mb-4">Shop nu</span>
            <h2 className="font-serif text-3xl lg:text-4xl mt-4 mb-5 text-anthracite font-bold">
              Klaar om te winkelen?
            </h2>
            <p className="font-sans text-sm text-violet leading-relaxed mb-8">
              Bekijk de volledige Diddl collectie, notitieboekjes, ansichtkaarten, pluche en meer.
            </p>
            <Link
              to="/collectie"
              className="bg-lilac-gradient text-white font-sans text-xs tracking-[0.2em] uppercase font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity duration-300 inline-block"
            >
              Bekijk de collectie
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
