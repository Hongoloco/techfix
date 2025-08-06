#!/usr/bin/env node

const API_BASE = 'http://localhost:3000/api';

async function testTicketSystem() {
    console.log('🚀 Testing TechFix Ticket System...\n');

    try {
        // 1. Crear un ticket sin autenticación
        console.log('1. Creating ticket without authentication...');
        const ticketResponse = await fetch(`${API_BASE}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Juan Pérez',
                email: 'juan@example.com',
                title: 'Problema con impresora',
                description: 'La impresora no responde y muestra error de tóner',
                priority: 'MEDIUM',
                category: 'Hardware'
            })
        });

        if (ticketResponse.ok) {
            const ticketData = await ticketResponse.json();
            console.log('✅ Ticket created successfully:', ticketData.ticket.id);
        } else {
            console.log('❌ Failed to create ticket:', ticketResponse.status);
            const error = await ticketResponse.text();
            console.log('Error:', error);
        }

        // 2. Login como admin
        console.log('\n2. Logging in as admin...');
        const loginResponse = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'admin@techfix.com',
                password: 'admin123'
            })
        });

        if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            console.log('✅ Admin login successful');
            
            // 3. Obtener tickets como admin
            console.log('\n3. Getting tickets as admin...');
            const adminTicketsResponse = await fetch(`${API_BASE}/admin/tickets`, {
                headers: {
                    'Authorization': `Bearer ${loginData.token}`
                }
            });

            if (adminTicketsResponse.ok) {
                const tickets = await adminTicketsResponse.json();
                console.log(`✅ Found ${tickets.length} tickets in admin panel`);
                tickets.forEach((ticket, index) => {
                    console.log(`   ${index + 1}. ${ticket.title} (${ticket.priority}) - ${ticket.user.name}`);
                });
            } else {
                console.log('❌ Failed to get admin tickets:', adminTicketsResponse.status);
            }

            // 4. Obtener tickets vía API general
            console.log('\n4. Getting tickets via general API...');
            const generalTicketsResponse = await fetch(`${API_BASE}/tickets`, {
                headers: {
                    'Authorization': `Bearer ${loginData.token}`
                }
            });

            if (generalTicketsResponse.ok) {
                const ticketData = await generalTicketsResponse.json();
                console.log(`✅ Found ${ticketData.tickets.length} tickets via general API`);
            } else {
                console.log('❌ Failed to get tickets via general API:', generalTicketsResponse.status);
            }

        } else {
            console.log('❌ Admin login failed:', loginResponse.status);
        }

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
    }
}

testTicketSystem();
