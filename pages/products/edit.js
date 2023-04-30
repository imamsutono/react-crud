import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

const EditProductPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [sellPrice, setSellPrice] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    // Fetch product data from server or state management based on the product ID
    const fetchProduct = async () => {
      const productData = await fetch(`/api/products/${id}`)
      const product = await productData.json()
      setName(product.name)
      setDescription(product.description)
      setBuyPrice(product.buyPrice)
      setSellPrice(product.sellPrice)
      setImage(product.image)
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleImageChange = (event) => {
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Prepare updated product data
    const updatedProduct = {
      id,
      name,
      description,
      buyPrice,
      sellPrice,
      image
    }

    // Send updated product data to server or state management with PUT method
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      })

      if (response.ok) {
        router.push('/products')
      } else {
        console.log('Update product failed.')
      }
    } catch (error) {
      console.log(error)
    }

    // Redirect to product list page
    router.push('/products')
  }

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-8">Edit Product</h1>

      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
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
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="buy-price" className="block text-gray-700 font-medium mb-2">
                Buy Price
              </label>
              <input
                type="number"
                id="buy-price"
                name="buy-price"
                value={buyPrice}
                onChange={(event) => setBuyPrice(event.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="sell-price" className="block text-gray-700 font-medium mb-2">
              Sell Price
            </label>
            <input
              type="number"
              id="sell-price"
              name="sell-price"
              value={sellPrice}
              onChange={(event) => setSellPrice(event.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              Image
            </label>
            {image ? (
              <div className="relative h-48 w-full mb-4">
                <Image src={image} layout="fill" objectFit="cover" alt="Product image" />
              </div>
            ) : null}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => router.push('/products')}
              className="ml-4 inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductPage
