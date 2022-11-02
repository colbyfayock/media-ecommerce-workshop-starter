import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';

import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

import products from '@data/products';

import styles from '@styles/Product.module.scss'

export default function Product({ product, ogImage }) {
  return (
    <Layout>
      <Head>
        <title>{`${product.name} - Space Jelly`}</title>
        <meta name="description" content={`${product.name} on Space Jelly gear!`} />
        <meta property="og:description" content={`${product.name} on Space Jelly gear!`} />
        <meta property="og:type" content="article" />
      </Head>

      <Container>
        <div className={styles.productWrapper}>
          <div className={styles.productImage}>
            <Image
              width="500"
              height="500"
              src={product.image}
              alt=""
            />
          </div>
          <div className={styles.productContent}>
            <h1>{ product.name }</h1>
            <p className={styles.productPrice}>
              ${ product.price }
            </p>
            <p className={styles.productBuy}>
              <Button>
                Add to Cart
              </Button>
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const product = products.find(({ id }) => params.productId === id)

  return {
    props: {
      product
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: products.map(product => {
      return {
        params: {
          productId: product.id
        }
      }
    }),
    fallback: false
  }
}