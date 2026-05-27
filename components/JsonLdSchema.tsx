import React from 'react'

interface JsonLdProps {
  schema: Record<string, any> | Record<string, any>[]
}

export default function JsonLdSchema({ schema }: JsonLdProps) {
  if (!schema) return null
  
  // Return null if it's an empty object or empty array
  if (Array.isArray(schema) && schema.length === 0) return null
  if (typeof schema === 'object' && Object.keys(schema).length === 0) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
