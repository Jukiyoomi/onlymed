<?php

namespace App\Repository;

use App\Entity\Doctor;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Doctor>
 *
 * @method Doctor|null find($id, $lockMode = null, $lockVersion = null)
 * @method Doctor|null findOneBy(array $criteria, array $orderBy = null)
 * @method Doctor[]    findAll()
 * @method Doctor[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DoctorRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Doctor::class);
    }

    public function save(Doctor $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Doctor $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findAllByTerm(string $term, ?string $zone, int $numItemsPerPage, int $offset): array
    {
        $qb = $this->createQueryBuilder('d');
		$qb
            ->join('d.speciality', 's')
            ->where('LOWER(s.name) LIKE :term')
            ->setParameter('term', '%' . $term . '%');

		if ($zone !== null) {
			$qb
				->andWhere('LOWER(d.address) LIKE :zone')
				->setParameter('zone', '%' . $zone . '%');
		}
		$qb
            ->orderBy('d.id', 'ASC')
            ->setFirstResult((($offset - 1) * $numItemsPerPage))
            ->setMaxResults($numItemsPerPage)
        ;

		return $qb->getQuery()->getResult();
    }

    public function getCount(): int
    {
        $qb = $this->createQueryBuilder('d');
        $qb->select('COUNT(d.id)');

        return $qb->getQuery()->getSingleScalarResult();
    }

//    /**
//     * @return Doctor[] Returns an array of Doctor objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('d.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Doctor
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
