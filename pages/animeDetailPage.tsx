/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import styles from '../styles/Home.module.css';

import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';

import { gql } from '@apollo/client';
import client from './api/anilist-client';

import { Button, Space } from 'antd';
import { RiseOutlined, PlayCircleFilled } from '@ant-design/icons';

import AddAnimeModal from '../components/addAnimeModal';
import CustomError from '../components/customError';

import DynaHead from '../components/head';

import { addAnime, loadAnimeCollection } from './api/anime-collection-services';

const RenderWithLineBreaks = ({ htmlString }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    );
};

export default function AnimeDetailPage() {
    const router = useRouter();
    const [animeInfo, setAnimeInfo] = useState(null);

    const handleToHome = () => {
        router.push('/');
    };

    const [animeCollection, setAnimeCollection] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collectionState, setCollectionState] = useState(null);

    const [duplicateAlert, setDuplicateAlert] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const onChangeCollectionDropDown = (v) => {
        setCollectionState(v);
    }

    const handleAddAnime = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const ret = addAnime(animeInfo.id, collectionState);

        const handleCloseAlert = () => {
            setShowAlert(false);
        };

        if (ret.response != 0) {
            setDuplicateAlert(<CustomError msg={ret.msg} onClose={handleCloseAlert} type={"error"} />)
        } else {
            setIsModalOpen(false);
        }
    };

    const fetchCollection = () => {
        const collection = loadAnimeCollection();
        setAnimeCollection(collection);
    }

    useEffect(() => {
        fetchCollection()
    }, []);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const animeID = router.query.id || null;
        if (animeID) {
            getAnimeInfo(animeID);
        }
    }, [router.query.id]);

    async function getAnimeInfo(id) {
        try {
            const { data } = await client.query({
                query: GET_ANIMES_QUERY,
                variables: {
                    id: parseInt(id),
                },
            });
            setAnimeInfo(data.Media);
        } catch (error) {
            console.error('Error fetching anime data:', error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.grid} css={css`max-width: 900px;`}>
                <DynaHead title={"AnimExplore"} />
                {animeInfo ? (
                    <>
                        <DynaHead title={`AnimExplore - ${animeInfo.title.english ? animeInfo.title.english : animeInfo.title.romaji}`} />
                        <AddAnimeModal
                            isModalOpen={isModalOpen}
                            handleOk={handleOk}
                            handleCancel={handleCancel}
                            animeToAdd={animeInfo}
                            collection={animeCollection}
                            onChangeDropdown={onChangeCollectionDropDown}
                            refresh={fetchCollection}
                            addAnimeError={duplicateAlert}
                        />

                        <div css={css`display: flex; flex-direction: column;`}>
                            <Space direction="vertical" size="middle">
                                <div className="imgContainer" css={css`height: 20vh; border-radius: 20px;`}>
                                    <Image style={{borderRadius: "8px"}} css={css`position: relative !important;`} src={animeInfo.bannerImage} fill={true} objectFit='cover' alt={"Anime banner"} />
                                </div>

                                <div>
                                    <span className={styles.title} css={css`font-weight: 600; font-size: 2em;`}>{animeInfo.title.romaji}</span> <br />
                                    <span>{animeInfo.title.native} <br/>
                                    Year: {animeInfo.seasonYear}
                                    {animeInfo.title.english ? <><br/><br/>English Title:<br/>{animeInfo.title.english}`</> : null}</span>
                                </div>
                                
                                <Space css={css`display:flex;`} size="middle">
                                    <div css={css`display:flex; flex-direction: column; align-items: left;`}>
                                        <span css={css`font-size: 1em;`}><RiseOutlined /> Score</span>
                                        <span css={css`font-size: 2em;`}>{animeInfo.averageScore}</span>
                                    </div>
                                    <div css={css`display:flex; flex-direction: column; align-items: left;`}>
                                        <span css={css`font-size: 1em;`}><PlayCircleFilled /> Episodes</span>
                                        <span css={css`font-size: 2em;`}>{animeInfo.episodes}</span>
                                    </div>
                                </Space>

                                <RenderWithLineBreaks htmlString={animeInfo.description} />

                                <div className="button-container" css={css`display: flex; flex-direction: row; justify-content: center; margin-bottom: 2em;`}>
                                    <Space>
                                        <Button onClick={handleToHome} type="primary">Home</Button>
                                        <Button onClick={handleAddAnime} type="primary">Add to List</Button>
                                    </Space>
                                </div>
                            </Space>
                        </div>
                    </>
                ) : (
                    <h1 className={styles.title}>Loading...</h1>
                )}
            </div>
        </div>
    );
}

const GET_ANIMES_QUERY = gql`
    query ($id: Int) {
        Media(id: $id, type: ANIME) {
            id
            title {
                romaji
                english
                native
            }
            episodes
            seasonYear
            averageScore
            bannerImage
            description
        }
    }
`;
