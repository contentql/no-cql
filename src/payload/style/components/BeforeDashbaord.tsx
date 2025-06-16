const BeforeDashboard = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      quantity: 1,
    },
  ]
  return (
    <div>
      <h1>Products</h1>

      {products.map(product => {
        return (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
          </div>
        )
      })}
    </div>
  )
}

export default BeforeDashboard
