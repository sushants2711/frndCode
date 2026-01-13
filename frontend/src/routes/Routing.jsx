import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { MainPage } from '../pages/StaticPage/MainPage'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import { AlbumDetails } from '../pages/Album/AlbumDetails'
import { UploadImage } from '../pages/Album/UploadImage'
import { ImageDetails } from '../pages/Images/ImageDetails'


export const Routing = () => {

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='347922193532-mc4rkepqfl0vjt88u0g4es0lq3cad3pn.apps.googleusercontent.com'>
        <MainPage />
      </GoogleOAuthProvider>
    )
  }
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<GoogleAuthWrapper />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/album/:id/upload-image' element={<AlbumDetails />} />
        <Route path='/upload-image' element={<UploadImage />} />
        <Route path="/image/:idAlb/:idImg" element={<ImageDetails />} />
      </Routes>
    </>
  )
}
