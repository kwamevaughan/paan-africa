-- Create the webhook
INSERT INTO supabase_functions.hooks (
    name,
    table_name,
    events,
    url,
    method,
    headers,
    timeout_ms,
    enabled
) VALUES (
    'sitemap_regenerator',
    'blogs',
    ARRAY['INSERT', 'UPDATE', 'DELETE'],
    'https://paan.africa/api/webhooks/supabase',
    'POST',
    jsonb_build_object(
        'Content-Type', 'application/json',
        'x-webhook-secret', current_setting('app.settings.webhook_secret', true)
    ),
    5000,
    true
);

-- Create a function to handle the webhook
CREATE OR REPLACE FUNCTION handle_blog_changes()
RETURNS TRIGGER AS $$
BEGIN
    -- The webhook will be triggered automatically by Supabase
    -- No additional logic needed here as the webhook handles the sitemap regeneration
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS blog_changes_trigger ON blogs;
CREATE TRIGGER blog_changes_trigger
    AFTER INSERT OR UPDATE OR DELETE ON blogs
    FOR EACH ROW
    EXECUTE FUNCTION handle_blog_changes();

-- Set the webhook secret (replace 'your_webhook_secret' with your actual secret)
ALTER DATABASE postgres SET app.settings.webhook_secret = 'your_webhook_secret'; 