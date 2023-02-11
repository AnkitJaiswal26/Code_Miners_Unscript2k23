import React from 'react';
import ProductCard from '../../../Components/ProductCard/ProductCard';

const Products = () => {
    return (
        <div style={{margin: "auto", justifyContent: "space-around"}}>
            <div className="">
                <div className="text-center text-2xl font-bold mt-4 mb-2">Previous Jobs</div>
                <div style={{display:"flex",flexWrap: "wrap",flexBasis:"1/3",justifyContent:"center" }}>
                   <ProductCard/>
                   <ProductCard/>
                   <ProductCard/> 
                   <ProductCard/> 
                   <ProductCard/> 
                </div>
            </div>
        </div>

    )
}

export default Products