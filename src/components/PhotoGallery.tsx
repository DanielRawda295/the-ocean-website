const photos = [
  { alt: 'Shrimp arranged over ice', className: 'gallery-card--shrimp', src: '/assets/seafood/775166812_18066445664754697_2422929472419139875_n..jpg' },
  { alt: 'Fresh seafood selection displayed over ice', className: 'gallery-card--wide', src: '/assets/seafood/fish2.webp' },
  { alt: 'Close-up of seafood displayed over ice', className: 'gallery-card--close', src: '/assets/seafood/557053615_18055433036218315_8982209246740493729_n..jpg' },
  { alt: 'Seafood selection in a chilled display', className: 'gallery-card--market', src: '/assets/seafood/670969326_18048368468754697_5399772563993380974_n..jpg' },
]

export function PhotoGallery() {
  return (
    <section className="gallery section" id="gallery">
      <div className="page-container">
        <div className="section-heading">
          <div><p className="eyebrow">The visual catch</p><h2>Colours, texture,<br />and the tide.</h2></div>
          <p>Selected from the restaurant&apos;s supplied photography.</p>
        </div>
        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <figure className={`gallery-card ${photo.className}`} key={photo.src}>
              <img alt={photo.alt} decoding="async" loading={index === 0 ? 'eager' : 'lazy'} src={photo.src} />
              <figcaption>Seafood selection <span>0{index + 1}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
