<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230929125104Changerelationdoctorspeciality extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE doctor_speciality DROP FOREIGN KEY FK_C4C0891F3B5A08D7');
        $this->addSql('ALTER TABLE doctor_speciality DROP FOREIGN KEY FK_C4C0891F87F4FB17');
        $this->addSql('DROP TABLE doctor_speciality');
        $this->addSql('ALTER TABLE user ADD speciality_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6493B5A08D7 FOREIGN KEY (speciality_id) REFERENCES speciality (id)');
        $this->addSql('CREATE INDEX IDX_8D93D6493B5A08D7 ON user (speciality_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE doctor_speciality (doctor_id INT NOT NULL, speciality_id INT NOT NULL, INDEX IDX_C4C0891F3B5A08D7 (speciality_id), INDEX IDX_C4C0891F87F4FB17 (doctor_id), PRIMARY KEY(doctor_id, speciality_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE doctor_speciality ADD CONSTRAINT FK_C4C0891F3B5A08D7 FOREIGN KEY (speciality_id) REFERENCES speciality (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE doctor_speciality ADD CONSTRAINT FK_C4C0891F87F4FB17 FOREIGN KEY (doctor_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6493B5A08D7');
        $this->addSql('DROP INDEX IDX_8D93D6493B5A08D7 ON user');
        $this->addSql('ALTER TABLE user DROP speciality_id');
    }
}
