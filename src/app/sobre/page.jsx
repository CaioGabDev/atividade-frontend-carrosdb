"use client";
import Header from '../../components/header/Header';
import styles from './Sobre.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Sobre() {
  return (
    <div className={styles.wrapper}>
      <Header />
      
      <main className={styles.mainContainer}>
        <section className={styles.heroSection}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.content}>
            <div className={styles.profileCard}>
              <div className={styles.profileImage}>
                <Image
                  src="/images/eu.png" 
                  alt="Perfil"
                  width={200}
                  height={200}
                  className={styles.avatar}
                />
              </div>
              <h1 className={styles.name}>Caio Lacerda</h1>
              <p className={styles.title}>Desenvolvedor Full-Stack & Entusiasta de Carros</p>
              <div className={styles.socialLinks}>
                <a href="https://github.com/CaioGabDev" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/caio-lacerda-062b222b1/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  LinkedIn
                </a>    
              </div>
            </div>
          </div>
        </section>

        <section className={styles.infoSection}>
          <div className={styles.infoCard}>
            <h2 className={styles.sectionTitle}>Sobre Mim</h2>
            <p className={styles.description}>
              Apaixonado por desenvolvimento web e pelo universo automobilístico, especialmente
              pelo mundo mágico de Carros da Disney/Pixar. Busco combinar criatividade e
              tecnologia para criar experiências únicas na web.
            </p>
          </div>

          <div className={styles.skillsContainer}>
            <h2 className={styles.sectionTitle}>Habilidades</h2>
            <div className={styles.skillsGrid}>
              <div className={styles.skillCard}>
                <span className={styles.skillIcon}>⚡</span>
                <h3>Front-end</h3>
                <p>React, Next.js, CSS</p>
              </div>
              <div className={styles.skillCard}>
                <span className={styles.skillIcon}>🎨</span>
                <h3>Design</h3>
                <p>UI/UX, Responsividade</p>
              </div>
              <div className={styles.skillCard}>
                <span className={styles.skillIcon}>🚀</span>
                <h3>Performance</h3>
                <p>Otimização, SEO</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.projectSection}>
          <h2 className={styles.sectionTitle}>Projetos em Destaque</h2>
          <div className={styles.projectGrid}>
            <div className={styles.projectCard}>
              <h3>Carros DB</h3>
              <p>Database completo sobre o universo de Carros</p>
              <Link href="/personagens" className={styles.projectLink}>
                Ver Projeto
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div className={styles.contactCard}>
            <h2 className={styles.sectionTitle}>Contato</h2>
            <p className={styles.contactText}>
              Interessado em colaborar ou saber mais? Entre em contato!
            </p>
            <a href="mailto:seu-email@exemplo.com" className={styles.contactButton}>
              Enviar Email
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}