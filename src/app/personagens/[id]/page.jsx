"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "antd";
import { toast } from "react-toastify";
import styles from "./PersonagemDetalhes.module.css";
import Header from "../../../components/header/Header";
import Link from "next/link";

export default function PersonagemDetalhes() {
  const params = useParams();
  const [personagem, setPersonagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorito, setFavorito] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonagem = async () => {
      try {
        // Fetch personagem data
        const response = await fetch(`http://localhost:3000/api/personagens/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Status:', response.status);
          throw new Error('Personagem não encontrado');
        }

        const data = await response.json();
        console.log('Dados do personagem:', data);
        setPersonagem(data);

        // Fetch favorito data
        const favResponse = await fetch(`http://localhost:3000/api/favoritos/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (favResponse.ok) {
          const favData = await favResponse.json();
          console.log('Dados do favorito:', favData);
          setFavorito(favData);
        }
      } catch (error) {
        console.error("Erro detalhado:", error);
        setError(error.message);
        toast.error("Falha ao carregar detalhes do personagem");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPersonagem();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className={styles.container}>
          <Skeleton active />
        </div>
      </div>
    );
  }

  if (error || !personagem) {
    return (
      <div>
        <Header />
        <div className={styles.container}>
          <Link href="/personagens" className={styles.backButton}>
            ← Voltar para Personagens
          </Link>
          <div className={styles.errorContainer}>
            <h2>Erro ao carregar personagem</h2>
            <p>{error || 'Personagem não encontrado'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Link href="/personagens" className={styles.backButton}>
          ← Voltar para Personagens
        </Link>
        
        <div className={styles.detalhesContainer}>
          <div className={styles.imageContainer}>
            <Image
              src={
                personagem?.imagem_url?.startsWith("http")
                  ? personagem.imagem_url
                  : "/images/default-character.png"
              }
              alt={personagem?.nome || "Personagem"}
              width={400}
              height={400}
              unoptimized
              className={styles.characterImage}
            />
          </div>

          <div className={styles.infoContainer}>
            <h1 className={styles.nome}>{personagem?.nome}</h1>
            
            <div className={styles.infoSection}>
              <h2 className={styles.sectionTitle}>Descrição</h2>
              <p className={styles.description}>{personagem?.descricao}</p>
            </div>

            <div className={styles.infoSection}>
              <h2 className={styles.sectionTitle}>Filmes</h2>
              <p className={styles.description}>{personagem?.filmes}</p>
            </div>

            <div className={styles.infoSection}>
              <h2 className={styles.sectionTitle}>Curiosidades</h2>
              <p className={styles.description}>{personagem?.curiosidades}</p>
            </div>

            {favorito ? (
              <div className={styles.favoritoTag}>
                ⭐ Este personagem está nos favoritos!
              </div>
            ) : (
              <div className={styles.naoFavoritoTag}>
                Este personagem não está nos favoritos
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}