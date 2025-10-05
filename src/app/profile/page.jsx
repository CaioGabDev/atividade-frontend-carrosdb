"use client";
import Link from 'next/link';
import Image from 'next/image';
import styles from './Profile.module.css';
import Header from '../../components/header/Header';

export default function Profile() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.mainContainer}>
        <section className={styles.heroSection}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Bem-vindo ao Mundo de Carros</h1>
            <p className={styles.heroSubtitle}>
              Explore o incrível universo de Radiator Springs e conheça os personagens mais carismáticos do mundo automobilístico. 
              Uma experiência única que combina velocidade, amizade e aventura!
            </p>
            <Link href="/personagens" className={styles.exploreButton}>
              <span className={styles.buttonText}>INICIAR AVENTURA</span>
              <span className={styles.buttonIcon}>🏁</span>
            </Link>
          </div>
        </section>

        <section className={styles.featuresSection}>
          <h2 className={styles.featuresTitle}>Descubra Nossa Garagem</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚗</div>
              <h3>Galeria de Personagens</h3>
              <p>Conheça cada detalhe dos seus heróis favoritos, desde o Relâmpago McQueen até o carismático Mate.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⭐</div>
              <h3>Lista de Favoritos</h3>
              <p>Marque seus personagens especiais e crie sua coleção personalizada de habitantes de Radiator Springs.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📖</div>
              <h3>Histórias e Segredos</h3>
              <p>Mergulhe em curiosidades fascinantes e descubra segredos por trás das câmeras de cada filme.</p>
            </div>
          </div>
        </section>

        <section className={styles.callToAction}>
          <h2>Pronto para Acelerar?</h2>
          <p>Junte-se a milhares de fãs e explore este mundo incrível!</p>
          <Link href="/personagens" className={styles.ctaButton}>
            Conhecer Personagens
          </Link>
        </section>
      </main>
    </div>
  );
}