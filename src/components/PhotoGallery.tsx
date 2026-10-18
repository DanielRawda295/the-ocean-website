const photos = [
  { alt: 'Shrimp arranged over ice', src: '/assets/seafood/775166812_18066445664754697_2422929472419139875_n..jpg' },
  { alt: 'Fresh seafood selection displayed over ice', src: '/assets/seafood/fish2.webp' },
  { alt: 'Seafood displayed in a chilled selection', src: '/assets/seafood/557053615_18055433036218315_8982209246740493729_n..jpg' },
  { alt: 'Seafood selection in a chilled display', src: '/assets/seafood/670969326_18048368468754697_5399772563993380974_n..jpg' },
  { alt: 'Fresh fish selection', src: '/assets/seafood/fish5.webp' },
  { alt: 'Seafood dish from The Ocean restaurant photography', src: '/assets/seafood/776442970_18066413636754697_7845254103303073647_n..jpg' },
  { alt: 'Fresh seafood display', src: '/assets/seafood/850007940_18075472643754697_7158694559172425422_n..jpg' },
]

export function PhotoGallery() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="gallery section" id="gallery">
      <div className="page-container">
        <div className="section-heading">
          <div><p className="eyebrow">The visual catch</p><h2>Colours, texture,<br />and the tide.</h2></div>
          <p>A closer look at the seafood and dishes shared by The Ocean.</p>
        </div>
        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <motion.figure
              className="gallery-card"
              initial={{ clipPath: shouldReduceMotion ? 'inset(0)' : 'inset(9% 0 0 0)', opacity: 0 }}
              key={photo.src}
              transition={{ duration: shouldReduceMotion ? 0 : 0.85, delay: shouldReduceMotion ? 0 : index * 0.09, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={{ clipPath: 'inset(0)', opacity: 1 }}
              whileHover={shouldReduceMotion ? undefined : { rotateX: 1.5, rotateY: -1.5, y: -4 }}
            >
              <img alt={photo.alt} decoding="async" loading={index === 0 ? 'eager' : 'lazy'} src={photo.src} />
              <figcaption>Seafood selection <span>0{index + 1}</span></figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
import { motion, useReducedMotion } from 'motion/react'

