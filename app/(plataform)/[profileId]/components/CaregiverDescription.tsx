export function CaregiverDescription({
  description,
}: {
  description?: string;
}) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold mb-4">Sobre o mim</h2>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {description}
      </p>
    </section>
  );
}

export default CaregiverDescription;
