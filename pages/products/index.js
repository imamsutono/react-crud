import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi"

const mockData = [
  {
    id: 1,
    name: 'Produk 1',
    description: 'Deskripsi produk 1',
    buyPrice: 10000,
    sellPrice: 15000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 2,
    name: 'Produk 2',
    description: 'Deskripsi produk 2',
    buyPrice: 20000,
    sellPrice: 25000,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
]

const ProductsPage = () => {
  const [products, setProducts] = useState(mockData)

  const handleDeleteProduct = (id) => {
    const newProducts = products.filter((product) => product.id !== id)
    setProducts(newProducts)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Produk</title>
      </Head>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Produk</h1>

        <div className="mt-6">
          <Link
            href="/products/add"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FiPlus className="mr-2" />
            Tambah Produk
          </Link>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap">
            {products.map((product) => (
              <div key={product.id} className="w-full sm:w-1/2 lg:w-1/4 p-4">
                <div className="bg-white shadow-sm rounded-md overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 h-36 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-medium">{product.name}</h2>
                    <p className="text-gray-500">{product.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div>
                        <span className="text-gray-500">Harga Beli:</span>{' '}
                        {product.buyPrice}
                      </div>
                      <div>
                        <span className="text-gray-500">Harga Jual:</span>{' '}
                        {product.sellPrice}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <Link
                        href={`/products/${product.id}/edit`}
                        className="text-green-600 hover:text-green-500"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-500"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
