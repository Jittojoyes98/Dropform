import React, { Suspense } from 'react'
import '@/_styles/theme.scss'
import { Layout } from '../_layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../LoginPage'
import HomePage from '../HomePage'
import SignupPage from '../SignupPage'
import { Authorize } from '../auth'
import { Dashboard } from '../Dashboard'
import { ForgotPassword } from '../ForgotPassword'
import { PrivateRoute } from '../_components/PrivateRoute'


const App = () => {
    return (
        <BrowserRouter>
            <Suspense>
                <Authorize>
                <Routes>
                    {/* add routes here */}
                    <Route path="/" element={<Layout layout="home" />}>
                        <Route index element={<HomePage />} />
                    </Route>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/dashboard" element={<Layout layout="home" />}>
                            <Route index element={<Dashboard />} />
                        </Route>
                    </Route>

                    <Route path="/login" element={<Layout layout="login" />}>
                        <Route index element={<LoginPage />} />
                        <Route path='/login/password/request' element={<ForgotPassword />} />
                    </Route>
                    <Route path="/signup" element={<Layout layout="signup" />}>
                            <Route index element={<SignupPage />} />
                    </Route>
                    
                </Routes>
                </Authorize>
            </Suspense>
        </BrowserRouter>
    )
}

export default App