export default function GallerySection() {
  return (
    <section className="bg-white px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Campus life</p>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">A glimpse into the experience</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
          ].map((image, index) => (
            <div key={index} className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200">
              <img src={image} alt="Campus experience" className="h-72 w-full object-cover transition duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
