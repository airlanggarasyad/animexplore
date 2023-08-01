import styles from '../styles/Home.module.css';

import { Menu, MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";

const Navigator = () => {
    const router = useRouter();

    useEffect(() => {
        try {
            const currentItem = items.find(item => item.route === router.asPath);
            setCurrent(currentItem.key)
        } catch {
            setCurrent(null);
        }
    }, [router])

    const items = [
        {
            label: (
                <Link onClick={() => handleRouter('/')} href={"/"}>
                    Home
                </Link>
            ),
            key: 'home',
            route: '/'
        },
        {
            label: (
                <Link onClick={() => handleRouter('/mycollection')} href={"/mycollection"}>
                    My Collection
                </Link>
            ),
            key: 'collection',
            route: '/mycollection'
        },
        {
            label: (
                <Link href={"https://airlanggarasyad.com"}>
                    About
                </Link>
            ),
            key: 'about',
        },
    ];

    const handleRouter = (route) => {
        router.push(route)
    }

    const [current, setCurrent] = useState('home');

    return (
        <Menu
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{ justifyContent: "center", marginBottom: "0.5em" }}
        />
    );
}

export default function Navbar() {
    return (
        <div>
            <h1 className={styles.title}>AnimExplore</h1>

            <p className={styles.description}>
                Your one stop anime management solution.
            </p>

            <Navigator />
        </div>
    )
}