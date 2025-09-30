"use client";

import styles from "./Profile.module.css";
import { Button, Card, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/header/Header"; 

export default function Profile() {
  return (
    <div className={styles.container}>
    <Header />
      <main className={styles.main}>
        <Card hoverable className={styles.card}>
          <div className={styles.flexContainer}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/trumpbeijo.webp"
                alt="Trump"
                fill
                className={styles.image}
              />
            </div>

            <div className={styles.profileContent}>
              <Typography.Title level={3}>Caio Gabriel</Typography.Title>
              <Typography.Title level={5} type="success">
                Trump 00
              </Typography.Title>
              <Typography.Paragraph>
                Projeto desenvolvido usando
              </Typography.Paragraph>
              <ul className={styles.list}>
                <li>NextJS</li>
                <li>Axios</li>
                <li>AntD</li>
                <li>SessionStorage</li>
                <li>Toastify</li>
                <li>CSS Modules</li>
                <li>Hook</li>
                <li>PreLoad</li>
                <li>PreFetch</li>
                <li>Link / Next</li>
                <li>Image / Next</li>
                <li>NodeJS</li>
                <li>E muito amor 💖</li>
              </ul>

              <Link href="/personagens" prefetch>
                <Button type="primary">Acessar minha API via NET</Button>
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
