"use client";

import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Meu Site Dev 🚀</div>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/personagens">Listagem</Link>
          </li>
          <li>
            <Link href="/sobre">Sobre mim</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
