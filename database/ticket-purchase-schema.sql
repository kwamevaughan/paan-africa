-- Database schema for PAAN Summit ticket purchase system

-- Create enum types
CREATE TYPE ticket_status AS ENUM ('pending', 'paid', 'cancelled', 'refunded');
CREATE TYPE payment_method AS ENUM ('card', 'bank_transfer');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Purchasers table (main purchaser information)
CREATE TABLE purchasers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    is_attending BOOLEAN DEFAULT false,
    visa_letter_needed BOOLEAN DEFAULT false,
    passport_name VARCHAR(255),
    nationality VARCHAR(100),
    invoice_details TEXT,
    terms_accepted BOOLEAN DEFAULT false,
    updates_consent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ticket purchases table (main purchase record)
CREATE TABLE ticket_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchaser_id UUID REFERENCES purchasers(id) ON DELETE CASCADE,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status ticket_status DEFAULT 'pending',
    payment_method payment_method,
    payment_status payment_status DEFAULT 'pending',
    payment_reference VARCHAR(255),
    paystack_transaction_id VARCHAR(255),
    promo_code VARCHAR(50),
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    final_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    paid_at TIMESTAMP WITH TIME ZONE
);

-- Ticket types table (predefined ticket types)
CREATE TABLE ticket_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    category VARCHAR(50) NOT NULL,
    features JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Purchase items table (individual ticket selections)
CREATE TABLE purchase_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES ticket_purchases(id) ON DELETE CASCADE,
    ticket_type_id UUID REFERENCES ticket_types(id),
    ticket_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendees table (individual attendee information)
CREATE TABLE attendees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES ticket_purchases(id) ON DELETE CASCADE,
    purchaser_id UUID REFERENCES purchasers(id) ON DELETE CASCADE,
    ticket_type VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    is_primary_attendee BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment transactions table (payment history)
CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES ticket_purchases(id) ON DELETE CASCADE,
    paystack_reference VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status payment_status NOT NULL,
    payment_method payment_method NOT NULL,
    gateway_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_purchasers_email ON purchasers(email);
CREATE INDEX idx_ticket_purchases_purchaser_id ON ticket_purchases(purchaser_id);
CREATE INDEX idx_ticket_purchases_status ON ticket_purchases(status);
CREATE INDEX idx_purchase_items_purchase_id ON purchase_items(purchase_id);
CREATE INDEX idx_attendees_purchase_id ON attendees(purchase_id);
CREATE INDEX idx_attendees_email ON attendees(email);
CREATE INDEX idx_payment_transactions_purchase_id ON payment_transactions(purchase_id);

-- Promo codes table
CREATE TABLE promo_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10,2) NOT NULL,
    minimum_amount DECIMAL(10,2) DEFAULT 0,
    maximum_discount DECIMAL(10,2),
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    applicable_ticket_types JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default ticket types
INSERT INTO ticket_types (name, description, price, original_price, category, features) VALUES
('General Admission', 'Access all keynotes, panels, exhibition & networking app.', 95.00, 119.00, 'in-person', '["Full 2-day access", "Exhibitions & keynotes", "Digital certificate"]'),
('VIP Delegate', 'Premium access with exclusive networking opportunities.', 220.00, 250.00, 'vip', '["Full 2-day access", "VIP networking lounge", "Exclusive workshops", "Digital certificate"]'),
('Agency/Team Pass', 'Special pricing for creative agencies and teams.', 145.00, 180.00, 'in-person', '["Full 2-day access", "Team networking zone", "Agency showcase", "Digital certificate"]'),
('Students & Young Creatives', 'Special discounted access for students and emerging creatives.', 50.00, 60.00, 'student', '["Full 2-day access", "Student networking", "Career development sessions", "Digital certificate"]'),
('International Delegate', 'Special pricing for international attendees.', 250.00, 280.00, 'in-person', '["Full 2-day access", "International networking", "Global insights sessions", "Digital certificate"]'),
('Virtual Access', 'Online access to all summit sessions and content.', 10.00, 15.00, 'virtual', '["Live stream access", "On-demand recordings", "Virtual networking", "Digital certificate"]');

-- Insert sample promo codes
INSERT INTO promo_codes (code, description, discount_type, discount_value, minimum_amount, maximum_discount, usage_limit, valid_until, applicable_ticket_types) VALUES
('EARLYBIRD20', 'Early bird discount - 20% off', 'percentage', 20.00, 100.00, 50.00, 100, '2025-12-31 23:59:59', '["General Admission", "VIP Delegate", "Agency/Team Pass"]'),
('STUDENT50', 'Student discount - 50% off', 'percentage', 50.00, 0.00, 100.00, 50, '2026-04-20 23:59:59', '["Students & Young Creatives"]'),
('VIP100', 'VIP flat discount - $100 off', 'fixed', 100.00, 200.00, 100.00, 25, '2026-04-20 23:59:59', '["VIP Delegate"]'),
('AGENCY25', 'Agency discount - 25% off', 'percentage', 25.00, 200.00, 75.00, 20, '2026-04-20 23:59:59', '["Agency/Team Pass"]');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_purchasers_updated_at BEFORE UPDATE ON purchasers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ticket_purchases_updated_at BEFORE UPDATE ON ticket_purchases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ticket_types_updated_at BEFORE UPDATE ON ticket_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_attendees_updated_at BEFORE UPDATE ON attendees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON payment_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
