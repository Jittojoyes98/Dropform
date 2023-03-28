import React, { Suspense } from 'react'
import '@/_styles/theme.scss'
import { Layout } from '../_layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../LoginPage'
import HomePage from '../HomePage'
import SignupPage from '../SignupPage'


const App = () => {
    return (
        <BrowserRouter>
            <Suspense>
                <Routes>
                    {/* add routes here */}
                    <Route path="/" element={<Layout layout="home" />}>
                        <Route index element={<HomePage />} />
                    </Route>

                    <Route path="/login" element={<Layout layout="login" />}>
                        <Route index element={<LoginPage />} />
                    </Route>
                    <Route path="/signup" element={<Layout layout="signup" />}>
                        <Route index element={<SignupPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App