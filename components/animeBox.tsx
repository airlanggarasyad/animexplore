/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PlusOutlined, ArrowRightOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useRouter } from 'next/router';

import { useState, useEffect } from "react";

import { addAnime, loadAnimeCollection } from "../pages/api/anime-collection-services";
import AddAnimeModal from "./addAnimeModal";

import CustomError from "./customError";

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

  const fetchCollection = () => {
    const collection = loadAnimeCollection();
    setAnimeCollection(collection);
  }

  useEffect(() => {
    fetchCollection()
  }, []);

  // useEffect(() => {
  //   fetchCollection()
  // }, animeCollection);

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

  const [duplicateAlert, setDuplicateAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

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
    const ret = addAnime(anime.id, collectionState);

    const handleCloseAlert = () => {
      setShowAlert(false); // Event handler to hide the alert when the "x" button is clicked
    };

    if (ret.response != 0) {
      setDuplicateAlert(<CustomError msg={ret.msg} onClose={handleCloseAlert} type={"error"} />)
    } else {
      setIsModalOpen(false);
    }
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
        refresh={fetchCollection}
        addAnimeError={duplicateAlert}
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

AnimeBox.displayName = 'AnimeBox';