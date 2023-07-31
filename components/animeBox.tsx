/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PlusOutlined, ArrowRightOutlined, CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useRouter } from 'next/router';

import { useState, useEffect, createRef } from "react";

import { addAnime, loadAnimeCollection, removeAnime } from "../pages/api/anime-collection-services";
import AddAnimeModal from "./addAnimeModal";

interface Anime {
  id: number;
  bannerImage: string;
  title: {
    __typename: string;
    romaji: string;
    english: string;
    native: string;
  };
}


export default function AnimeBox({ anime }: { anime: Anime }) {
  const [animeCollection, setAnimeCollection] = useState([]);

  useEffect(() => {
    const loadAnimeCollection = () => {
      const rawAnimeCollection = localStorage.getItem('anime-collection');
      const animeCollection = rawAnimeCollection ? JSON.parse(rawAnimeCollection) : [];
      return animeCollection;
    };

    const collection = loadAnimeCollection();
    setAnimeCollection(collection);
  }, []);

  const boxStyles = css`
    margin: 0.5em 0.3em;
  `;

  const bannerImgStyles = css`
    height: 8em;
    object-fit: cover;
  `;

  const { Meta } = Card;
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionState, setCollectionState] = useState(null);

  const onChangeCollectionDropDown = (v) => {
    setCollectionState(v);
  }

  const handleAnimeDetail = () => {
    router.push(`/animeDetailPage?id=${encodeURIComponent(anime.id)}`);
  };

  const handleAddAnime = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    addAnime(anime.id, collectionState);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddAnimeModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        animeToAdd={anime}
        collection={animeCollection}
        onChangeDropdown={onChangeCollectionDropDown}
      />
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src={anime.bannerImage ? anime.bannerImage : "./img_not_available.png"}
            css={bannerImgStyles}
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <PlusOutlined key="edit" onClick={handleAddAnime} />,
          <ArrowRightOutlined key="ellipsis" onClick={handleAnimeDetail} />,
        ]}
        css={boxStyles}
      >
        <Meta
          title={anime.title.english ? anime.title.english : anime.title.romaji}
          description={`${anime.title.romaji} (${anime.title.native})`}
        />
      </Card>

    </>
  );
}
