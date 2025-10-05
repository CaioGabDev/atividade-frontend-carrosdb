"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Personagens.module.css";
import Header from "../../components/header/Header";
import Link from "next/link";

export default function Personagens() {
  const [data, setData] = useState({
    personagens: [],
    loading: true,
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    const fetchTodosPersonagens = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
        setData((prev) => ({
          ...prev,
          personagens: response.data,
          loading: false,
        }));
      } catch (error) {
        console.error("Erro ao buscar Personagens:", error);
        toast.error("Falha ao carregar personagens.");
        setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchTodosPersonagens();
  }, []);

  const paginatedPersonagens = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.personagens.slice(start, start + data.pageSize);
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.titulo}>Personagens Incríveis</h1>
        <p className={styles.subtitulo}>
          Explore os personagens e descubra curiosidades!
        </p>
        <Pagination
          className={styles.pagination}
          current={data.current}
          pageSize={data.pageSize}
          total={data.personagens.length}
          onChange={(page, size) =>
            setData((prev) => ({ ...prev, current: page, pageSize: size }))
          }
          showSizeChanger
          pageSizeOptions={["5", "10", "20"]}
        />

        {data.loading ? (
          <div className={styles.loadingContainer}>
            <Image
              src="/images/loading.gif"
              width={300}
              height={200}
              alt="Loading"
              unoptimized
            />
          </div>
        ) : (
          <div className={styles.personagensContainer}>
            {paginatedPersonagens().map((personagem) => (
              <Link
                href={`/personagens/${personagem.id}`}
                key={personagem.id}
                className={styles.cardLink}
              >
                <Card
                  className={styles.personagemCard}
                  hoverable
                  cover={
                    <Image
                      alt={personagem.nome}
                      src={
                        personagem.imagem_url &&
                        personagem.imagem_url.startsWith("http")
                          ? personagem.imagem_url
                          : "/images/default-character.png"
                      }
                      width={220}
                      height={220}
                      unoptimized
                      className={styles.cardImage}
                    />
                  }
                >
                  <Card.Meta
                    title={<span className={styles.cardTitle}>{personagem.nome}</span>}
                    description={
                      <span className={styles.cardDesc}>{personagem.descricao}</span>
                    }
                  />
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}