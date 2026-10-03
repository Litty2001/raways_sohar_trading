import Image from "next/image";
import { PRODUCT_CARDS } from "@/lib/site-content";

export default function Divisions() {
  return (
    <section id="products" className="products-section">
      <div className="container">
        <div className="section-header split-header">
          <div>
            <span className="section-tag">Core Divisions</span>
            <h2 className="section-title">
              Four core pillars powering commerce, construction, and energy.
            </h2>
          </div>
        </div>

        <div className="products-grid">
          {PRODUCT_CARDS.map((product) => (
            <article className="product-card" id={product.id} key={product.id}>
              <div className={`product-icon ${product.iconClassName}`}>
                <Image
                  src={product.iconSrc}
                  alt={product.iconAlt}
                  width={product.iconWidth}
                  height={product.iconHeight}
                />
              </div>
              <div className="product-cat">{product.category}</div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              {product.list && (
                <ul className="product-list">
                  {product.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
