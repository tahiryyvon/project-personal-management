import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const tasks = await sql`
        SELECT tasks.*, employees.name as employee_name 
        FROM tasks 
        LEFT JOIN employees ON tasks."employeeId" = employees.id
      `;
      return res.status(200).json(tasks);
    }

    if (req.method === 'POST') {
      const { title, description, dueDate, employeeId, status = 'TODO' } = req.body;
      const [task] = await sql`
        INSERT INTO tasks (title, description, "dueDate", "employeeId", status) 
        VALUES (${title}, ${description}, ${dueDate}, ${employeeId}, ${status}) 
        RETURNING *
      `;
      return res.status(201).json(task);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}