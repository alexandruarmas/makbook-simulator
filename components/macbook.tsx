"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import MacOSDesktop from "./macos-desktop"
import { useMobile } from "@/hooks/use-mobile"

interface MacBookProps {
  autoCloseLid?: boolean;
}

export default function MacBook({ autoCloseLid = false }: MacBookProps) {
  // Start with laptop open and powered off
  const [isOpen, setIsOpen] = useState(true)
  const [openAngle, setOpenAngle] = useState(110)
  const [isPoweredOn, setIsPoweredOn] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioVolume, setAudioVolume] = useState(0.2)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTrack, setCurrentTrack] = useState({
    title: "Synthwave Dreams",
    artist: "CherryOS",
    url: "/audiio.mp3"
  })
  const [audioLoaded, setAudioLoaded] = useState(false)
  
  const dragStartY = useRef(0)
  const isMobile = useMobile()
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto close lid after 1 second if autoCloseLid is true
  useEffect(() => {
    if (autoCloseLid) {
      const timer = setTimeout(() => {
        setIsOpen(false)
        setOpenAngle(0)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [autoCloseLid])

  // Handle lid opening/closing with drag
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    if ("touches" in e) {
      dragStartY.current = e.touches[0].clientY
    } else {
      dragStartY.current = e.clientY
    }
  }

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return

    let currentY
    if ("touches" in e) {
      currentY = e.touches[0].clientY
    } else {
      currentY = e.clientY
    }

    const deltaY = currentY - dragStartY.current
    const newAngle = Math.max(0, Math.min(135, openAngle - deltaY * 0.5))

    setOpenAngle(newAngle)
    setIsOpen(newAngle > 20)

    dragStartY.current = currentY
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    if (openAngle < 20) {
      setOpenAngle(0)
      setIsOpen(false)
    } else if (openAngle < 60) {
      setOpenAngle(60)
    }
  }

  // Add event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDrag)
      window.addEventListener("touchmove", handleDrag)
      window.addEventListener("mouseup", handleDragEnd)
      window.addEventListener("touchend", handleDragEnd)
    }

    return () => {
      window.removeEventListener("mousemove", handleDrag)
      window.removeEventListener("touchmove", handleDrag)
      window.removeEventListener("mouseup", handleDragEnd)
      window.removeEventListener("touchend", handleDragEnd)
    }
  }, [isDragging])

  // Ensure audio volume is applied when component loads or volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioVolume;
    }
  }, [audioRef, audioVolume]);

  // Preload audio to reduce lag
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioVolume
      
      // Preload the audio file
      audioRef.current.load()
      
      audioRef.current.oncanplaythrough = () => {
        setAudioLoaded(true)
      }
      
      // Add error handling
      audioRef.current.onerror = (e) => {
        console.error('Audio error:', e)
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.oncanplaythrough = null
        audioRef.current.onerror = null
      }
    }
  }, [])

  // Toggle functions
  const toggleOpen = () => {
    if (isOpen) {
      setIsOpen(false)
      setOpenAngle(0)
    } else {
      setIsOpen(true)
      setOpenAngle(110)
    }
  }

  const togglePower = () => {
    const newPowerState = !isPoweredOn
    setIsPoweredOn(newPowerState)
    
    // Control audio based on power state
    if (audioRef.current) {
      try {
        if (newPowerState && audioLoaded) {
          // Reset playback position to start
          audioRef.current.currentTime = 0
          
          // Use a promise to handle playback
          const playPromise = audioRef.current.play()
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true)
              })
              .catch(err => {
                console.error('Playback failed:', err)
                setIsPlaying(false)
              })
          }
        } else {
          audioRef.current.pause()
          setIsPlaying(false)
        }
      } catch (err) {
        console.error('Audio toggle error:', err)
      }
    }
  }

  // Audio player controls - removed as these will only be controlled via power function
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "p") {
        togglePower()
      }
      if (e.altKey && e.key === "o") {
        toggleOpen()
      }
      if (e.altKey && e.key === "m") {
        // Do nothing now as we've removed the separate music controls
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, isPoweredOn, isPlaying])

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Audio element */}
      <audio 
        ref={audioRef} 
        src={currentTrack.url}
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="relative w-full aspect-[16/10] md:aspect-[16/10]">
        {/* Base */}
        <div className="absolute bottom-0 w-full h-[4%] bg-[#1a1a1a] rounded-b-xl shadow-lg z-10">
          {/* Indent for opening */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[20%] h-[1px] bg-[#333]"></div>
        </div>

        {/* Bottom chassis */}
        <div className="absolute bottom-[4%] w-full h-[3%] bg-[#1a1a1a] z-10">
          {/* Hinge */}
          <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-[#0a0a0a] rounded-t-sm"></div>
        </div>

        {/* Screen (lid) */}
        <div
          className="absolute bottom-[7%] w-full"
          style={{
            height: "93%",
            perspective: "1000px",
          }}
        >
          <div
            className={cn(
              "absolute bottom-0 w-full h-full bg-[#1a1a1a] rounded-t-xl overflow-hidden transition-transform duration-500",
              "origin-bottom"
            )}
            style={{
              transform: `rotateX(${openAngle}deg)`,
              transformOrigin: "bottom",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Screen bezel */}
            <div
              className="absolute inset-[1.5%] bg-black rounded-md overflow-hidden"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            >
              {/* Screen content */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ 
                  opacity: (!isOpen && isPoweredOn) ? 1 : 0,
                  pointerEvents: (isPoweredOn) ? 'auto' : 'none'
                }}
              >
                <MacOSDesktop isPoweredOn={isPoweredOn} brightness={100} />
              </div>

              {/* Black screen - show when powered off or closed */}
              <div 
                className="absolute inset-0 transition-opacity duration-300"
                style={{ 
                  opacity: (!isOpen && isPoweredOn) ? 0 : 1,
                  pointerEvents: 'none'
                }}
              >
                <div className="absolute inset-0 bg-black"></div>
                
                {/* 80s Retro Logo - visible when lid is closed */}
                {!isOpen && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3">
                    <div className="relative w-full h-full">
                      {/* Starfield background */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div 
                          className="w-full h-full"
                          style={{
                            background: 'radial-gradient(circle at center, #120458 0%, #000 100%)',
                            boxShadow: 'inset 0 0 50px rgba(200, 50, 255, 0.7)',
                            overflow: 'hidden'
                          }}
                        >
                          {/* Scanlines - kept for 80s effect */}
                          <div 
                            className="absolute inset-0"
                            style={{
                              backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.8) 50%)',
                              backgroundSize: '100% 4px',
                              opacity: 0.3,
                              zIndex: 10,
                              animation: 'scanlines 0.5s linear infinite'
                            }}
                          ></div>

                          {/* Cherry-themed stars */}
                          {[...Array(30)].map((_, i) => (
                            <div 
                              key={i}
                              className="absolute rounded-full"
                              style={{
                                backgroundColor: ['#ff0055', '#ff3333', '#ff0088', '#cc0044'][i % 4],
                                width: `${Math.random() * 3 + 1}px`,
                                height: `${Math.random() * 3 + 1}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: Math.random() * 0.7 + 0.3,
                                boxShadow: `0 0 ${Math.random() * 5 + 3}px ${['#ff0055', '#ff3333', '#ff0088', '#cc0044'][i % 4]}`,
                                animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate, moveAround ${Math.random() * 20 + 10}s infinite linear`
                              }}
                            />
                          ))}

                          {/* Large animated cherry */}
                          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-32 h-32 animate-float-cherry">
                            {/* Cherry stems */}
                            <div 
                              className="absolute top-0 left-[45%] w-[10%] h-[30%]"
                              style={{
                                background: '#2a0',
                                borderRadius: '2px',
                                transformOrigin: 'bottom',
                                transform: 'rotate(10deg)',
                                boxShadow: '0 0 8px #4d0',
                                animation: 'stemWave 3s ease-in-out infinite alternate'
                              }}
                            ></div>
                            
                            <div 
                              className="absolute top-[5%] left-[35%] w-[50%] h-[10%]"
                              style={{
                                background: '#2a0',
                                borderRadius: '2px',
                                transformOrigin: 'left',
                                transform: 'rotate(-30deg)',
                                boxShadow: '0 0 8px #4d0',
                                animation: 'stemWave2 3s ease-in-out infinite alternate'
                              }}
                            ></div>
                            
                            {/* Left cherry */}
                            <div 
                              className="absolute top-[25%] left-[20%] w-[40%] h-[40%] rounded-full"
                              style={{
                                background: 'radial-gradient(circle at 30% 30%, #ff0066, #cc0044)',
                                boxShadow: '0 0 15px #ff0066, inset 0 0 10px rgba(255,255,255,0.3)',
                                animation: 'cherryPulse 2s infinite alternate'
                              }}
                            >
                              {/* Cherry highlight */}
                              <div 
                                className="absolute top-[20%] left-[20%] w-[20%] h-[20%] rounded-full"
                                style={{
                                  background: 'rgba(255,255,255,0.7)',
                                  animation: 'cherryHighlight 3s infinite alternate'
                                }}
                              ></div>
                            </div>
                            
                            {/* Right cherry */}
                            <div 
                              className="absolute top-[25%] right-[20%] w-[40%] h-[40%] rounded-full"
                              style={{
                                background: 'radial-gradient(circle at 30% 30%, #ff0066, #cc0044)',
                                boxShadow: '0 0 15px #ff0066, inset 0 0 10px rgba(255,255,255,0.3)',
                                animation: 'cherryPulse 2s infinite alternate-reverse'
                              }}
                            >
                              {/* Cherry highlight */}
                              <div 
                                className="absolute top-[20%] left-[20%] w-[20%] h-[20%] rounded-full"
                                style={{
                                  background: 'rgba(255,255,255,0.7)',
                                  animation: 'cherryHighlight 3s infinite alternate-reverse'
                                }}
                              ></div>
                            </div>

                            {/* Cherry pixel trails */}
                            {[...Array(8)].map((_, i) => (
                              <div 
                                key={`pixel-${i}`}
                                className="absolute rounded-sm"
                                style={{
                                  width: '4px',
                                  height: '4px',
                                  backgroundColor: '#ff0066',
                                  top: `${40 + (i * 5)}%`,
                                  left: `${(i % 2 === 0) ? 35 - (i * 2) : 65 + (i * 2)}%`,
                                  opacity: 1 - (i * 0.1),
                                  boxShadow: '0 0 5px #ff0066',
                                  animation: `fadeInOut ${1 + (i * 0.2)}s infinite ${i * 0.1}s`
                                }}
                              ></div>
                            ))}
                          </div>

                          {/* Circular grid horizon - cherry theme */}
                          <div className="absolute inset-x-0 bottom-0 h-[40%] overflow-hidden">
                            <div 
                              className="absolute bottom-0 left-0 w-full h-full"
                              style={{
                                background: 'radial-gradient(circle at center, transparent 0%, #330011 100%)',
                                opacity: 0.8
                              }}
                            ></div>
                            <div 
                              className="absolute bottom-0 left-0 w-full h-[80%]"
                              style={{
                                backgroundImage: `
                                  repeating-radial-gradient(circle at center, #ff0066 0, #ff0066 2px, transparent 2px, transparent 30px)
                                `,
                                opacity: 0.5,
                                animation: 'pulseGrid 3s infinite alternate'
                              }}
                            ></div>
                          </div>

                          {/* Retro text overlay */}
                          <div 
                            className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center font-mono font-bold"
                            style={{
                              color: '#0ff',
                              textShadow: '0 0 10px #0ff, 0 0 20px #0ff',
                              letterSpacing: '2px',
                              fontSize: '12px',
                              animation: 'blinkText 4s infinite'
                            }}
                          >
                            CHERRY MODE
                          </div>

                          {/* Byte counter - 80s computer style */}
                          <div 
                            className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center font-mono"
                            style={{
                              color: '#ff0066',
                              textShadow: '0 0 5px #ff0066',
                              letterSpacing: '1px',
                              fontSize: '10px'
                            }}
                          >
                            <div style={{animation: 'counterUp 10s steps(20) infinite'}}>
                              SECTORS: 0016<br/>
                              BYTES: 65536
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Sun/horizon - changed to classic arcade style */}
                      <div className="absolute inset-x-0 bottom-0 h-2/3">
                        {/* Arcade cabinet style frame */}
                        <div 
                          className="absolute inset-x-[5%] top-[20%] bottom-0"
                          style={{
                            border: '6px solid #ff00ff',
                            borderBottom: 'none',
                            boxShadow: '0 0 15px #ff00ff, inset 0 0 10px #ff00ff',
                            animation: 'pulseArcade 2s infinite alternate'
                          }}
                        ></div>
                        
                        {/* Grid horizon with more arcade style */}
                        <div className="absolute inset-x-0 bottom-0 h-[40%] perspective-[400px] overflow-hidden">
                          <div 
                            className="absolute bottom-0 left-0 w-full h-[200%] origin-bottom"
                            style={{
                              transform: 'rotateX(60deg)',
                              backgroundImage: `
                                linear-gradient(0deg, rgba(255,0,255,0.8) 0%, transparent 20%),
                                linear-gradient(90deg, rgba(0,255,255,0.6) 1px, transparent 1px),
                                linear-gradient(0deg, rgba(0,255,255,0.6) 1px, transparent 1px)
                              `,
                              backgroundSize: '30px 30px',
                              animation: 'gridMove 2s infinite linear'
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* High Score Display */}
                      <div 
                        className="absolute top-[5%] left-1/2 -translate-x-1/2 text-center font-mono"
                        style={{
                          color: '#ff0',
                          textShadow: '0 0 5px #ff0',
                          letterSpacing: '2px',
                          animation: 'blinkText 2s infinite'
                        }}
                      >
                        <div style={{fontSize: '10px'}}>HIGH SCORE</div>
                        <div style={{fontSize: '14px'}}>9876543</div>
                      </div>
                      
                      {/* Cherry themed logo */}
                      <div 
                        className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[60%] h-[25%]"
                        style={{
                          animation: 'float 3s infinite alternate'
                        }}
                      >
                        <div className="w-full h-full relative">
                          {/* Cherry themed logo */}
                          <div 
                            className="absolute inset-0 text-center font-mono font-bold"
                            style={{
                              fontSize: '18px',
                              letterSpacing: '2px',
                              color: '#ff0066',
                              textShadow: '0 0 10px #ff0066, 0 0 20px #ff0066',
                              animation: 'pulseText 3s infinite alternate'
                            }}
                          >
                            CHERRY
                            <div className="flex justify-center items-center gap-1 mt-1">
                              <div 
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  background: '#f00',
                                  borderRadius: '50%',
                                  boxShadow: '0 0 5px #f00, 0 0 10px #f00',
                                  animation: 'pulseDot 1s infinite alternate'
                                }}
                              ></div>
                              <div 
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  background: '#f00',
                                  borderRadius: '50%',
                                  boxShadow: '0 0 5px #f00, 0 0 10px #f00',
                                  animation: 'pulseDot 1.5s infinite alternate-reverse'
                                }}
                              ></div>
                              <div 
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  background: '#f00',
                                  borderRadius: '50%',
                                  boxShadow: '0 0 5px #f00, 0 0 10px #f00',
                                  animation: 'pulseDot 1s infinite alternate'
                                }}
                              ></div>
                            </div>
                            OS
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Text positioned in the marked yellow box area */}
                    <div className="absolute top-[130%] left-1/2 -translate-x-1/2 w-full text-center">
                      {/* Outer glow for the area marked in yellow */}
                      <div 
                        style={{
                          position: 'absolute',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '90%',
                          height: '15px',
                          bottom: '-20px',
                          background: 'linear-gradient(to top, rgba(255,0,100,0.6), transparent)',
                          borderRadius: '50%',
                          filter: 'blur(8px)',
                          opacity: 0.8
                        }}
                      ></div>
                      
                      <div 
                        className="inline-block font-mono text-xl font-bold whitespace-nowrap"
                        style={{
                          color: '#ffffff',
                          padding: '4px 0',
                          width: '90%',
                          position: 'relative',
                          textAlign: 'center',
                          transform: 'translateX(-19px)'
                        }}
                      >
                        <div
                          className="text-strobe"
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                            textAlign: 'center'
                          }}
                        >
                          Alexandru Armaș CherryOS
                          <span 
                            style={{
                              position: 'absolute',
                              width: '4px',
                              height: '100%',
                              backgroundColor: 'white',
                              animation: 'blink-caret 0.75s step-end infinite',
                              boxShadow: '0 0 8px #fff, 0 0 15px #fff',
                              right: '-8px',
                              top: '0'
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Power on animation - only show when powering on and lid is closed */}
              {(!isOpen && isPoweredOn) && <div className="absolute inset-0 bg-white animate-fade-out pointer-events-none"></div>}
            </div>

            {/* Camera */}
            <div className="absolute top-[0.5%] left-1/2 transform -translate-x-1/2 w-[1%] h-[1%] bg-black rounded-full">
              <div className="absolute inset-[25%] bg-[#333] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Keyboard area - only visible when closed */}
        {!isOpen && (
          <div className="absolute bottom-[0%] left-0 w-full h-[7%] z-20">
            <div className="relative w-full h-full">
              {/* Keyboard with illumination */}
              <div className="absolute top-[5%] left-[10%] right-[10%] h-[60%] bg-[#0a0a0a] rounded-sm overflow-hidden">
                {/* Ambient keyboard glow */}
                <div 
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255, 0, 102, 0.08) 0%, transparent 70%)',
                    filter: 'blur(5px)',
                    animation: 'keyboardPulse 4s infinite alternate'
                  }}
                ></div>
                
                {/* Function keys row - illuminated */}
                <div className="absolute top-[5%] left-[2%] right-[2%] h-[15%] flex gap-[0.5%] z-10">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                      key={`fn-${i}`} 
                      className="flex-1 bg-[#2a2a2a] rounded-sm"
                      style={{
                        boxShadow: `0 0 3px rgba(255, 0, 102, 0.6), inset 0 0 1px rgba(255, 0, 102, 0.3)`,
                        border: '1px solid rgba(60, 60, 60, 0.7)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(255,0,102,0.1)]"></div>
                    </div>
                  ))}
                </div>

                {/* Main keyboard rows - illuminated */}
                {Array.from({ length: 4 }).map((_, rowIndex) => (
                  <div
                    key={`row-${rowIndex}`}
                    className="absolute left-[2%] right-[2%] h-[15%] flex gap-[0.5%] z-10"
                    style={{ top: `${25 + rowIndex * 18}%` }}
                  >
                    {Array.from({ length: 12 - rowIndex }).map((_, keyIndex) => (
                      <div 
                        key={`key-${rowIndex}-${keyIndex}`} 
                        className="flex-1 bg-[#2a2a2a] rounded-sm"
                        style={{
                          boxShadow: `0 0 3px rgba(255, 0, 102, 0.6), inset 0 0 1px rgba(255, 0, 102, 0.3)`,
                          border: '1px solid rgba(60, 60, 60, 0.7)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(255,0,102,0.1)]"></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Trackpad - with subtle illumination */}
              <div className="absolute bottom-[5%] left-[30%] right-[30%] h-[30%] bg-[#0a0a0a] rounded-sm overflow-hidden">
                <div 
                  className="absolute inset-[2%] bg-[#1a1a1a] rounded-sm"
                  style={{
                    boxShadow: '0 0 4px rgba(255, 0, 102, 0.3)',
                    border: '1px solid rgba(60, 60, 60, 0.5)'
                  }}
                >
                  {/* Trackpad subtle reflection */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,0,102,0.05)] to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute -bottom-24 left-0 w-full flex flex-col gap-2 z-50">
          <div className="flex flex-col md:flex-row items-center justify-between p-2 md:p-3 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg text-xs md:text-sm">
            {/* Main controls - left side */}
            <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
              <button
                onClick={togglePower}
                className={cn(
                  "px-2 md:px-4 py-1 md:py-2 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 w-full md:w-auto mb-2 md:mb-0",
                  "bg-black/30 border border-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.3)]",
                  isPoweredOn 
                    ? "text-red-400 hover:text-red-300 hover:border-red-500/30 hover:bg-black/40" 
                    : "text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/30 hover:bg-black/40"
                )}
                aria-label={isPoweredOn ? "Power off" : "Power on"}
                style={{ pointerEvents: 'auto' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.36 6.64A9 9 0 0 1 20.77 15c-1.51 3.6-5.04 6-9 6-6.07 0-11-4.92-11-11 0-4.12 2.33-7.5 6-9.1" />
                  <path d="M12 2v10" />
                </svg>
                <span className="text-sm md:text-base">{isPoweredOn ? "Power Off" : "Power On"}</span>
              </button>

              <button
                onClick={toggleOpen}
                className={cn(
                  "px-2 md:px-4 py-1 md:py-2 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 w-full md:w-auto mb-2 md:mb-0",
                  "bg-black/30 border border-white/10 backdrop-blur-sm hover:bg-black/40",
                  "shadow-[0_0_15px_rgba(0,0,0,0.3)]",
                  isOpen 
                    ? "text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/30" 
                    : "text-red-400 hover:text-red-300 hover:border-red-500/30"
                )}
                aria-label={isOpen ? "Close laptop lid" : "Open laptop lid"}
                style={{ pointerEvents: 'auto' }}
              >
                {isOpen ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                    <span className="text-sm md:text-base">Open Lid</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12h18" />
                      <path d="M3 6h18" />
                      <path d="M3 18h18" />
                    </svg>
                    <span className="text-sm md:text-base">Close Lid</span>
                  </>
                )}
              </button>
            </div>

            {/* Audio Player removed */}

            {/* Keyboard shortcuts display - right side */}
            <div className="hidden md:inline-flex items-center px-2 md:px-4 py-1 md:py-2 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 shadow-inner md:w-auto">
              <div className="flex flex-col items-center mr-2 md:mr-4">
                <span className="text-[#ff0066] font-mono text-xs md:text-sm font-bold bg-black/40 px-1 md:px-3 py-0.5 rounded-md shadow-inner">⌥Alt + O</span>
                <span className="text-white/70 text-[10px] md:text-xs mt-1">Open/Close</span>
              </div>
              <div className="flex flex-col items-center mr-2 md:mr-4">
                <span className="text-[#ff0066] font-mono text-xs md:text-sm font-bold bg-black/40 px-1 md:px-2 py-0.5 rounded-md shadow-inner">⌥Alt + P</span>
                <span className="text-white/70 text-[10px] md:text-xs mt-1">Power</span>
              </div>
              {/* Music keyboard shortcut removed */}
            </div>
            
            {/* Mobile keyboard shortcuts - shown only on small screens at the bottom */}
            <div className="flex md:hidden items-center px-2 py-1 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 shadow-inner w-full justify-center mt-2">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#ff0066] font-mono text-xs font-bold bg-black/40 px-1 py-0.5 rounded-md shadow-inner">⌥O</span>
                  <span className="text-white/70 text-[10px] mt-1">Open/Close</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[#ff0066] font-mono text-xs font-bold bg-black/40 px-1 py-0.5 rounded-md shadow-inner">⌥P</span>
                  <span className="text-white/70 text-[10px] mt-1">Power</span>
                </div>
                {/* Mobile music keyboard shortcut removed */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframes for animations */}
      <style jsx global>{`
        @keyframes rgbShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes keyboardPulse {
          0% { opacity: 0.7; }
          50% { opacity: 0.9; }
          100% { opacity: 0.7; }
        }
        
        @keyframes audioVisualize1 {
          0% { height: 4px; }
          100% { height: 12px; }
        }
        
        @keyframes audioVisualize2 {
          0% { height: 6px; }
          100% { height: 14px; }
        }
        
        @keyframes audioVisualize3 {
          0% { height: 8px; }
          100% { height: 16px; }
        }
        
        @keyframes audioVisualize4 {
          0% { height: 6px; }
          100% { height: 14px; }
        }
        
        @keyframes audioVisualize5 {
          0% { height: 4px; }
          100% { height: 12px; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.1); }
          100% { opacity: 0.5; transform: scale(0.8); }
        }
        
        @keyframes typing {
          0%, 85%, 100% { width: 0; }
          20%, 65% { width: 26ch; }
        }
        
        @keyframes follow-cursor {
          0%, 85%, 100% { left: 0; }
          20%, 65% { left: 100%; }
        }
        
        @keyframes blink-caret {
          from, to { opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes gridMove {
          from { background-position: 0 0; }
          to { background-position: 0 30px; }
        }
        
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
        
        @keyframes moveAround {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(10px) translateY(10px); }
          50% { transform: translateX(0) translateY(20px); }
          75% { transform: translateX(-10px) translateY(10px); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        @keyframes pulseText {
          0% { text-shadow: 0 0 10px #ff0066, 0 0 20px #ff0066; transform: scale(1); }
          100% { text-shadow: 0 0 15px #ff0066, 0 0 30px #ff0066; transform: scale(1.05); }
        }
        
        @keyframes pulseDot {
          0% { transform: scale(1); }
          100% { transform: scale(1.5); }
        }
        
        @keyframes float-cherry {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(15px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes cherryPulse {
          0% { transform: scale(1); box-shadow: 0 0 15px #ff0066; }
          100% { transform: scale(1.1); box-shadow: 0 0 25px #ff0066; }
        }
        
        @keyframes cherryHighlight {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0.9; transform: scale(1.2); }
        }
        
        @keyframes pulseGrid {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes blinkText {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes counterUp {
          0% { opacity: 0.8; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        
        @keyframes stemWave {
          0% { transform: rotate(10deg); }
          100% { transform: rotate(-5deg); }
        }
        
        @keyframes stemWave2 {
          0% { transform: rotate(-30deg); }
          100% { transform: rotate(-20deg); }
        }
        
        @keyframes fadeInOut {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @keyframes borderPulse {
          0% { box-shadow: 0 0 10px #fff, 0 0 20px #fff; }
          100% { box-shadow: 0 0 15px #fff, 0 0 30px #fff, 0 0 45px #ff0066; }
        }
        
        @keyframes typing-width {
          0%, 85%, 100% { width: 0; }
          20%, 65% { width: 100%; }
        }
        
        .typing-text {
          display: inline-block;
          position: relative;
        }
        
        .cursor {
          position: absolute;
        }
        
        .text-strobe {
          animation: textColor 8s infinite alternate, textGlitch 10s infinite;
          text-shadow: 0 0 10px #fff, 0 0 20px #ff0066, 0 0 30px #ff0066;
          filter: drop-shadow(0 0 2px #fff);
        }
        
        @keyframes textColor {
          0% { color: #ffffff; }
          20% { color: #ff66ff; }
          40% { color: #66ffff; }
          60% { color: #ffff66; }
          80% { color: #ff6666; }
          100% { color: #ffffff; }
        }
        
        @keyframes textGlitch {
          0%, 100% { transform: translate(0, 0) skew(0deg); filter: none; }
          98.5% { transform: translate(0, 0) skew(0deg); filter: none; }
          99% { transform: translate(-3px, 1px) skew(2deg); filter: blur(1px) brightness(1.5); }
          99.2% { transform: translate(3px, -1px) skew(-2deg); filter: blur(0.5px) brightness(2); }
          99.5% { transform: translate(0, 0) skew(0deg); filter: none; }
          99.7% { transform: translate(2px, 1px) skew(1deg); filter: blur(1px) brightness(1.5); }
          99.9% { transform: translate(0, 0) skew(0deg); filter: none; }
        }
        
        /* Add CRT scan effect specifically for the text box */
        .text-strobe::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 0.5;
          animation: scanEffect 3s linear infinite;
          pointer-events: none;
          z-index: 5;
        }
        
        @keyframes scanEffect {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </div>
  )
}

