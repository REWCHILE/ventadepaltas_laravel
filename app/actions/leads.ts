'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

interface LeadInput {
  nombre: string
  empresa: string
  email: string
  telefono: string
  comuna: string
  region: string
  cantidad_estimada_kg: number
  tipo_cliente: string
  mensaje?: string
  pagina_origen: string
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
}

export async function submitLead(input: LeadInput) {
  if (!input.nombre || !input.empresa || !input.email || !input.telefono || !input.comuna || !input.cantidad_estimada_kg || !input.tipo_cliente) {
    return { success: false, error: 'Por favor completa todos los campos requeridos.' }
  }

  if (!input.email.includes('@')) {
    return { success: false, error: 'Por favor ingresa un correo electrónico válido.' }
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
      console.warn('Supabase not configured. Simulating successful lead submission in development mode.')
      await simulateEmailNotification(input)
      return { 
        success: true, 
        message: '¡Cotización enviada con éxito! (Modo Desarrollo: Supabase no configurado)',
        development: true
      }
    }

    const supabase = await createClient()
    const { error } = await supabase
      .from('leads')
      .insert([
        {
          nombre: input.nombre,
          empresa: input.empresa,
          email: input.email,
          telefono: input.telefono,
          comuna: input.comuna,
          region: input.region || 'Metropolitana',
          cantidad_estimada_kg: Number(input.cantidad_estimada_kg),
          tipo_cliente: input.tipo_cliente,
          mensaje: input.mensaje || '',
          pagina_origen: input.pagina_origen,
          utm_source: input.utm_source || null,
          utm_medium: input.utm_medium || null,
          utm_campaign: input.utm_campaign || null,
          estado: 'Nuevo'
        }
      ])

    if (error) {
      console.error('Error inserting lead in Supabase:', error)
      return { success: false, error: `Error en base de datos: ${error.message}` }
    }

    await sendAdminEmailNotification(input)
    revalidatePath('/admin/leads')

    return { 
      success: true, 
      message: '¡Tu solicitud de cotización ha sido recibida! Nos pondremos en contacto a la brevedad.' 
    }

  } catch (err: any) {
    console.error('Unexpected error in submitLead action:', err)
    return { success: false, error: 'Ocurrió un error inesperado al procesar tu solicitud.' }
  }
}

// CRM Administrative Actions (Auth required)

export async function updateLeadStatus(leadId: string, oldStatus: string, newStatus: string) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Safeguard for development fallback
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
      return { success: true, message: 'Estado actualizado (Modo Desarrollo)' }
    }

    const supabase = await createClient()
    
    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: 'No autorizado. Debes iniciar sesión.' }
    }

    // Update lead status
    const { error: updateError } = await supabase
      .from('leads')
      .update({ estado: newStatus, updated_at: new Date().toISOString() })
      .eq('id', leadId)

    if (updateError) {
      return { success: false, error: updateError.message }
    }

    // Log in lead history
    const { error: historyError } = await supabase
      .from('lead_history')
      .insert([
        {
          lead_id: leadId,
          user_id: user.id,
          estado_anterior: oldStatus,
          estado_nuevo: newStatus,
          descripcion: `Estado cambiado de "${oldStatus}" a "${newStatus}"`
        }
      ])

    if (historyError) {
      console.warn('Failed to insert lead history audit:', historyError.message)
    }

    revalidatePath('/admin/leads')
    return { success: true, message: 'Estado del lead actualizado exitosamente.' }

  } catch (e: any) {
    console.error('Error updating lead status:', e)
    return { success: false, error: 'Ocurrió un error al intentar actualizar el estado.' }
  }
}

export async function addLeadNote(leadId: string, notaText: string) {
  if (!notaText.trim()) {
    return { success: false, error: 'El contenido de la nota no puede estar vacío.' }
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
      return { 
        success: true, 
        note: {
          id: Math.random().toString(),
          lead_id: leadId,
          nota: notaText,
          created_at: new Date().toISOString()
        } 
      }
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { success: false, error: 'No autorizado.' }
    }

    const { data, error } = await supabase
      .from('lead_notes')
      .insert([
        {
          lead_id: leadId,
          user_id: user.id,
          nota: notaText
        }
      ])
      .select()

    revalidatePath('/admin/leads')
    return { success: true, note: data?.[0] }

  } catch (e: any) {
    console.error('Error adding lead note:', e)
    return { success: false, error: 'Ocurrió un error al intentar agregar la nota.' }
  }
}

export async function getLeadNotesAndHistory(leadId: string) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
      return { success: true, notes: [], history: [] }
    }

    const supabase = await createClient()
    
    const { data: notes, error: notesError } = await supabase
      .from('lead_notes')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false })

    const { data: history, error: historyError } = await supabase
      .from('lead_history')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false })

    if (notesError || historyError) {
      console.error('Error loading CRM logs:', { notesError, historyError })
      return { success: false, error: 'Error al recuperar notas o historial.' }
    }

    return { success: true, notes: notes || [], history: history || [] }
  } catch (e) {
    console.error('Unexpected error loading CRM logs:', e)
    return { success: false, error: 'Error inesperado.' }
  }
}

// Resend Email API Integration (Zero-dependency fetch)
async function sendAdminEmailNotification(lead: LeadInput) {
  const apiKey = process.env.RESEND_API_KEY
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@ventadepaltas.cl'
  const senderEmail = process.env.SENDER_EMAIL || 'leads@ventadepaltas.cl'

  if (!apiKey || apiKey.includes('placeholder')) {
    console.log('Resend API key not configured. Skipping email notification.')
    return
  }

  const htmlContent = `
    <h2>Nueva Solicitud de Cotización de Paltas</h2>
    <p>Se ha recibido un nuevo lead desde la página: <strong>${lead.pagina_origen}</strong></p>
    <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 600px; font-family: sans-serif;">
      <tr style="background-color: #f2f2f2;">
        <th align="left">Campo</th>
        <th align="left">Detalle</th>
      </tr>
      <tr>
        <td><strong>Nombre</strong></td>
        <td>${lead.nombre}</td>
      </tr>
      <tr>
        <td><strong>Empresa</strong></td>
        <td>${lead.empresa}</td>
      </tr>
      <tr>
        <td><strong>Correo Electrónico</strong></td>
        <td><a href="mailto:${lead.email}">${lead.email}</a></td>
      </tr>
      <tr>
        <td><strong>Teléfono</strong></td>
        <td><a href="tel:${lead.telefono}">${lead.telefono}</a></td>
      </tr>
      <tr>
        <td><strong>Comuna</strong></td>
        <td>${lead.comuna} (Región: ${lead.region || 'Metropolitana'})</td>
      </tr>
      <tr>
        <td><strong>Tipo de Cliente</strong></td>
        <td>${lead.tipo_cliente}</td>
      </tr>
      <tr>
        <td><strong>Cantidad Estimada Mensual (kg)</strong></td>
        <td>${lead.cantidad_estimada_kg} kg</td>
      </tr>
      <tr>
        <td><strong>Mensaje</strong></td>
        <td>${lead.mensaje || '<em>Sin mensaje</em>'}</td>
      </tr>
      <tr>
        <td><strong>Origen / SEO Landing</strong></td>
        <td>${lead.pagina_origen}</td>
      </tr>
      <tr>
        <td><strong>Campaña UTM</strong></td>
        <td>Source: ${lead.utm_source || 'N/A'}, Medium: ${lead.utm_medium || 'N/A'}, Campaign: ${lead.utm_campaign || 'N/A'}</td>
      </tr>
    </table>
  `

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `VENTADEPALTAS.CL <${senderEmail}>`,
        to: adminEmail,
        subject: `🚨 NUEVA COTIZACIÓN: ${lead.empresa} (${lead.cantidad_estimada_kg}kg)`,
        html: htmlContent,
      }),
    })
  } catch (error) {
    console.error('Error calling Resend email API:', error)
  }
}

async function simulateEmailNotification(lead: LeadInput) {
  console.log(`
  ================ [EMAIL SIMULATION] ================
  To: ${process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@ventadepaltas.cl'}
  Subject: 🚨 NUEVA COTIZACIÓN: ${lead.empresa} (${lead.cantidad_estimada_kg}kg)
  
  Details:
  - Nombre: ${lead.nombre}
  - Empresa: ${lead.empresa}
  - Email: ${lead.email}
  - Teléfono: ${lead.telefono}
  - Comuna: ${lead.comuna}
  - Tipo Cliente: ${lead.tipo_cliente}
  - Cantidad Estimada: ${lead.cantidad_estimada_kg} kg
  - Mensaje: ${lead.mensaje || 'N/A'}
  - Página Origen: ${lead.pagina_origen}
  ====================================================
  `)
}
