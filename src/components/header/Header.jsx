"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Coleção McQueen
        </Link>
        <ul className={styles.navList}>
          <li>
            <Link href="/profile" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link href="/personagens" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Personagens</Link>
          </li>
          <li>
            <Link href="/favoritos" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Favoritos</Link>
          </li>
          <li>
            <Link href="/sobre" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Sobre Mim</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}