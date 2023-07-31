import Head from "next/head"

export default function DynaHead({ title }) {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}