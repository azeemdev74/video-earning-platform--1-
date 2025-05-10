"use client";
export default function PartnersSection() {
  const partners = [
    { name: "TechStream", category: "Technology" },
    { name: "FitLife", category: "Health & Fitness" },
    { name: "CookMaster", category: "Food" },
    { name: "TravelWorld", category: "Travel" },
    { name: "GameZone", category: "Gaming" },
    { name: "LearnHub", category: "Education" },
    { name: "FashionTrend", category: "Fashion" },
    { name: "MusicBeat", category: "Music" },
  ];

  return (
    <div className="py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center"
          >
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <span className="text-2xl font-bold">
                {partner.name.charAt(0)}
              </span>
            </div>
            <h3 className="text-lg font-bold">{partner.name}</h3>
            <p className="text-sm text-muted-foreground">{partner.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
