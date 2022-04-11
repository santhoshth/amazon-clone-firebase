import './Home.css';
import React from 'react'
import Product from './Product';

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://m.media-amazon.com/images/I/814hjC9rRAL._SX3000_.jpg" />

                <div className="home__row">
                    <Product id={101} title="Deception Point by Dan Brown" price="300" rating={5} image="https://images-na.ssl-images-amazon.com/images/I/61MKKdDbJlL.jpg" />

                    <Product id={102} title="Echo Dot (3rd Gen) - #1 smart speaker brand in India with Alexa (Black)" price='3,499' rating={4} image="https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_UY327_QL65_.jpg" />
                </div>

                <div className="home__row">
                    <Product id={103} title="2021 Apple iPad Pro with Apple M1 chip (12.9-inch/32.77 cm, Wi-Fi + Cellular, 256GB) - Space Grey (5th Generation)" price="1,20,000" rating={5} image="https://m.media-amazon.com/images/I/81sxRBhe2sS._AC_UY327_QL65_.jpg" />

                    <Product id={104} title="Redmi Note 10S (Shadow Black, 6GB RAM, 64GB Storage) - Super Amoled Display | 64 MP Quad Camera " price="14,999" rating={5} image="https://m.media-amazon.com/images/I/71oieHcp4WL._SL1500_.jpg" />

                    <Product id={105} title="Lenovo IdeaPad S540 10th Gen Intel Core i5 15.6'(39.62cms) Full HD IPS T&L Laptop (8GB/1TB HDD + 256GB SSD/Windows 10/MS Office 2019/NVIDIA MX250 2GB GDDR5 Graphics/Mineral Grey/1.8Kg) 81NG00BVIN " price="70,999" rating={5} image="https://m.media-amazon.com/images/I/911dhIY2SCL._SL1500_.jpg" />
                </div>

                <div className="home__row">
                    <Product id={106} title="Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor (Black) " price="1,60,000" rating={4} image="https://m.media-amazon.com/images/I/71MlcO29QOL._SL1500_.jpg" />
                </div>
            </div>
        </div>
    )
}

export default Home