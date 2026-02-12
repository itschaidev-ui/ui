"use client"

import { useEffect, useRef, useState } from "react"
import { Engine, Scene, useScene } from "react-babylonjs"
import { AppendSceneAsync } from "@babylonjs/core/Loading/sceneLoader"
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic"
import type { Camera } from "@babylonjs/core/Cameras/camera"

/** Loads the GLB and applies its camera + lighting. Must be a child of Scene. */
function GLBLoader({ url }: { url: string }) {
  const scene = useScene()
  const [error, setError] = useState<string | null>(null)
  const camerasBefore = useRef<number>(0)

  useEffect(() => {
    if (!scene || !url) return

    let cancelled = false
    setError(null)

    async function load() {
      try {
        registerBuiltInLoaders()
        camerasBefore.current = scene.cameras.length
        await AppendSceneAsync(url, scene)
        if (cancelled) return
        // Use first camera that came from the GLB (Blender export)
        if (scene.cameras.length > camerasBefore.current) {
          const glbCamera = scene.cameras[camerasBefore.current] as Camera
          if (glbCamera) scene.activeCamera = glbCamera
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load model")
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [scene, url])

  if (error) return null
  return null
}

export interface HeroGLBSceneProps {
  /** Path to your GLB in public (e.g. "/models/scene.glb"). Uses Blender camera + lighting from file. */
  glbPath?: string
  /** Only show 3D on desktop to save perf on mobile */
  desktopOnly?: boolean
}

export function HeroGLBScene({ glbPath = "/models/scene.glb", desktopOnly = true }: HeroGLBSceneProps) {
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    if (typeof window === "undefined" || !glbPath) return
    setUrl(`${window.location.origin}${glbPath}`)
  }, [glbPath])

  if (!glbPath || !url) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 ${desktopOnly ? "hidden md:block" : ""}`}
      aria-hidden
    >
      <div className="absolute inset-0">
        <Engine
          antialias
          adaptToDeviceRatio
          canvasId="hero-babylon-canvas"
          canvasStyle={{ width: "100%", height: "100%", display: "block" }}
        >
          <Scene clearColor={{ r: 0, g: 0, b: 0, a: 0 }}>
            <GLBLoader url={url} />
          </Scene>
        </Engine>
      </div>
    </div>
  )
}
