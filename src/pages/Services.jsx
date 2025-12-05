export default function Services() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-display font-bold text-primary mb-4">Nos Services à la carte</h1>
      <p className="text-lg text-gray-600 mb-12">Au-delà des packs, une expertise sur mesure.</p>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Production</h3>
            <ul className="space-y-3 text-gray-600">
                <li>• Vidéo Pro (Clip, Interview)</li>
                <li>• Mini-vidéo Snack Content</li>
                <li>• Shooting Photo</li>
            </ul>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Digital</h3>
            <ul className="space-y-3 text-gray-600">
                <li>• Community Management</li>
                <li>• Campagnes Ads (Meta/Google)</li>
                <li>• Création Site Web / Landing</li>
            </ul>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Business</h3>
            <ul className="space-y-3 text-gray-600">
                <li>• Coaching / Audit</li>
                <li>• Booking & Relations</li>
                <li>• Mise en relation investisseurs</li>
            </ul>
        </div>
      </div>
    </div>
  );
}