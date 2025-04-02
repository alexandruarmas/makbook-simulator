'use client'

import { useEffect } from 'react'
import { printLicenseInfo } from '@/lib/license-info'

export function LicenseInfo() {
  useEffect(() => {
    printLicenseInfo()
  }, [])

  return null
} 