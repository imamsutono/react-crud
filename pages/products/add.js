import { useState } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'

const AddProductPage = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [sellPrice, setSellPrice] = useState('')
  const [image, setImage] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    const product = {
      id: uuidv4(),
      name,
      description,
      buyPrice: parseFloat(buyPrice),
      sellPrice: parseFloat(sellPrice),
      image,
    }

    // Save product to database or state management

    router.push('/products')
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      setImage(reader.result)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add Product</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Nama produk
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="buy-price" className="block text-gray-700 font-medium mb-2">
                Harga Beli
              </label>
              <input
                type="number"
                id="buy-price"
                name="buyPrice"
                min="0"
                step="0.01"
                value={buyPrice}
                onChange={(event) => setBuyPrice(event.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label htmlFor="sell-price" className="block text-gray-700 font-medium mb-2">
                Harga Jual
              </label>
              <input
                type="number"
                id="sell-price"
                name="sellPrice"
                min="0"
                step="0.01"
                value={sellPrice}
                onChange={(event) => setSellPrice(event.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              Foto Produk
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
              className="w-full"
            />
            {image && (
              <div className="mt-2">
                <Image src={image} alt="Product Image" width={200} height={200} />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md"
            >
              Tambah Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductPage
