import React from 'react'
import { Home } from './Home'
import { Features } from './Features'
import { WhyWe } from './WhyWe'
import { Footer } from '../../components/Footer'

export const MainPage = () => {
    return (
        <>
            <Home />
            <Features />
            <WhyWe />
            <Footer />
        </>
    )
}
