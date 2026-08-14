import Reveal from '../common/Reveal';

export default function FaithSection() {
  return (
    <Reveal as="section" className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson-500" />
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="section-subtitle mb-3">★ ★ ★ Our Foundation ★ ★ ★</p>
        <h2 className="font-heading text-navy-700 text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6">
          Faith-Rooted. People-Focused.
        </h2>
        <div className="w-16 h-1 bg-crimson-500 mx-auto mb-8" />
        <p className="font-script text-xl md:text-2xl text-navy-700 leading-relaxed">
          Our Christian faith shapes how we serve — with grace, compassion, accountability, and hope.
        </p>
        <p className="text-gray-600 leading-relaxed mt-6 max-w-xl mx-auto">
          You don&apos;t have to have everything figured out to take the next step. No matter where you are on your journey, you are welcome here.
        </p>
      </div>
    </Reveal>
  );
}
