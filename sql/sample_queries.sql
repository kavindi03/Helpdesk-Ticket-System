-- Get all tickets
SELECT * FROM Tickets;

-- Get only OPEN tickets
SELECT * FROM Tickets WHERE status = 'OPEN';

-- Get high priority (priority 1) tickets
SELECT * FROM Tickets WHERE priority = 1;

-- Count tickets by priority
SELECT priority, COUNT(*) AS total
FROM Tickets
GROUP BY priority;

-- Get the 5 most recent tickets
SELECT *
FROM Tickets
ORDER BY datetime(createdAt) DESC
LIMIT 5;
