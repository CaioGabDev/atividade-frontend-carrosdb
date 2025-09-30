"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Personagens.module.css";
import Header from "../../components/header/Header"; 

export default function Personagens() {
  const [data, setData] = useState({
    personagens: [],
    loading: true,
    current: 1,
    pageSize: 5,
  });

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    personagem: null,
    favorito: null,
    loading: false,
  });

  const api = axios.create({
    baseURL: "http://localhost:3001/api/",
  });

  useEffect(() => {
    const fetchPersonagens = async () => {
      try {
        const response = await api.get("/personagens");
        setData({
          personagens: response.data,
          loading: false,
          current: 1,
          pageSize: 5,
        });
      } catch (error) {
        toast.error("Erro ao carregar personagens");
        setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchPersonagens();
  }, []);

  const openModal = async (personagem) => {
    setModalInfo({ visible: true, personagem, favorito: null, loading: true });

    try {
      const response = await api.get(`/favoritos/${personagem.id}`);
      setModalInfo((m) => ({
        ...m,
        favorito: response.data,
        loading: false,
      }));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setModalInfo((m) => ({ ...m, favorito: null, loading: false }));
      } else {
        toast.error("Erro ao carregar informações do favorito.");
        setModalInfo((m) => ({ ...m, loading: false }));
      }
    }
  };

  const paginatedPersonagens = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.personagens.slice(start, start + data.pageSize);
  };

  return (
    <div>
      <Header />
      <h1>Lista de Personagens</h1>
      <Pagination
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
        <div className={styles.cardsContainer}>
          {paginatedPersonagens().map((personagem) => (
            <Card
              key={personagem.id}
              className={styles.card}
              hoverable
              onClick={() => openModal(personagem)}
              cover={
                <Image
                  alt={personagem.nome}
                  src={
                    personagem.imagem_url && personagem.imagem_url.startsWith("http")
                      ? personagem.imagem_url
                      : "/images/default-character.png"
                  }
                  width={220}
                  height={220}
                  unoptimized
                />
              }
            >
              <Card.Meta
                title={personagem.nome}
                description={personagem.descricao}
              />
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={`Detalhes de ${modalInfo.personagem?.nome}`}
        open={modalInfo.visible}
        onCancel={() =>
          setModalInfo({
            visible: false,
            personagem: null,
            favorito: null,
            loading: false,
          })
        }
        onOk={() =>
          setModalInfo({
            visible: false,
            personagem: null,
            favorito: null,
            loading: false,
          })
        }
        width={600}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : (
          <div className={styles.detalhesPersonagem}>
            <Image
              src={
                modalInfo.personagem?.imagem_url &&
                modalInfo.personagem?.imagem_url.startsWith("http")
                  ? modalInfo.personagem.imagem_url
                  : "/images/default-character.png"
              }
              alt={modalInfo.personagem?.nome || "Sem nome"}
              width={220}
              height={220}
              unoptimized
            />
            <p>
              <span className={styles.label}>Descrição:</span>{" "}
              {modalInfo.personagem?.descricao}
            </p>
            <p>
              <span className={styles.label}>Filmes:</span>{" "}
              {modalInfo.personagem?.filmes}
            </p>
            <p>
              <span className={styles.label}>Curiosidades:</span>{" "}
              {modalInfo.personagem?.curiosidades}
            </p>

            {modalInfo.favorito ? (
              <p className={styles.favorito}>
                ⭐ Este personagem está nos favoritos!
              </p>
            ) : (
              <p style={{ textAlign: "center" }}>
                Este personagem não está nos favoritos.
              </p>
            )}
          </div>
        )}
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
