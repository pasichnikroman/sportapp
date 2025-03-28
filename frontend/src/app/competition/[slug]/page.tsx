// frontend/src/app/competition/[slug]/page.tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export default async function CompetitionPage({ params }: Props) {
  const competition = await prisma.competition.findUnique({
    where: { slug: params.slug },
    include: {
      organization: true, 
      participants: {
        include: { athlete: true },
      },
      judges: {
        include: { judge: { include: { user: true } } },
      },
    },
  });

  if (!competition) return notFound();

  return (
    <div>
      <h1>{competition.name}</h1>
      <p><strong>Date:</strong> {competition.date.toDateString()}</p>
      <p><strong>Location:</strong> {competition.location}</p>
      <p><strong>Rules:</strong> {competition.rules}</p>
      <p><strong>Organization:</strong> {competition.organization.name}</p>

      <h2>Participants</h2>
      <ul>
        {competition.participants.map((p) => (
          <li key={p.athlete.id}>{p.athlete.name} (Score: {p.score ?? 'N/A'})</li>
        ))}
      </ul>

      <h2>Judges</h2>
      <ul>
        {competition.judges.map((j) => (
          <li key={j.judge.id}>{j.judge.user.username}</li>
        ))}
      </ul>
    </div>
  );
}
