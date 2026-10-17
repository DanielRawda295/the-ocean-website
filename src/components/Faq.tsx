import { Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'
import { faqs } from '../data/faqs'

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)
  const shouldReduceMotion = useReducedMotion()
  const idPrefix = useId()

  return (
    <section className="faq section" id="faq">
      <div className="page-container faq__grid">
        <div className="faq__intro">
          <p className="eyebrow">Useful details</p>
          <h2>A few things<br />you may wonder.</h2>
          <p>Details shown here are limited to the information confirmed for this concept. For anything else, please check directly with the restaurant.</p>
        </div>
        <div className="faq__items">
          {faqs.map((item) => {
            const isOpen = item.id === openId
            const panelId = `${idPrefix}-${item.id}`
            const buttonId = `${panelId}-button`
            return (
              <article className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} key={item.id}>
                <h3>
                  <button aria-controls={panelId} aria-expanded={isOpen} id={buttonId} onClick={() => setOpenId(isOpen ? null : item.id)} type="button">
                    <span>{item.question}</span>
                    <span className="faq-item__icon" aria-hidden="true">
                      {isOpen ? <Minus size={18} strokeWidth={1.6} /> : <Plus size={18} strokeWidth={1.6} />}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      id={panelId}
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      role="region"
                      transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: 'easeOut' }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
