// ============= SERVICES PAGE =============
export const ServicesPage = () => {
  const services = [
    {
      category: "Production",
      items: [
        { name: "Clip Vidéo 4K", price: "150 000 FCFA", duration: "2-3 jours" },
        { name: "Shooting Photo Pro", price: "75 000 FCFA", duration: "1 jour" },
        { name: "Podcast Enregistrement", price: "50 000 FCFA", duration: "1/2 jour" },
      ]
    },
    {
      category: "Marketing Digital",
      items: [
        { name: "Campagne Social Media", price: "200 000 FCFA", duration: "1 mois" },
        { name: "SEO/SEA", price: "150 000 FCFA", duration: "1 mois" },
        { name: "Community Management", price: "100 000 FCFA", duration: "1 mois" },
      ]
    },
    {
      category: "Business",
      items: [
        { name: "Booking & Événements", price: "Sur devis", duration: "Variable" },
        { name: "Gestion de Carrière", price: "300 000 FCFA", duration: "1 mois" },
        { name: "Consulting Stratégique", price: "150 000 FCFA", duration: "Session" },
      ]
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Nos Services</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Des prestations sur-mesure pour répondre à tous vos besoins
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{service.category}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {service.items.map((item, i) => (
                  <Card key={i} hover>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-indigo-600">{item.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 mb-4">
                      <Award className="w-4 h-4 mr-2" />
                      {item.duration}
                    </div>
                    <Button variant="primary" fullWidth size="sm">
                      En savoir plus
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};