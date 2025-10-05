"use client";

import { useEffect, useState } from "react";
import { Pagination, Card } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Favoritos.module.css";
import Header from "../../components/header/Header";
import Link from "next/link";

export default function Favoritos() {
  const [data, setData] = useState({
    favoritos: [],
    loading: true,
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        // First, fetch favorite IDs
        const favResponse = await fetch('http://localhost:3000/api/favoritos');
        if (!favResponse.ok) {
          throw new Error('Erro ao buscar favoritos');
        }
        const favoritosIds = await favResponse.json();

        // Then, fetch complete information for each favorite
        const favoritosCompletos = await Promise.all(
          favoritosIds.map(async (fav) => {
            const personagemResponse = await fetch(`http://localhost:3000/api/personagens/${fav.id}`);
            if (!personagemResponse.ok) {
              console.error(`Erro ao buscar personagem ${fav.id}`);
              return null;
            }
            const personagemData = await personagemResponse.json();
            return {
              ...personagemData,
              favoritoId: fav.id
            };
          })
        );

        // Filter out any null values from failed requests
        const favoritosValidos = favoritosCompletos.filter(fav => fav !== null);

        setData((prev) => ({
          ...prev,
          favoritos: favoritosValidos,
          loading: false,
        }));
      } catch (error) {
        console.error("Erro ao buscar Favoritos:", error);
        toast.error("Falha ao carregar favoritos.");
        setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchFavoritos();
  }, []);

  const paginatedFavoritos = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.favoritos.slice(start, start + data.pageSize);
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.titulo}>Meus Favoritos</h1>
        <p className={styles.subtitulo}>
          Sua coleção especial de personagens de Carros
        </p>
        
        <Pagination
          className={styles.pagination}
          current={data.current}
          pageSize={data.pageSize}
          total={data.favoritos.length}
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
              alt="Carregando..."
              unoptimized
            />
          </div>
        ) : data.favoritos.length === 0 ? (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyText}>
              Você ainda não tem favoritos. Que tal explorar alguns personagens?
            </p>
            <Link href="/personagens" className={styles.exploreButton}>
              Explorar Personagens
            </Link>
          </div>
        ) : (
          <div className={styles.favoritosContainer}>
            {paginatedFavoritos().map((favorito) => (
              <Link
                href={`/personagens/${favorito.id}`}
                key={favorito.id}
                className={styles.cardLink}
              >
                <Card
                  className={styles.favoritoCard}
                  hoverable
                  cover={
                    <Image
                      alt={favorito.nome || 'Personagem de Carros'}
                      src={
                        favorito.imagem_url &&
                        favorito.imagem_url.startsWith("http")
                          ? favorito.imagem_url
                          : "/images/default-character.png"
                      }
                      width={320}
                      height={320}
                      unoptimized
                      className={styles.cardImage}
                      priority={true}
                    />
                  }
                >
                  <Card.Meta
                    title={<span className={styles.cardTitle}>{favorito.nome || 'Personagem'}</span>}
                    description={
                      <span className={styles.cardDesc}>
                        {favorito.descricao || 'Descrição não disponível'}
                      </span>
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