import { useState } from 'react';

const LoginPage = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const colors = {
    primary: '#2D8E6E',
    secondary: '#A8DAC8',
    tertiary: '#4A7B9D',
    background: '#F3F4F6',
  };

  const tabTransition = {
    transition: 'all 0.3s ease-in-out',
  };

  return (
<div 
      className="min-h-screen flex items-center justify-center p-12"
      style={{ backgroundColor: colors.background, backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)', backgroundSize: '20px 20px' }}
    >
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-12 pb-8">
            <div className="flex justify-center mb-10">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.secondary }}
              >
                <svg className="w-12 h-12" fill={colors.primary} viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </div>
            </div>

            <div 
              className="flex rounded-xl p-2 mb-10"
              style={{ backgroundColor: '#F3F4F6' }}
            >
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-4 px-6 rounded-lg text-lg font-medium transition-all duration-300 ${
                  activeTab === 'login' 
                    ? 'shadow-md text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'login' ? { backgroundColor: colors.primary } : {}}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-4 px-6 rounded-lg text-lg font-medium transition-all duration-300 ${
                  activeTab === 'register' 
                    ? 'shadow-md text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'register' ? { backgroundColor: colors.primary } : {}}
              >
                Registrarse
              </button>
            </div>

            <div className="overflow-hidden">
              {activeTab === 'login' ? (
                <div style={tabTransition}>
  <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Bienvenido de Vuelta
                  </h1>
                  <p className="text-xl text-gray-500 mb-10">
                    Gestiona tu salud y medicamentos con confianza.
                  </p>

                    <form onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }}>
                      <div className="mb-6">
<label htmlFor="login-email" className="block text-xl font-medium text-gray-700 mb-2">
                          Correo Electrónico
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </span>
                          <input
                            id="login-email"
                            type="email"
                            placeholder="nombre@ejemplo.com"
                            className="w-full pl-14 pr-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all text-lg"
                            style={{ '--tw-ring-color': colors.primary }}
                            aria-label="Correo electrónico"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="login-password" className="block text-xl font-medium text-gray-700">
                            Contraseña
                          </label>
                          <a href="#" className="text-lg hover:opacity-80 transition-opacity" style={{ color: colors.primary }}>
                            ¿Olvidaste?
                          </a>
                        </div>
<div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </span>
                          <input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            className="w-full pl-14 pr-14 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all text-lg"
                            style={{ '--tw-ring-color': colors.primary }}
                            aria-label="Contraseña"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                          >
                            {showPassword ? (
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="mb-10">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            style={{ accentColor: colors.primary }}
                          />
                          <span className="ml-3 text-lg text-gray-600">Mantener sesión por 30 días</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-5 px-6 rounded-xl text-white text-xl font-medium transition-all hover:opacity-90 active:scale-[0.98]"
                        style={{ backgroundColor: colors.primary }}
                      >
                        Iniciar Sesión
                      </button>
                  </form>

                  <div className="flex items-center my-10">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="px-6 text-lg text-gray-500">O continuar con</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>

                  <div className="flex gap-6">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-3 py-5 px-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-7 h-7" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-lg font-medium text-gray-700">Google</span>
                    </button>
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-3 py-5 px-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-7 h-7" fill={colors.tertiary} viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                      <span className="text-lg font-medium text-gray-700">SSO</span>
                    </button>
                  </div>
                </div>
              ) : (
<div style={tabTransition}>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Crear Cuenta
                  </h1>
                  <p className="text-xl text-gray-500 mb-10">
                    Únete a VitalityGuide para gérer tu salud.
                  </p>

                  <form onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }}>
                    <div className="mb-6">
<label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Nombre Completo
                        </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        <input
                          id="register-name"
                          type="text"
                          placeholder="John Doe"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                          style={{ '--tw-ring-color': colors.primary }}
                          aria-label="Full name"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </span>
                        <input
                          id="register-email"
                          type="email"
                          placeholder="name@example.com"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                          style={{ '--tw-ring-color': colors.primary }}
                          aria-label="Email address"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </span>
                        <input
                          id="register-password"
                          type={showPassword ? 'text' : 'password'}
                          className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                          style={{ '--tw-ring-color': colors.primary }}
                          aria-label="Password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </span>
                        <input
                          id="register-confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                          style={{ '--tw-ring-color': colors.primary }}
                          aria-label="Confirm password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          style={{ accentColor: colors.primary }}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          I agree to the <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: colors.primary }}>Terms of Service</a> and <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: colors.primary }}>Privacy Policy</a>
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl text-white font-medium transition-all hover:opacity-90 active:scale-[0.98]"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Create Account
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          <div 
            className="px-8 py-4 flex items-center gap-3"
            style={{ backgroundColor: `${colors.secondary}30` }}
          >
            <svg className="w-7 h-7 flex-shrink-0" fill={colors.primary} viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
            <p className="text-base text-gray-600">
              <strong style={{ color: colors.primary }}>Cumple con HIPAA:</strong> Tu información de salud está encriptada y protegida según las regulaciones federales.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-12 mt-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center">
              <svg className="w-8 h-8" fill={colors.tertiary} viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V9h2v2h2v2h-2v4z"/>
              </svg>
            </div>
            <span className="text-base text-gray-500">Medicamentos</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center">
              <svg className="w-8 h-8" fill={colors.primary} viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <span className="text-base text-gray-500">Doctor</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center">
              <svg className="w-8 h-8" fill={colors.secondary} viewBox="0 0 24 24">
                <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/>
              </svg>
            </div>
            <span className="text-base text-gray-500">Bienestar</span>
          </div>
        </div>

        <p className="text-center text-base text-gray-400 mt-10">
          © 2026 VitalityGuide. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;