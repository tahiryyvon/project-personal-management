import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const employees = await sql`
        SELECT * FROM employees 
        LEFT JOIN tasks ON employees.id = tasks."employeeId"
      `;
      return res.status(200).json(employees);
    }

    if (req.method === 'POST') {
      const { name, email, position } = req.body;
      const [employee] = await sql`
        INSERT INTO employees (name, email, position) 
        VALUES (${name}, ${email}, ${position}) 
        RETURNING *
      `;
      return res.status(201).json(employee);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}