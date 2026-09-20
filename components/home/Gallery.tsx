import Image from "next/image";

const galleryImages = [
  { src: "/assets/1.jpg", alt: "Global trade network" },
  { src: "/assets/2.jpg", alt: "Infrastructure project supply" },
  { src: "/assets/4.jpg", alt: "Port logistics" },
  { src: "/assets/5.jpg", alt: "Import and export operations" },
  { src: "/assets/7.jpg", alt: "Sohar port operations" },
  { src: "/assets/8.jpg", alt: "Regional distribution" },
  { src: "/assets/10.jpg", alt: "Supply chain planning" },
  { src: "/assets/12.jpg", alt: "Warehouse operations" },
];

export default function Gallery() {
  return (
    <section className="gallery-section">
      <div className="container">
        <div className="gallery-intro">
          <span className="section-tag">Gallery</span>
          <h1 className="section-title">Rawaya in motion.</h1>
          <p>Explore the trade, logistics, supply, and partnership networks behind our work.</p>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div className="gallery-image" key={image.src}>
              <Image src={image.src} alt={image.alt} width={900} height={600} sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
