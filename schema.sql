CREATE TABLE IF NOT EXISTS log (endpoint TEXT, timestamp INTEGER, message TEXT);
CREATE INDEX IF NOT EXISTS idx_log_endpoint ON log (endpoint);
