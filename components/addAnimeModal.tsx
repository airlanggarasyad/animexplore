/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { Form, Input, Button } from 'antd';
import type { FormInstance } from 'antd/es/form';

import { Modal, Row, Dropdown, Space, Typography } from 'antd';
import { MenuProps } from 'antd';
import { useState, useRef } from "react";
import { DownOutlined } from '@ant-design/icons';

import { createCollection } from "../pages/api/anime-collection-services";

const { Link } = Typography;

const CollectionForm = ({ onSubmit, onCancel }) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleFinish = (values) => {
    onSubmit(values['collection-name']);
  };

  const formRef = useRef<FormInstance>(null);

  return (
    <Form
      {...layout}
      ref={formRef}
      name="control-ref"
      onFinish={handleFinish}
    >
      <Form.Item name="collection-name" label="Collection Name" rules={[{ required: true }]}>
        <Input placeholder="My awesome collection" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="primary" danger onClick={onCancel}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

const AddAnimeModal = ({ isModalOpen, handleOk, handleCancel, animeToAdd, collection, onChangeDropdown }) => {
  let items: MenuProps['items'] = collection;

  const [selectedItem, setSelectedItem] = useState(null);
  const [createCollectionState, setCreateCollectionState] = useState(false);

  const handleClick = ({ key }) => {
    const currentSelectedItem = items.find(item => item.key === key);

    setSelectedItem(currentSelectedItem);
    onChangeDropdown(currentSelectedItem.key)
  };

  const handleCreateCollection = (collectionName) => {
    console.log(items)
    createCollection(collection, collectionName);
  };

  const handleShowCreateAnime = () => {
    setCreateCollectionState(!createCollectionState);
  }

  return (
    <Modal title="Add Anime to List" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {/* <Row> */}
      <div>
        <span css={css`font-weight:600; font-size: 2.3em;`}>{animeToAdd.title.english ? animeToAdd.title.english : animeToAdd.title.romaji}</span>
        <br />
        {animeToAdd.title.native}<br />
      </div>

      <br />

      <div>
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ['0'],
            onClick: handleClick
          }}
        >
          <Space css={css`font-size:1.4em;`}>
            <DownOutlined css={css`opacity:0.3;`}/> 
            <div>{selectedItem ? selectedItem.label : "Select Collection"}</div>
          </Space>
        </Dropdown>
      </div>

      <div css={css`margin-top: 0.5em;`}>
        {createCollectionState ?
          <CollectionForm onSubmit={handleCreateCollection} onCancel={handleShowCreateAnime} /> :
          <Link onClick={handleShowCreateAnime}>Create new collection</Link>
        }
      </div>
      {/* </Row> */}
    </Modal>
  );
};

export default AddAnimeModal;
