interface Package {
  name: string;
  price: number;
  code: string;
  features: string[];
  highlight: boolean;
}

interface PackageCardProps {
  pkg: Package;
  selected: boolean;
  onSelect: (pkg: Package) => void;
}

export default function PackageCard({
  pkg,
  selected,
  onSelect,
}: PackageCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(pkg)}
      aria-pressed={selected}
      className={`relative flex-1 rounded-2xl border-2 bg-white p-6 text-left transition ${
        selected
          ? "border-[#14213D] shadow-lg"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {pkg.highlight && (
        <span className="absolute -top-3 right-4 rounded-full bg-[#14213D] px-3 py-1 text-xs font-semibold text-white">
          Popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">
        GHS {pkg.price.toLocaleString()}
      </p>

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}