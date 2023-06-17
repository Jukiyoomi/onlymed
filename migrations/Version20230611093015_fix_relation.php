<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230611093015Fixrelation extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE speciality_speciality DROP FOREIGN KEY FK_1DD17BE7C88A02B1');
        $this->addSql('ALTER TABLE speciality_speciality DROP FOREIGN KEY FK_1DD17BE7D16F523E');
        $this->addSql('DROP TABLE speciality_speciality');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE speciality_speciality (speciality_source INT NOT NULL, speciality_target INT NOT NULL, INDEX IDX_1DD17BE7C88A02B1 (speciality_source), INDEX IDX_1DD17BE7D16F523E (speciality_target), PRIMARY KEY(speciality_source, speciality_target)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE speciality_speciality ADD CONSTRAINT FK_1DD17BE7C88A02B1 FOREIGN KEY (speciality_source) REFERENCES speciality (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE speciality_speciality ADD CONSTRAINT FK_1DD17BE7D16F523E FOREIGN KEY (speciality_target) REFERENCES speciality (id) ON DELETE CASCADE');
    }
}
