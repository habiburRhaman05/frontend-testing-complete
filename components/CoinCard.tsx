import React from 'react'

const CoinCard = ({asset}) => {
  return (
    <div
              key={asset.id}
              className="flex justify-between items-center bg-gray-800 p-3 rounded"
            >
              <div>
                <span className="font-semibold">{asset.name}</span>
              </div>
         
            </div>
  )
}

export default CoinCard