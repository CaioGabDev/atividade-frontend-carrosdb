"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Personagens.module.css";
import {
  getSessionStorage,
  setSessionStorage,
} from "../../utils/sessionStorage";


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

  // A baseURL está correta, mas a instância 'api' é criada a cada renderização.
  const api = axios.create({
    baseURL: 'http://localhost:3001/api/',
  });

  useEffect(() => {
    const fetchPersonagens = async () => {
      try {
        // Fetch data from the new Next.js API route
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

    // A chamada à API deve acontecer apenas uma vez.
    // Remover a dependência 'api' garante que o useEffect não seja reexecutado
    // quando o estado do componente muda (por exemplo, na paginação).
    fetchPersonagens();
  }, []); // ⚠️ Alterado para um array de dependência vazio.

  const openModal = async (personagem) => {
    setModalInfo({ visible: true, personagem, favorito: null, loading: true });

    try {
      // Fetch favorite status from the new API route
      const response = await api.get(`/favoritos/${personagem.id}`);
      setModalInfo((m) => ({
        ...m,
        favorito: response.data,
        loading: false,
      }));
    } catch (error) {
      // An error, especially a 404, means the character isn't a favorite
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
                  src={personagem.imagem || "/images/default-character.png"}
                  width={220}
                  height={220}
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
        onCancel={() => setModalInfo({ visible: false, personagem: null, favorito: null, loading: false })}
        onOk={() => setModalInfo({ visible: false, personagem: null, favorito: null, loading: false })}
        width={600}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : modalInfo.favorito ? (
          <div className={styles.favoritoInfo}>
            <p>
              <span className={styles.label}>Status:</span>{" "}
              {modalInfo.favorito.status}
            </p>
            <p>
              <span className={styles.label}>Nota:</span>{" "}
              {modalInfo.favorito.nota}
            </p>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>
            Este personagem não está nos favoritos.
          </p>
        )}
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
