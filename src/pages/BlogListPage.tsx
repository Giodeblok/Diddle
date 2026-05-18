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
      className="group flex flex-col bg-ivory border border-gold/15 rounded-sm overflow-hidden hover:shadow-soft transition-shadow duration-500"
    >
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden aspect-[16/9] bg-beige">
        <img
          src={post.heroImage}
          alt={post.heroImageAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col flex-1 p-7">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold-deep">
            {post.category}
          </span>
          <span className="text-gold/40">·</span>
          <span className="flex items-center gap-1 font-sans text-[10px] text-foreground/40">
            <Clock className="w-3 h-3" />
            {post.readTime} min leestijd
          </span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h2 className="font-serif text-xl leading-snug text-anthracite group-hover:text-gold-deep transition-colors duration-300 mb-3">
            {post.title}
          </h2>
        </Link>

        <p className="font-sans text-sm text-foreground/60 leading-relaxed line-clamp-3 flex-1 mb-5">
          {post.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-gold-deep hover:text-gold transition-colors duration-300"
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
        <title>Blog | Eeuwig Hart</title>
        <meta
          name="description"
          content="Informatieve en empathische blogs over rouw, verlies en nabestaandenzorg. Lees onze gidsen over rouwcadeaus, as bewaren, rouwverwerking en persoonlijke aandenken."
        />
        <meta property="og:title" content="Blog | Eeuwig Hart" />
        <meta
          property="og:description"
          content="Informatieve en empathische blogs over rouw, verlies en nabestaandenzorg."
        />
      </Helmet>

      <div className="pt-20">
        {/* Hero */}
        <div className="bg-hero-gradient py-24 text-center px-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs tracking-[0.25em] uppercase text-taupe block mb-4"
          >
            Inspiratie & Inzicht
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-anthracite leading-tight mb-6"
          >
            Woorden voor{' '}
            <span className="italic gold-text">moeilijke momenten.</span>
          </motion.h1>
          <div className="luxury-divider mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-base text-taupe max-w-xl mx-auto leading-relaxed"
          >
            Informatieve en empathische artikelen over rouw, verlies en het bewaren
            van herinneringen. Geschreven met respect voor iedereen die een dierbare heeft verloren.
          </motion.p>
        </div>

        {/* Blog grid */}
        <section className="bg-ivory py-20 lg:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-card py-20 px-6 text-center">
          <div className="max-w-xl mx-auto">
            <span className="eyebrow">Persoonlijk aandenken</span>
            <h2 className="font-serif text-3xl lg:text-4xl mt-4 mb-5 text-anthracite">
              Een herinnering die voor altijd blijft.
            </h2>
            <p className="font-sans text-sm text-foreground/60 leading-relaxed mb-8">
              Handgemaakte glazen harten met foto, gedicht en optioneel een mini-urn.
              Elk stuk gemaakt met zorg voor wie er niet meer is.
            </p>
            <Link
              to="/collectie"
              className="btn-primary inline-block"
            >
              Bekijk de collectie
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
