import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export default async function CompetitionPage({ params }: Props) {
  console.log('Slug received:', params.slug);
  console.log(Object.keys(prisma));
  const competitions = await prisma.sports_competition.findMany();
  console.log(competitions);


  const competition = await prisma.sports_competition.findUnique({
    where: { slug: params.slug },
    include: {
      sports_organization: true,
      sports_competitionparticipation: {
        include: { sports_athlete: true },
      },
      sports_judgeassignment: {
        include: {
          sports_judge: {
            include: { sports_user: true },
          },
        },
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
      <p><strong>Organization:</strong> {competition.sports_organization.name}</p>

      <h2>Participants</h2>
      <ul>
        {competition.sports_competitionparticipation.map((p) => (
          <li key={p.sports_athlete.id}>
            {p.sports_athlete.name} (Score: {p.score ?? 'N/A'})
          </li>
        ))}
      </ul>

      <h2>Judges</h2>
      <ul>
        {competition.sports_judgeassignment.map((j) => (
          <li key={j.sports_judge.id}>
            {j.sports_judge.sports_user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
