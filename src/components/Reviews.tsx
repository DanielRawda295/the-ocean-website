import { Quote } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { customerReviews } from '../data/reviews'

export function Reviews() {
  const shouldReduceMotion = useReducedMotion()
  const [showAll, setShowAll] = useState(false)
  const visibleReviews = showAll ? customerReviews : customerReviews.slice(0, 6)
  const hiddenCount = customerReviews.length - 6

  return (
    <section className="reviews section" id="reviews">
      <div className="reviews__glow reviews__glow--one" aria-hidden="true" />
      <div className="reviews__glow reviews__glow--two" aria-hidden="true" />
      <div className="page-container reviews__inner">
        <div className="reviews__heading">
          <p className="eyebrow">Guest reviews</p>
          <h2>Words from<br />our guests.</h2>
          <p>Customer reviews shared with The Ocean. Relative posting dates are a snapshot.</p>
        </div>
        <div className="reviews__divider" aria-hidden="true"><span /><span /><span /></div>
        <div className="reviews__grid">
          <AnimatePresence initial={false}>
          {visibleReviews.map((review, index) => (
            <motion.article
              className="review-card"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              key={review.id}
              transition={{ delay: shouldReduceMotion ? 0 : (index >= 6 ? index - 6 : index) * 0.07, duration: shouldReduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={shouldReduceMotion ? undefined : { y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Quote aria-hidden="true" className="review-card__quote" size={28} strokeWidth={1.1} />
              <p>{review.review}</p>
              <footer>
                <strong>{review.reviewer}</strong>
                <span>{review.posted}</span>
                {review.note && <small>{review.note}</small>}
              </footer>
            </motion.article>
          ))}
          </AnimatePresence>
        </div>
        <button className="reviews__toggle" onClick={() => setShowAll((current) => !current)} type="button">
          {showAll ? 'Show less' : `View ${hiddenCount} more reviews`}
        </button>
      </div>
    </section>
  )
}
