interface Props {

  title: string;

  description: string;
}

function FeatureCard({

  title,
  description

}: Props) {

  return (

    <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition">

      <h3 className="text-xl font-semibold text-white mb-3">

        {title}

      </h3>

      <p className="text-gray-400 leading-relaxed">

        {description}

      </p>

    </div>
  );
}

export default FeatureCard;